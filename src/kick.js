const EventEmitter = require('events');
const { execFile } = require('child_process');
const crypto = require('crypto');
const http = require('http');

function base64URLEncode(buf) {
  return buf.toString('base64url');
}

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest();
}

class KickChat extends EventEmitter {
  constructor(streamerName) {
    super();
    this.streamerName = streamerName;
    this.ws = null;
    this.chatroomId = null;
    this.broadcasterUserId = null;
    this.reconnectTimer = null;
    this.reconnectDelay = 1000;
    this.accessToken = null;
    this.tokenExpiresAt = 0;
    this.refreshToken = null;
    this.authCallbackServer = null;
  }

  async curlFetch(url, options = {}) {
    return new Promise((resolve, reject) => {
      const args = ['-s', '-S'];
      if (options.method) args.push('-X', options.method);
      if (options.headers) {
        for (const [k, v] of Object.entries(options.headers)) {
          args.push('-H', `${k}: ${v}`);
        }
      }
      if (options.body) args.push('-d', options.body);
      args.push(url);
      execFile('curl.exe', args, { timeout: 15000 }, (err, stdout, stderr) => {
        if (err) return reject(err);
        resolve(stdout);
      });
    });
  }

  async login(email, password) {
    try {
      const res = await fetch('https://kick.com/api/v2/mobile/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const setCookie = res.headers.get('set-cookie');
        if (setCookie) {
          this.cookies = setCookie;
          this.loggedIn = true;
          console.log('Logged in to KICK');
          return;
        }
      }
    } catch {}

    try {
      const raw = await this.curlFetch('https://kick.com/api/v2/mobile/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        body: JSON.stringify({ email, password })
      });
      const parsed = JSON.parse(raw);
      if (parsed.token) {
        this.loggedIn = true;
        console.log('Logged in to KICK');
      }
    } catch (err) {
      console.error('KICK login error:', err.message);
    }
  }

  async loginWithOAuth(clientId, clientSecret) {
    try {
      const body = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret
      });
      const res = await fetch('https://id.kick.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        body: body.toString()
      });
      if (res.ok) {
        const data = await res.json();
        this.accessToken = data.access_token;
        this.tokenExpiresAt = Date.now() + (data.expires_in || 3600) * 1000;
        this.loggedIn = true;
        console.log('Logged in to KICK via OAuth');
      } else {
        console.error('OAuth login failed:', res.status, await res.text().catch(() => ''));
      }
    } catch (err) {
      console.error('OAuth login error:', err.message);
    }
  }

  async sendMessage(text) {
    if (!this.chatroomId) return false;

    if (this.accessToken) {
      try {
        const res = await fetch('https://api.kick.com/public/v1/chat', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
          },
          body: JSON.stringify({
            type: 'user',
            content: text,
            broadcaster_user_id: this.broadcasterUserId || parseInt(this.chatroomId)
          })
        });
        if (res.ok) return true;
        console.error('Send via API failed:', res.status);
      } catch (err) {
        console.error('Send via API error:', err.message);
      }
    }

    if (this.loggedIn && this.cookies) {
      try {
        const res = await this.curlFetch(
          `https://kick.com/api/v2/chatrooms/${this.chatroomId}/messages/send`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Cookie': this.cookies,
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            body: JSON.stringify({ content: text, type: 'message' })
          }
        );
        const parsed = JSON.parse(res);
        return !!parsed.id;
      } catch (err) {
        console.error('Send via curl error:', err.message);
        return false;
      }
    }

    return false;
  }

  async setOAuthToken(token) {
    this.accessToken = token;
    this.loggedIn = true;
    console.log('OAuth token set for sending messages');
  }

  generatePKCEParams() {
    const verifier = base64URLEncode(crypto.randomBytes(32));
    const challenge = base64URLEncode(sha256(verifier));
    return { verifier, challenge };
  }

  getRedirectUri() {
    return process.env.KICK_REDIRECT_URI || 'http://127.0.0.1:3456/callback';
  }

  getAuthorizationUrl(verifier, challenge) {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.KICK_CLIENT_ID,
      redirect_uri: this.getRedirectUri(),
      scope: 'chat:write',
      code_challenge: challenge,
      code_challenge_method: 'S256',
      state: verifier
    });
    return `https://id.kick.com/oauth/authorize?${params.toString()}`;
  }

  async startAuthServer(verifier) {
    return new Promise((resolve, reject) => {
      this.authCallbackServer = http.createServer(async (req, res) => {
        const url = new URL(req.url, 'http://127.0.0.1:3456');
        if (url.pathname === '/callback') {
          const code = url.searchParams.get('code');
          const state = url.searchParams.get('state');
          if (!code || state !== verifier) {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end('<h2>Auth failed</h2>');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<h2>Authorized! You can close this tab.</h2>');
          await this.exchangeCode(code, verifier);
          this.closeAuthServer();
          resolve();
        }
      });
      this.authCallbackServer.listen(3456, () => {
        console.log('Auth callback server on http://127.0.0.1:3456');
      });
      this.authCallbackServer.on('error', reject);
    });
  }

  closeAuthServer() {
    if (this.authCallbackServer) {
      try { this.authCallbackServer.close(); } catch {}
      this.authCallbackServer = null;
    }
  }

  async exchangeCode(code, verifier) {
    try {
      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.KICK_CLIENT_ID,
        client_secret: process.env.KICK_CLIENT_SECRET,
        code,
        redirect_uri: this.getRedirectUri(),
        code_verifier: verifier,
      });
      const res = await fetch('https://id.kick.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });
      if (res.ok) {
        const data = await res.json();
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        this.tokenExpiresAt = Date.now() + (data.expires_in || 3600) * 1000;
        this.loggedIn = true;
        console.log('User OAuth token obtained');
        return true;
      } else {
        console.error('Code exchange failed:', res.status, await res.text().catch(() => ''));
        return false;
      }
    } catch (err) {
      console.error('Code exchange error:', err.message);
      return false;
    }
  }

  async refreshUserToken() {
    if (!this.refreshToken) return false;
    try {
      const body = new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: process.env.KICK_CLIENT_ID,
        client_secret: process.env.KICK_CLIENT_SECRET,
        refresh_token: this.refreshToken
      });
      const res = await fetch('https://id.kick.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });
      if (res.ok) {
        const data = await res.json();
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token || this.refreshToken;
        this.tokenExpiresAt = Date.now() + (data.expires_in || 3600) * 1000;
        return true;
      }
    } catch {}
    return false;
  }

  async connect() {
    const manualId = process.env.KICK_CHATROOM_ID;
    if (manualId) {
      this.chatroomId = manualId;
      console.log(`Using manual chatroom ID: ${this.chatroomId}`);
      try {
        const raw = await this.curlFetch(`https://kick.com/api/v2/channels/${this.streamerName}`, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const ch = JSON.parse(raw);
        if (ch.user_id) this.broadcasterUserId = ch.user_id;
      } catch {}
      this.connectPusher();
      return;
    }

    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';
    const headers = {
      'User-Agent': ua,
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': `https://kick.com/${this.streamerName}`,
      'Origin': 'https://kick.com',
    };

    const urls = [
      `https://kick.com/api/v2/channels/${this.streamerName}`,
      `https://kick.com/api/v2/channels/${this.streamerName}/chatroom`,
    ];

    for (let attempt = 0; attempt < 3; attempt++) {
      for (const url of urls) {
        try {
          const res = await fetch(url, { headers });
          if (res.ok) {
            const data = await res.json();
            this.chatroomId = data.chatroom?.id || data.id;
            if (data.user_id) this.broadcasterUserId = data.user_id;
            if (this.chatroomId) {
              console.log(`Connected to ${this.streamerName}, chatroom: ${this.chatroomId}`);
              this.connectPusher();
              return;
            }
          }
        } catch {}
      }

      for (const url of urls) {
        try {
          const raw = await this.curlFetch(url, { headers });
          const data = JSON.parse(raw);
          this.chatroomId = data.chatroom?.id || data.id;
          if (data.user_id) this.broadcasterUserId = data.user_id;
          if (this.chatroomId) {
            console.log(`Connected via curl to ${this.streamerName}, chatroom: ${this.chatroomId}`);
            this.connectPusher();
            return;
          }
        } catch {}
      }

      const delay = 1000 * (attempt + 1) + Math.random() * 2000;
      await new Promise(r => setTimeout(r, delay));
    }

    console.error(`Could not get chatroom ID for ${this.streamerName}`);
    this.scheduleReconnect();
  }

  connectPusher() {
    if (this.ws) {
      try { this.ws.close(); } catch {}
    }

    const wsUrl = 'wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.4.0-rc2&flash=false';

    this.ws = new (require('ws'))(wsUrl);

    this.ws.on('open', () => {
      this.resetReconnectDelay();
      for (const ch of [
        `chatrooms.${this.chatroomId}.v2`,
        `chatroom_${this.chatroomId}`,
        `chatrooms.${this.chatroomId}`
      ]) {
        this.ws.send(JSON.stringify({
          event: 'pusher:subscribe',
          data: { channel: ch }
        }));
      }
      console.log('Pusher connected and subscribed');
    });

    this.ws.on('message', (raw) => {
      try {
        const msg = JSON.parse(raw.toString());

        if (msg.event === 'pusher:ping') {
          this.ws.send(JSON.stringify({ event: 'pusher:pong', data: {} }));
          return;
        }

        if (msg.event === 'pusher:connection_established') {
          return;
        }

        if (msg.event === 'pusher_internal:subscription_succeeded') {
          return;
        }

        if (msg.event === 'App\\Events\\ChatMessageEvent') {
          const data = JSON.parse(msg.data);
          this.emit('message', data);
        }
      } catch {}
    });

    this.ws.on('close', () => {
      this.scheduleReconnect();
    });

    this.ws.on('error', (err) => {
      console.error('Pusher error:', err.message);
    });
  }

  scheduleReconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      this.reconnectDelay = Math.min(this.reconnectDelay * 2, 30000);
      this.connect();
    }, this.reconnectDelay);
  }

  resetReconnectDelay() {
    this.reconnectDelay = 1000;
  }

  setStreamer(name) {
    this.streamerName = name;
    this.chatroomId = null;
    this.disconnect();
    this.connect();
  }

  disconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    if (this.ws) {
      try { this.ws.close(); } catch {}
      this.ws = null;
    }
  }
}

module.exports = KickChat;
