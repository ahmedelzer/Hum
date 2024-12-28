// // import { websocketBaseURI } from "../../../request";

// export class WS_Class {
//   constructor(url) {
//     this.socket = new WebSocket(url); //! retuen it with websocketBaseURI
//     this.isListenerAdded = false;
//   }

//   connect() {
//     this.socket.onopen = (e) => {
//       console.log("====================================");
//       console.log("is open");
//       console.log("====================================");
//     };
//     this.socket.onmessage = (event) => {
//       // You can handle the received message here
//       console.log("====================================");
//       console.log("is message received");
//       console.log("====================================");
//     };

//     this.socket.onclose = (event) => {
//       // You can handle the connection closed event here
//     };

//     this.socket.onerror = (error) => {
//       // You can handle WebSocket errors here
//     };
//   }
//   reconnect(url) {
//     this.disconnect();
//     this.socket = new WebSocket(websocketBaseURI + url);
//     this.connect();
//   }
//   ReciveMessages(messageCallback) {
//     if (this.socket.readyState !== WebSocket.OPEN) {
//       console.log("WebSocket is not open yet");
//       // return;
//     }
//     console.log("====================================");
//     console.log("before");
//     console.log("====================================");
//     // Prevent duplicate listeners
//     // if (true) {
//     console.log("after");
//     this.isListenerAdded = true;
//     this.socket.addEventListener("message", (event) => {
//       const blob = event.data;
//       console.log("Received message:", blob);

//       if (typeof blob === "string") {
//         messageCallback(blob); // Handle string message
//       } else if (blob instanceof Blob) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           messageCallback(reader.result); // Handle Blob as text
//         };
//         reader.onerror = (error) => {
//           console.error("Error reading blob:", error);
//         };
//         reader.readAsText(blob);
//       } else {
//         console.warn("Unhandled message type:", typeof blob);
//       }
//     });
//     // }
//   }

//   disconnect() {
//     if (this.socket) {
//       this.socket.close();
//     }
//   }
// }

// export class WS_Class {
//   constructor(url) {
//     this.url = url; // Save the URL for reconnections
//     this.socket = null;
//     this.messageCallback = null; // Store the message callback
//   }

//   connect() {
//     if (this.socket && this.socket.readyState !== WebSocket.CLOSED) {
//       console.warn("WebSocket is already connected or connecting.");
//       return;
//     }

//     this.socket = new WebSocket(this.url);

//     // Assign WebSocket event handlers
//     this.socket.onopen = () => {
//       console.log("WebSocket connection opened.");
//     };

//     this.socket.onmessage = (event) => {
//       this._handleMessage(event);
//     };

//     this.socket.onclose = (event) => {
//       console.warn("WebSocket connection closed.", event);
//     };

//     this.socket.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };
//   }

//   reconnect() {
//     console.log("Reconnecting WebSocket...");
//     this.disconnect(); // Close the current connection
//     this.connect(); // Establish a new connection
//   }

//   ReciveMessages(messageCallback) {
//     if (!this.socket) {
//       console.error("WebSocket is not initialized. Call connect first.");
//       return;
//     }

//     if (this.socket.readyState === WebSocket.OPEN) {
//       this.messageCallback = messageCallback;
//     } else {
//       console.warn(
//         "WebSocket is not open yet. Waiting for connection to attach message handler..."
//       );
//       this.messageCallback = messageCallback;

//       // Wait for WebSocket to open
//       this.socket.onopen = () => {
//         console.log("WebSocket connection opened, attaching message handler.");
//         this.socket.onmessage = (event) => {
//           console.log("====================================");
//           console.log();
//           console.log("====================================");
//           this._handleMessage(event);
//         };
//       };
//     }
//   }

//   _handleMessage(event) {
//     if (!this.messageCallback) {
//       console.warn(
//         "No message callback provided to handle WebSocket messages."
//       );
//       return;
//     }
//     const blob = event.data;

//     if (typeof blob === "string") {
//       this.messageCallback(blob); // Handle string message
//     } else if (blob instanceof Blob) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.messageCallback(reader.result); // Handle Blob as text
//       };
//       reader.onerror = (error) => {
//         console.error("Error reading blob:", error);
//       };
//       reader.readAsText(blob);
//     } else {
//       console.warn("Unhandled message type:", typeof blob);
//     }
//   }

//   disconnect() {
//     if (this.socket) {
//       console.log("Disconnecting WebSocket...");
//       this.socket.close();
//       this.socket = null;
//       this.messageCallback = null; // Clear the message callback
//     }
//   }
// }
export class WS_Class {
  constructor(url) {
    this.url = url; // Save the URL for reconnections
    this.socket = null;
    this.isListenerAdded = false; // Prevent duplicate listeners
  }

  connect() {
    if (this.socket && this.socket.readyState !== WebSocket.CLOSED) {
      // console.warn("WebSocket is already connected or connecting.");
      return;
    }

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      // console.log("WebSocket connection opened.");
    };

    this.socket.onmessage = (event) => {
      // console.log("WebSocket message received:", event.data);
    };

    this.socket.onclose = (event) => {
      // console.warn("WebSocket connection closed.", event);
    };

    this.socket.onerror = (error) => {
      // console.error("WebSocket error:", error);
    };
  }

  reconnect() {
    // console.log("Reconnecting WebSocket...");
    this.disconnect(); // Close the current connection
    this.connect(); // Establish a new connection
  }

  ReciveMessages(messageCallback) {
    if (!this.socket) {
      console.error("WebSocket is not initialized. Call connect first.");
      return;
    }

    if (this.socket.readyState !== WebSocket.OPEN) {
      console.warn(
        "WebSocket is not open yet. Waiting to attach message listener..."
      );
      this.socket.addEventListener("open", () => {
        this._attachMessageHandler(messageCallback);
      });
      return;
    }

    this._attachMessageHandler(messageCallback);
  }

  _attachMessageHandler(messageCallback) {
    if (this.isListenerAdded) {
      // console.warn("Message listener is already attached.");
      return;
    }

    // console.log("Attaching WebSocket message listener.");
    this.socket.addEventListener("message", (event) => {
      const blob = event.data;

      if (typeof blob === "string") {
        messageCallback(blob); // Handle string message
      } else if (blob instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          messageCallback(reader.result); // Handle Blob as text
        };
        reader.onerror = (error) => {
          // console.error("Error reading blob:", error);
        };
        reader.readAsText(blob);
      } else {
        // console.warn("Unhandled message type:", typeof blob);
      }
    });

    this.isListenerAdded = true;
  }

  disconnect() {
    if (this.socket) {
      // console.log("Disconnecting WebSocket...");
      setTimeout(() => this.connect(), 5000);
      this.socket.close();
      this.isListenerAdded = false;
      this.socket = null;
    }
  }
}
