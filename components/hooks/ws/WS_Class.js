import { projectProxyRoute, websocketBaseURI } from "../../../request";

export class WSclass {
  constructor(url) {
    this.url = url;
    this.socket = null;
  }

  connect() {
    console.log("🔌 Connecting to WebSocket:");

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("✅ WebSocket connected:");
    };

    this.socket.onmessage = (event) => {
      // will be overridden by ReciveMessages
    };

    this.socket.onclose = (event) => {
      console.warn("❌ WebSocket closed by server, reconnecting in 1s:");
      // if(this.socket.CLOSED)
      // {

      // setTimeout(() => this.connect(), 1000); // recreate connection
      // }
      
    };

    this.socket.onerror = (error) => {
      console.error("⚠️ WebSocket error:", error);
      // Let onclose handle reconnect
    };
  }

  ReciveMessages(messageCallback) {
    if (!this.socket) return;

    this.socket.onmessage = (event) => {
      const blob = event.data;
      messageCallback(blob);
    };
  }

  disconnect() {
    if (this.socket) {
      console.log("🛑 Manual disconnect");
      this.socket.onclose = null; // prevent reconnect on manual close
      this.socket.close();
    }
  }
}

