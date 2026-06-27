const EventEmitter = require('events');

class KickChat extends EventEmitter {
  constructor(streamerName) {
    super();
    this.streamerName = streamerName;
    this.ws = null;
    this.chatroomId = null;
    this.reconnectTimer = null;
    this.cookies = '';
    this.loggedIn = false;
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
      if (!res.ok) {
        console.error('KICK login failed:', res.status, await res.text().catch(() => ''));
        return;
      }
      const setCookie = res.headers.get('set-cookie');
      if (setCookie) this.cookies = setCookie;
      this.loggedIn = true;
      console.log('Logged in to KICK');
    } catch (err) {
      console.error('KICK login error:', err.message);
    }
  }

  async sendMessage(text) {
    if (!this.loggedIn || !this.chatroomId) return false;
    try {
      const res = await fetch(`https://kick.com/api/v2/chatrooms/${this.chatroomId}/messages/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': this.cookies,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        },
        body: JSON.stringify({ content: text, type: 'message' })
      });
      if (!res.ok) console.error('Send message failed:', res.status);
      return res.ok;
    } catch (err) {
      console.error('Send message error:', err.message);
      return false;
    }
  }

  async connect() {
    try {
      const res = await fetch(`https://kick.com/api/v2/channels/${this.streamerName}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const data = await res.json();
      this.chatroomId = data.chatroom.id;
      console.log(`Connected to ${this.streamerName}, chatroom: ${this.chatroomId}`);
      this.connectPusher();
    } catch (err) {
      console.error('KICK API error:', err.message);
      this.scheduleReconnect();
    }
  }

  connectPusher() {
    if (this.ws) {
      try { this.ws.close(); } catch {}
    }

    const wsUrl = 'wss://ws-us2.pusher.com/app/32cbd69e4b9503209761?protocol=7&client=js&version=8.3.0&flash=false';

    this.ws = new (require('ws'))(wsUrl);

    this.ws.on('open', () => {
      this.ws.send(JSON.stringify({
        event: 'pusher:subscribe',
        data: { channel: `channel.${this.chatroomId}` }
      }));
      console.log('Pusher connected and subscribed');
    });

    this.ws.on('message', (raw) => {
      try {
        const msg = JSON.parse(raw.toString());

        if (msg.event === 'pusher:ping') {
          this.ws.send(JSON.stringify({ event: 'pusher:pong', data: {} }));
          return;
        }

        if (msg.event === 'App\\Events\\ChatMessageEvent') {
          const data = JSON.parse(msg.data);
          this.emit('message', data);
        }
      } catch {}
    });

    this.ws.on('close', () => {
      console.log('Pusher disconnected, reconnecting...');
      this.scheduleReconnect();
    });

    this.ws.on('error', (err) => {
      console.error('Pusher error:', err.message);
    });
  }

  scheduleReconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => this.connect(), 5000);
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
