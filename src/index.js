require('dotenv').config();
const path = require('path');
const fs = require('fs');
const http = require('http');
const KickChat = require('./kick');
const DiscordBot = require('./discord');

const PORT = process.env.PORT || 3000;
http.createServer((req, res) => res.end('ok')).listen(PORT, () => {
  console.log(`Health server running on port ${PORT}`);
});

const STATE_FILE = path.join(__dirname, '..', 'state.json');

let state = {
  messagePool: [],
  channelId: null,
  isRunning: false,
  streamer: process.env.KICK_STREAMER || 'xqc'
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
saveState();

const kickChat = new KickChat(state.streamer);
const discordBot = new DiscordBot(state, saveState);

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

kickChat.on('message', (msg) => {
  if (!msg.content || !msg.sender) return;
  const formatted = `**${msg.sender.username}**: ${msg.content}`;
  state.messagePool.push(formatted);

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

const email = process.env.KICK_EMAIL;
const password = process.env.KICK_PASSWORD;
if (email && password) {
  kickChat.login(email, password);
}

discordBot.login(process.env.DISCORD_TOKEN);
