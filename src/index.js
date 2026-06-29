require('dotenv').config();
const path = require('path');
const fs = require('fs');
const http = require('http');
const KickChat = require('./kick');
const DiscordBot = require('./discord');
const emojiRegex = require('emoji-regex');
const { rephrase } = require('./ai');

function stripEmojis(text) {
  if (!text) return text;
  let t = text.replace(/:\s*\w+(?:\s+\w+)*\s*:/g, '');
  t = t.replace(emojiRegex(), '');
  t = t.replace(/\s{2,}/g, ' ').trim();
  return t;
}

function startHealthServer(port, kc) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${port}`);
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end('<h2>Missing code param</h2>');
        return;
      }
      const verifier = kc.authVerifier;
      if (!verifier) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end('<h2>No pending auth session. Run /auth first.</h2>');
        return;
      }
      kc.authVerifier = null;
      kc.exchangeCode(code, verifier).then(ok => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(ok ? '<h2>Authorized! Close this tab.</h2>' : '<h2>Failed</h2>');
      });
      return;
    }
    res.end('ok');
  });
  server.on('error', () => {
    if (port < 3005) startHealthServer(port + 1, kc);
  });
  server.listen(port, () => console.log(`Health server on port ${port}`));
}

const STATE_FILE = path.join(__dirname, '..', 'state.json');

let state = {
  messagePool: [],
  channelId: null,
  isRunning: false,
  streamer: process.env.KICK_STREAMER || 'hstikkytokky',
  userToken: null
};

function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = fs.readFileSync(STATE_FILE, 'utf8');
      state = { ...state, ...JSON.parse(data) };
    }
  } catch (e) {
    console.error('Load state error:', e.message);
  }
}

function saveState() {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  } catch (e) {
    console.error('Save state error:', e.message);
  }
}

loadState();

if (process.env.KICK_STREAMER) {
  state.streamer = process.env.KICK_STREAMER;
}

saveState();

const kickChat = new KickChat(state.streamer);
const discordBot = new DiscordBot(state, saveState, kickChat);
startHealthServer(parseInt(process.env.PORT) || 3000, kickChat);

const POOL_LIMIT = 500;
const replyTriggers = [
  { match: /\b(boring|not funny|unfunny|dry|dead)\b/i, responses: ["That's your thought", "Your opinion", "Don't watch then", "Noted", "Cool story"] },
  { match: /\b(shut up|stfu|shut it|shush)\b/i, responses: ["Make me", "No u", "You first", "Cry more", "Nah"] },
  { match: /\b(stupid|dumb|braindead|retard|idiot|moron)\b/i, responses: ["Takes one to know one", "Says you", "Look in a mirror", "Whatever helps you sleep", "Cry about it"] },
  { match: /\b(stop|go away|leave|begone)\b/i, responses: ["No", "Make me", "You can't get rid of me that easy", "Never", "Deal with it"] },
  { match: /\b(who are you|who tf|who even|who dis|who this)\b/i, responses: ["Just a bot", "Nobody important", "Your worst nightmare", "Wouldn't you like to know", "I get that a lot"] },
  { match: /\b(bad|trash|awful|terrible|garbage|shit|wack|ass)\b/i, responses: ["Sorry you feel that way", "Don't care", "Ok bro", "Cry", "Stay mad"] },
  { match: /\b(good|nice|fire|lit|dope|sick|class)\b/i, responses: ["Thanks", "Glad you rate it", "I know", "Appreciate you", "Facts"] },
  { match: /\b(hello|hi|hey|sup|yo|wagwan)\b/i, responses: ["Sup", "Yo", "Hello", "Hey", "Wagwan"] },
  { match: /\b(lol|lmao|lmfao|haha| hilarious|funny)\b/i, responses: ["Glad you're entertained", "I try", "You're easily amused", "Stay laughing"] },
  { match: /\b(cry|coping|ratio|mad|salty|upset|angry)\b/i, responses: ["Not reading all that", "Stay mad", "Cope", "You sound upset", "It's not that deep"] },
  { match: /\b(bot|ai|automated|not real)\b/i, responses: ["Beep boop", "I'm a real person I swear", "How do you know", "That's what they want you to think", "01001000 01101001"] },
  { match: /\b(thanks|ty|thx|appreciate|good looks)\b/i, responses: ["No problem", "Anytime", "You're welcome", "Safe", "Ofc"] },
  { match: /\b(love|rate|fuck with|goat)\b/i, responses: ["Love you too", "I know", "Same", "Respect", "You're not bad yourself"] },
  { match: /\b(hate|dislike|can't stand)\b/i, responses: ["Noted", "Ok", "Don't care", "Why are you still here then", "Cry about it"] },
];
let sendTimer = null;
let lastRepeatMsg = null;
let repeatCount = 0;

async function sendCycle() {
  if (!state.isRunning) return;

  if (state.messagePool.length === 0) {
    lastRepeatMsg = null;
    repeatCount = 0;
    sendTimer = setTimeout(sendCycle, 10000);
    return;
  }

  let entry;
  if (lastRepeatMsg && repeatCount < 2 && Math.random() < (repeatCount === 1 ? 0.3 : 0.08)) {
    entry = lastRepeatMsg;
    repeatCount++;
  } else {
    entry = state.messagePool[Math.floor(Math.random() * state.messagePool.length)];
    lastRepeatMsg = entry;
    repeatCount = 0;
  }

  const rawContent = entry.replace(/\*\*.*?\*\*:\s*/, '');
  const toSend = await rephrase(rawContent);
  const isRephrased = toSend !== rawContent;
  console.log('Sending:', (isRephrased ? '[reworded] ' : '') + toSend.slice(0, 80));

  await kickChat.sendMessage(toSend);
  if (state.channelId) {
    discordBot.sendMessage(state.channelId, `➡️ ${isRephrased ? `*${toSend}* (was: ${rawContent})` : entry}`);
  }

  sendTimer = setTimeout(sendCycle, 1714);
}

function startSendCycle() {
  if (sendTimer) clearTimeout(sendTimer);
  sendTimer = setTimeout(sendCycle, 1000);
}

function stopSendCycle() {
  if (sendTimer) {
    clearTimeout(sendTimer);
    sendTimer = null;
  }
}

let wasLive = false;

async function checkLiveStatus() {
  const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';
  try {
    const res = await fetch(`https://kick.com/api/v2/channels/${state.streamer}`, {
      headers: { 'User-Agent': ua, 'Accept': 'application/json', 'Referer': 'https://kick.com/', 'Origin': 'https://kick.com' }
    });
    if (!res.ok) throw new Error('fetch status ' + res.status);
    const ch = await res.json();
    const isLive = ch.livestream !== null;
    if (isLive && !wasLive && state.channelId) {
      console.log(`${state.streamer} went live — auto-starting`);
      state.isRunning = true;
      saveState();
      startSendCycle();
    } else if (!isLive && wasLive) {
      console.log(`${state.streamer} went offline — auto-stopping`);
      state.isRunning = false;
      saveState();
      stopSendCycle();
    }
    wasLive = isLive;
  } catch {
    try {
      const { body } = await kickChat.curlFetch(`https://kick.com/api/v2/channels/${state.streamer}`, {
        headers: { 'User-Agent': ua, 'Accept': 'application/json', 'Referer': 'https://kick.com/', 'Origin': 'https://kick.com' }
      });
      const ch = JSON.parse(body);
      const isLive = ch.livestream !== null;
      if (isLive && !wasLive && state.channelId) {
        console.log(`${state.streamer} went live — auto-starting`);
        state.isRunning = true;
        saveState();
        startSendCycle();
      } else if (!isLive && wasLive) {
        console.log(`${state.streamer} went offline — auto-stopping`);
        state.isRunning = false;
        saveState();
        stopSendCycle();
      }
      wasLive = isLive;
    } catch {}
  }
}

