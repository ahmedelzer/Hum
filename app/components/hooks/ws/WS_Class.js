// import { websocketBaseURI } from "../../../request";

export class WS_Class {
  constructor(url) {
    this.socket = new WebSocket(url); //! retuen it with websocketBaseURI
    this.isListenerAdded = false;
  }

  connect() {
    this.socket.onopen = (e) => {
      console.log("====================================");
      console.log("is open");
      console.log("====================================");
    };
    this.socket.onmessage = (event) => {
      // You can handle the received message here
      console.log("====================================");
      console.log("is message received");
      console.log("====================================");
    };

    this.socket.onclose = (event) => {
      // You can handle the connection closed event here
    };

    this.socket.onerror = (error) => {
      // You can handle WebSocket errors here
    };
  }
  reconnect(url) {
    this.disconnect();
    this.socket = new WebSocket(websocketBaseURI + url);
    this.connect();
  }
  ReciveMessages(messageCallback) {
    if (this.socket.readyState !== WebSocket.OPEN) {
      console.log("WebSocket is not open yet");
      // return;
    }
    console.log("====================================");
    console.log("before");
    console.log("====================================");
    // Prevent duplicate listeners
    // if (true) {
    console.log("after");
    this.isListenerAdded = true;
    this.socket.addEventListener("message", (event) => {
      const blob = event.data;
      console.log("Received message:", blob);

      if (typeof blob === "string") {
        messageCallback(blob); // Handle string message
      } else if (blob instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          messageCallback(reader.result); // Handle Blob as text
        };
        reader.onerror = (error) => {
          console.error("Error reading blob:", error);
        };
        reader.readAsText(blob);
      } else {
        console.warn("Unhandled message type:", typeof blob);
      }
    });
    // }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
