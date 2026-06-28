const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
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
    this.client.once('ready', async () => {
      console.log(`Discord bot logged in as ${this.client.user.tag}`);
      await this.registerCommands();
    });

    this.client.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

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
          const { verifier, challenge } = this.kickChat.generatePKCEParams();
          const url = this.kickChat.getAuthorizationUrl(verifier, challenge);
          this.kickChat.startAuthServer(verifier).catch(() => {});
          await interaction.reply(`Authorize the bot here:\n${url}\n\nAfter authorizing, come back and use /status to check.`);
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
