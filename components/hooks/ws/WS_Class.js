import { projectProxyRoute, websocketBaseURI } from "../../../request";

export class WSclass {
  constructor(url) {
    this.socket = new WebSocket(
      url
      // "ws://192.168.1.3:8080"
    ); //! retuen it with websocketBaseURI
    this.url = url;
    // console.log("====================================");
    // console.log("ws://192.168.1.3:8080");
    // console.log("====================================");
  }

  connect() {
    this.socket.onopen = (e) => {};

    this.socket.onmessage = (event) => {
      // You can handle the received message here
    };

    this.socket.onclose = (event) => {
      // console.log("====================================");
      // console.log("server closed the ws ");
      // console.log("====================================");
      // this.socket = new WebSocket(
      //   websocketBaseURI + "/" + projectProxyRoute + this.url
      // );
      // this.connect();
      // this.reconnect();
      // You can handle the connection closed event here
    };

    this.socket.onerror = (error) => {
      // You can handle WebSocket errors here
    };
  }

  reconnect(url) {
    this.disconnect();
    this.socket = new WebSocket(
      websocketBaseURI + "/" + projectProxyRoute + url
    );
    this.connect();
  }
  ReciveMessages(messageCallback) {
    this.socket.addEventListener("message", (event) => {
      const blob = event.data;
      // const reader = new FileReader();
      if (typeof blob === "string") {
        messageCallback(blob);
      } else {
        messageCallback(blob);
      }
      // reader.onload = () => {
      //   try {
      //     const jsonData = JSON.parse(reader.result);
      //     // const cleanedData = jsonData
      //     //   .replace(/ObjectId\("[a-f0-9-]+"\)/g, '"SampleObjectId"')
      //     //   .replace(/CSUUID\("[a-f0-9-]+"\)/g, '"SampleCSUUID"')
      //     //   .replace(/ISODate\("[0-9TZ:.+-]+"?\)/g, '"SampleISODate"');
      //     // Call the messageCallback with the received JSON data

      //     messageCallback(jsonData);
      //   } catch (error) {
      //     console.error("Error parsing JSON:", error);
      //   }
      // };

      // reader.onerror = (error) => {
      //   console.error("FileReader error:", error);
      // };

      // reader.readAsText(blob);
    });

    // Return a function to clean up the WebSocket connection
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
