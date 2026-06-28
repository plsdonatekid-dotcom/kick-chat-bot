const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, MessageFlags } = require('discord.js');
const EventEmitter = require('events');

class DiscordBot extends EventEmitter {
  constructor(state, saveState, kickChat) {
    super();
    this.state = state;
    this.saveState = saveState;
    this.kickChat = kickChat;
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
    this.setup();
  }

  setup() {
    this.client.on('error', (err) => console.error('Discord client error:', err.message));

    this.client.once('ready', async () => {
      console.log(`Discord bot logged in as ${this.client.user.tag}`);
      await this.registerCommands();
    });

    this.client.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      try {
      switch (interaction.commandName) {
        case 'start':
          this.emit('start');
          await interaction.reply('Bot started — now sending random messages.');
          break;
        case 'stop':
          this.emit('stop');
          await interaction.reply('Bot stopped.');
          break;
        case 'msgview': {
          const channel = interaction.options.getChannel('channel');
          this.emit('setChannel', channel.id);
          await interaction.reply(`Message output channel set to <#${channel.id}>`);
          break;
        }
        case 'stream': {
          const name = interaction.options.getString('streamer');
          this.emit('setStreamer', name.toLowerCase());
          await interaction.reply(`Switched to streamer: **${name}**`);
          break;
        }
        case 'send': {
          const msg = interaction.options.getString('message');
          const sent = await this.kickChat?.sendMessage(msg);
          await interaction.reply(sent ? `Sent: "${msg}"` : 'Failed to send message (not logged in).');
          break;
        }
        case 'auth': {
          const pkce = this.kickChat.generatePKCEParams();
          this.kickChat.authVerifier = pkce.verifier;
          const url = this.kickChat.getAuthorizationUrl(pkce.verifier);
          const redirect = this.kickChat.getRedirectUri();
          await interaction.reply(
            `**Make sure** your Kick app has this exact redirect URI:\n\`${redirect}\`\n\n` +
            `Then visit this URL and authorize:\n${url}\n\n` +
            `After authorizing, the bot will handle the callback automatically.`
          );
          break;
        }
        case 'cb': {
          const fullUrl = interaction.options.getString('url');
          const parsed = new URL(fullUrl);
          const code = parsed.searchParams.get('code');
          if (!code) {
            await interaction.reply('No code found in that URL. Make sure you copy the full address bar URL after authorizing.');
            break;
          }
          if (!this.kickChat.authVerifier) {
            await interaction.reply('Session expired. Please run /auth first to get a fresh URL.');
            break;
          }
          const ok = await this.kickChat.exchangeCode(code, this.kickChat.authVerifier);
          await interaction.reply(ok ? 'Authorized! Try /send hello' : 'Authorization failed. Try /auth again.');
          break;
        }
        case 'pool':
          await interaction.reply(
            `**Pool:** ${this.state.messagePool.length} messages\n` +
            this.state.messagePool.slice(-5).map(m => `- ${m}`).join('\n') || '(empty)'
          );
          break;
        case 'clear':
          this.state.messagePool = [];
          this.saveState();
          await interaction.reply('Message pool cleared.');
          break;
        case 'status': {
          const running = this.state.isRunning ? 'Running' : 'Stopped';
          const channel = this.state.channelId ? `<#${this.state.channelId}>` : 'Not set';
          await interaction.reply(
            `**Status:** ${running}\n**Channel:** ${channel}\n**Pool:** ${this.state.messagePool.length} messages\n**Streamer:** ${this.state.streamer}`
          );
          break;
        }
      }
      } catch (err) {
        console.error('Command error:', err.message);
        if (!interaction.replied) await interaction.reply({ content: 'Error executing command.', flags: MessageFlags.Ephemeral }).catch(() => {});
      }
    });
  }

  async registerCommands() {
    const commands = [
      new SlashCommandBuilder()
        .setName('start')
        .setDescription('Start the random message loop'),
      new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the random message loop'),
      new SlashCommandBuilder()
        .setName('auth')
        .setDescription('Authorize the bot to send messages as your Kick account'),
      new SlashCommandBuilder()
        .setName('cb')
        .setDescription('Paste the callback URL after authorizing')
        .addStringOption(o => o.setName('url').setDescription('Full URL from address bar after authorization').setRequired(true)),
      new SlashCommandBuilder()
        .setName('send')
        .setDescription('Send a message to KICK chat')
        .addStringOption(o => o.setName('message').setDescription('Message text').setRequired(true)),
      new SlashCommandBuilder()
        .setName('pool')
        .setDescription('Show pooled messages'),
      new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear the message pool'),
      new SlashCommandBuilder()
        .setName('msgview')
        .setDescription('Set channel where messages are sent')
        .addChannelOption(o => o.setName('channel').setDescription('Target channel').setRequired(true)),
      new SlashCommandBuilder()
        .setName('stream')
        .setDescription('Set the KICK streamer to watch')
        .addStringOption(o => o.setName('streamer').setDescription('Streamer slug (e.g. xqc)').setRequired(true)),
      new SlashCommandBuilder()
        .setName('status')
        .setDescription('Show current bot status'),
    ];

    try {
      const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
      await rest.put(Routes.applicationCommands(this.client.user.id), { body: commands });
      console.log('Slash commands registered globally');
    } catch (err) {
      console.error('Command registration error:', err.message);
    }
  }

  async sendMessage(channelId, content) {
    try {
      const channel = await this.client.channels.fetch(channelId);
      if (channel) await channel.send(content);
    } catch (err) {
      console.error('Send error:', err.message);
    }
  }

  login(token) {
    this.client.login(token);
  }
}

module.exports = DiscordBot;
