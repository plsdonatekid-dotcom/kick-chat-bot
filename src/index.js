require('dotenv').config();
const path = require('path');
const fs = require('fs');
const http = require('http');
const KickChat = require('./kick');
const DiscordBot = require('./discord');

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

let sendTimer = null;
let currentMessage = null;
let sendStage = 0; // 0=pick, 1=first send, 2=second send

function stopSendLoop() {
  if (sendTimer) {
    clearTimeout(sendTimer);
    sendTimer = null;
  }
  currentMessage = null;
  sendStage = 0;
}

function nextSendCycle() {
  if (!state.isRunning || !state.channelId) return;

  if (sendStage === 0) {
    if (state.messagePool.length === 0) {
      sendTimer = setTimeout(nextSendCycle, 10000);
      return;
    }
    currentMessage = state.messagePool[Math.floor(Math.random() * state.messagePool.length)];
    sendStage = 1;
  }

  const rawContent = currentMessage.replace(/\*\*.*?\*\*:\s*/, '');
  kickChat.sendMessage(rawContent);
  discordBot.sendMessage(state.channelId, `➡️ ${currentMessage}`);

  if (sendStage === 1) {
    sendStage = 2;
    sendTimer = setTimeout(nextSendCycle, 15000);
  } else {
    sendStage = 0;
    sendTimer = setTimeout(nextSendCycle, 30000);
  }
}

function startSendLoop() {
  stopSendLoop();
  sendStage = 0;
  sendTimer = setTimeout(nextSendCycle, 1000);
}

const POOL_LIMIT = 500;

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
      startSendLoop();
    } else if (!isLive && wasLive) {
      console.log(`${state.streamer} went offline — auto-stopping`);
      state.isRunning = false;
      saveState();
      stopSendLoop();
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
        startSendLoop();
      } else if (!isLive && wasLive) {
        console.log(`${state.streamer} went offline — auto-stopping`);
        state.isRunning = false;
        saveState();
        stopSendLoop();
      }
      wasLive = isLive;
    } catch {}
  }
}

setInterval(checkLiveStatus, 60000);

kickChat.on('message', (msg) => {
  if (!msg.content || !msg.sender) {
    console.log('Pusher raw message (skipped):', JSON.stringify(msg).slice(0, 300));
    return;
  }
  const formatted = `**${msg.sender.username}**: ${msg.content}`;
  console.log(`📥 Chat message from ${msg.sender.username}: ${msg.content.slice(0, 100)}`);
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
  startSendLoop();
});

discordBot.on('stop', () => {
  state.isRunning = false;
  saveState();
  stopSendLoop();
});

discordBot.on('setChannel', (channelId) => {
  state.channelId = channelId;
  saveState();
});

discordBot.on('setStreamer', (name) => {
  stopSendLoop();
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
