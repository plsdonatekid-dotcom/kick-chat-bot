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
      const s = url.searchParams.get('state');
      if (code && s && kc.authVerifier) {
        kc.exchangeCode(code, kc.authVerifier).then(ok => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(ok ? '<h2>Authorized! Close this tab.</h2>' : '<h2>Failed</h2>');
        });
      } else {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end('<h2>Missing params</h2>');
      }
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
  streamer: process.env.KICK_STREAMER || 'hstikkytokky'
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
  try {
    const raw = await kickChat.curlFetch(`https://kick.com/api/v2/channels/${state.streamer}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const ch = JSON.parse(raw);
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

setInterval(checkLiveStatus, 60000);

kickChat.on('message', (msg) => {
  if (!msg.content || !msg.sender) return;
  const formatted = `**${msg.sender.username}**: ${msg.content}`;
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

const clientId = process.env.KICK_CLIENT_ID;
const clientSecret = process.env.KICK_CLIENT_SECRET;
if (clientId && clientSecret) {
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
