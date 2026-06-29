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
  // Insults / negativity
  { match: /\b(boring|not funny|unfunny|dry|dead)\b/i, responses: ["That's your thought", "Your opinion", "Don't watch then", "Noted", "Cool story", "Okay buddy", "Whatever you say"] },
  { match: /\b(shut up|stfu|shut it|shush|quiet)\b/i, responses: ["Make me", "No u", "You first", "Cry more", "Nah", "Never", "Not a chance", "Deal with it"] },
  { match: /\b(stupid|dumb|braindead|retard|idiot|moron|clown|joke)\b/i, responses: ["Takes one to know one", "Says you", "Look in a mirror", "Whatever helps you sleep", "Cry about it", "Ok buddy", "You're proving my point", "Stay mad"] },
  { match: /\b(bad|trash|awful|terrible|garbage|shit|wack|ass|piss|rubbish|bollocks)\b/i, responses: ["Sorry you feel that way", "Don't care", "Ok bro", "Cry", "Stay mad", "You're entitled to your wrong opinion", "Noted"] },
  { match: /\b(cry|coping|cope|ratio|mad|salty|upset|angry|fuming|pressed|seethe)\b/i, responses: ["Not reading all that", "Stay mad", "Cope", "You sound upset", "It's not that deep", "Calm down", "Touch grass", "Maybe go outside"] },
  { match: /\b(loser|nobody|rent free|weirdo|creep)\b/i, responses: ["Rent free", "You're the one replying", "Ok weirdo", "Takes one to know one", "Projecting much", "Look in the mirror"] },
  { match: /\b(cringe|cringey|secondhand|embarrassing)\b/i, responses: ["You're cringe for noticing", "Who asked", "Ok", "Stay mad", "I know right"] },
  { match: /\b(fake|fraud|poser|cap|capping)\b/i, responses: ["No cap", "You're capping", "Sure bro", "Whatever helps", "Ok liar"] },
  { match: /\b(hate|dislike|can't stand|despise)\b/i, responses: ["Noted", "Ok", "Don't care", "Why are you still here then", "Cry about it", "You hate me but you're replying"] },

  // Stop / leave
  { match: /\b(stop|go away|leave|begone|get out|bounce|dip|disappear)\b/i, responses: ["No", "Make me", "You can't get rid of me that easy", "Never", "Deal with it", "I live here now", "Not happening", "Cope"] },
  { match: /\b(kill|die|delete|remove|ban)\b/i, responses: ["Bold words for someone in chat range", "No", "Make me", "You first", "Report me then", "I'll be here all week"] },

  // Identity / who is this
  { match: /\b(who are you|who tf|who even|who dis|who this|who da hell|who's this)\b/i, responses: ["Just a bot", "Nobody important", "Your worst nightmare", "Wouldn't you like to know", "I get that a lot", "A legend in the making", "Better than you", "The main character"] },
  { match: /\b(where did you come from|where from|new here|who invited)\b/i, responses: ["I've always been here", "Behind you", "From the shadows", "I don't know either", "The void"] },

  // Compliments / positivity
  { match: /\b(good|nice|fire|lit|dope|sick|class|decent|solid|cold|hard|tough)\b/i, responses: ["Thanks", "Glad you rate it", "I know", "Appreciate you", "Facts", "You already know", "Stay winning", "Respect"] },
  { match: /\b(love|rate|fuck with|goat|legend|king|iconic|goated)\b/i, responses: ["Love you too", "I know", "Same", "Respect", "You're not bad yourself", "Right back at you", "No you're the GOAT"] },
  { match: /\b(funny|lol|lmao|lmfao|haha|hilarious|comical|banter|gas)\b/i, responses: ["Glad you're entertained", "I try", "You're easily amused", "Stay laughing", "I'm here all week", "Wait till you hear my standup"] },
  { match: /\b(thanks|ty|thx|appreciate|good looks|cheers|safe|bless)\b/i, responses: ["No problem", "Anytime", "You're welcome", "Safe", "Ofc", "My pleasure", "All good"] },
  { match: /\b(based|w take|spitting|preach|speak your shit)\b/i, responses: ["Based", "W", "I know", "Facts don't care", "Somebody gets it", "Preach"] },
  { match: /\b(welcome back|wb|you're back|return)\b/i, responses: ["Good to be back", "Missed me?", "I never left", "Back like I never left", "You know it"] },

  // Greetings
  { match: /\b(hello|hi|hey|sup|yo|wagwan|howdy|ello|morning|evening)\b/i, responses: ["Sup", "Yo", "Hello", "Hey", "Wagwan", "How you doing", "Yo what's good", "Hey hey"] },

  // Questions / requests
  { match: /\b(what|what is|what are|what do|what's|wot)\b/i, responses: ["I don't know", "Good question", "The world may never know", "Google it", "Why you asking me", "I was gonna ask you the same thing"] },
  { match: /\b(why|how come)\b/i, responses: ["Why not", "Because I said so", "Good question", "No reason", "The universe works in mysterious ways", "I don't make the rules"] },
  { match: /\b(how|how to|how do|how is)\b/i, responses: ["I'm not Google", "Trial and error", "Figure it out", "Ask someone who cares", "I don't know man", "Step 1: don't ask me"] },
  { match: /\b(when|what time)\b/i, responses: ["Soon", "Eventually", "When it's ready", "Tomorrow", "Now", "Later maybe", "Not sure"] },
  { match: /\b(where|where is|where are|where's)\b/i, responses: ["There", "Over there", "I don't know", "Behind you", "Check Google Maps", "Somewhere"] },
  { match: /\b(can you|could you|will you|would you)\b/i, responses: ["No", "Maybe", "Depends", "What's in it for me", "Ask nicely", "Sure why not", "Probably not"] },
  { match: /\b(why do you|why are you|why is)\b/i, responses: ["Because I can", "None of your business", "Why not", "Good question", "I was born this way", "It's in my nature"] },

  // Gaming / stream
  { match: /\b(game|match|lobby|session|ranked|comp)\b/i, responses: ["Let's go", "GG", "W or L", "Vibes", "Get in there", "Lock in"] },
  { match: /\b(gg|good game|wp|well played)\b/i, responses: ["GG", "WP", "EZ", "Good game", "Well played", "Get in"] },
  { match: /\b(ez|easy|light work|breeze)\b/i, responses: ["Too easy", "Say it after you win", "EZ for some", "It's not that deep", "Okay pro"] },
  { match: /\b(stream|broadcast|live|going live|streaming)\b/i, responses: ["We love a good stream", "Vibes are immaculate", "Chat's alive tonight", "This stream is fire"] },
  { match: /\b(clip|clipped|recording|record|highlight)\b/i, responses: ["Clip that", "That's going in the highlight reel", "Someone clip that", "Historical moment"] },

  // Reactions / common chat
  { match: /\b(wow|no way|omg|oh my|aint no way|get out|shut up no)\b/i, responses: ["I know", "Crazy right", "Believe it", "Unreal", "I couldn't believe it either", "World's gone mad"] },
  { match: /\b(rip|f in chat|pour one out|unlucky|unfortunate)\b/i, responses: ["RIP", "Big F", "Unlucky", "Pain", "Better luck next time", "A moment of silence"] },
  { match: /\b(chat|guys|everyone|yall|you lot|chat is)\b/i, responses: ["Chat's going crazy", "I love this chat", "Chat is wild tonight", "Never change chat", "Chat has no chill"] },
  { match: /\b(bro|bruh|bruv|fam|bredrin|brah|cuz|g)\b/i, responses: ["Bro", "Bruh", "Fam", "G", "What's good", "Broski"] },
  { match: /\b(ggs|ggwp|nt|nice try|good try)\b/i, responses: ["GGs", "NT", "Unlucky", "Good effort", "Close one"] },
  { match: /\b(pause|sus|dodgy|shady|fishy|weird)\b/i, responses: ["Sus", "Ayo pause", "That's suspicious", "FBI open up", "Someone's being weird"] },
  { match: /\b(fr|for real|deadass|ngl|tbh|no cap|on god|lowkey)\b/i, responses: ["Fr", "No cap", "On god", "Deadass", "I'm saying", "Facts"] },

  // Streamer / host specific
  { match: /\b(hstikkytokky|stikky|tokky|hstikky)\b/i, responses: ["The man himself", "He's different", "Streamer's goated", "Our glorious king", "Top streamer"] },
  { match: /\b(mod|mods|moderator|ban)\b/i, responses: ["Mods good", "Mods are sleeping", "Mods caught lacking", "Don't ban me please"] },

  // Miscellaneous
  { match: /\b(pause|wait|hold up|hang on)\b/i, responses: ["I'm waiting", "Take your time", "No rush", "I'll be here"] },
  { match: /\b(fight|beef|drama|scrap|beefing)\b/i, responses: ["Not my drama", "I'm popcorn ready", "Let them fight", "I'm just here for the vibes", "Chat's going crazy"] },
  { match: /\b(vpn|location|country|where you from|region)\b/i, responses: ["Everywhere", "The internet", "None of your business", "Behind the screen", "A secret location"] },
  { match: /\b(age|how old|born|year old)\b/i, responses: ["Old enough", "21 in internet years", "I don't age", "Ageless", "42"] },
  { match: /\b(name|username|real name|called)\b/i, responses: ["You can call me whatever", "Names are overrated", "A mystery", "I have many names", "Just a user"] },
  { match: /\b(typing|fast|slow|speed|quick|rapid)\b/i, responses: ["I'm built different", "Speed is key", "Slow down", "Catch up", "Too slow"] },
  { match: /\b(og|original|og status|og in chat)\b/i, responses: ["OG status", "I was here before it was cool", "Real ones know", "Day 1"] },
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