setInterval(checkLiveStatus, 60000);

kickChat.on('message', async (msg) => {
  if (!msg.content || !msg.sender) {
    console.log('Pusher raw message (skipped):', JSON.stringify(msg).slice(0, 300));
    return;
  }

  if (kickChat.botUserId && msg.sender.id === kickChat.botUserId) {
    console.log(`Skipping own message from ${msg.sender.username}`);
    return;
  }

  // Detect replies or @mentions directed at the bot
  const repliedToBot = (msg.reply_message || msg.reply_to || msg.metadata?.reply_to || msg.metadata?.reply_message);
  const mentionedBot = kickChat.botUsername && new RegExp(`@${kickChat.botUsername}\\b`, 'i').test(msg.content);
  const isBotReply = (repliedToBot && kickChat.botUserId && repliedToBot.sender?.id === kickChat.botUserId) || mentionedBot;

  if (isBotReply) {
    console.log(`Bot-directed from ${msg.sender.username}: "${msg.content}"`);
    const clean = stripEmojis(msg.content);
    let response = null;
    for (const trigger of replyTriggers) {
      if (trigger.match.test(clean)) {
        response = trigger.responses[Math.floor(Math.random() * trigger.responses.length)];
        break;
      }
    }
    if (!response) {
      const fallbacks = ["Ok", "Cool", "Whatever you say", "If you say so", "Sure", "Alright", "Fair enough", "You do you", "Noted", "I guess"];
      response = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
    console.log(`Replying: "${response}"`);
    await kickChat.sendMessage(response);
    return;
  }

  const cleanContent = stripEmojis(msg.content);
  const formatted = `**${msg.sender.username}**: ${cleanContent}`;
  console.log(`📥 Pooling from ${msg.sender.username}: ${cleanContent.slice(0, 100)}`);
  state.messagePool.push(formatted);
  if (state.messagePool.length > POOL_LIMIT) {
    state.messagePool.splice(0, state.messagePool.length - POOL_LIMIT);
  }

  if (state.channelId) {
    discordBot.sendMessage(state.channelId, `📥 ${formatted}`);
  }

  saveState();
});

discordBot.on('start', () => {
  state.isRunning = true;
  saveState();
  startSendCycle();
  console.log('Send cycle started');
});

discordBot.on('stop', () => {
  state.isRunning = false;
  saveState();
  stopSendCycle();
  console.log('Send cycle stopped');
});

discordBot.on('setChannel', (channelId) => {
  state.channelId = channelId;
  saveState();
});

discordBot.on('setStreamer', (name) => {
  stopSendCycle();
  state.streamer = name;
  state.messagePool = [];
  saveState();
  kickChat.setStreamer(name);
});

kickChat.connect();

// Persist user token to state whenever it's obtained
kickChat.on('token', (tokenData) => {
  state.userToken = tokenData;
  saveState();
  kickChat.fetchBotUserId();
});

// Restore user token from state on startup
if (state.userToken) {
  kickChat.loadUserToken(state.userToken);
}

const clientId = process.env.KICK_CLIENT_ID;
const clientSecret = process.env.KICK_CLIENT_SECRET;
if (!kickChat.userAuthActive && clientId && clientSecret) {
  kickChat.loginWithOAuth(clientId, clientSecret);
} else if (process.env.KICK_ACCESS_TOKEN) {
  kickChat.setOAuthToken(process.env.KICK_ACCESS_TOKEN);
} else {
  const email = process.env.KICK_EMAIL;
  const password = process.env.KICK_PASSWORD;
  if (email && password) {
    kickChat.login(email, password);
  }
}

discordBot.login(process.env.DISCORD_TOKEN);
