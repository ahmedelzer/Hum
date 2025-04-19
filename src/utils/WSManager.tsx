// WSManager.js
import { WSclass } from "../../components/hooks/ws/WS_Class";

let wsInstance = null;

export function getWSInstance(url, onMessageCallback) {
  const isClosed =
    !wsInstance ||
    wsInstance.socket.readyState === WebSocket.CLOSING ||
    wsInstance.socket.readyState === WebSocket.CLOSED;

  if (isClosed) {
    console.log("🆕 Creating new WebSocket instance");
    wsInstance = new WSclass(url);
    wsInstance.connect();

    if (typeof onMessageCallback === "function") {
      wsInstance.ReciveMessages(onMessageCallback);
    }
  } else {
    console.log("♻️ Reusing existing WebSocket instance");
  }

  return wsInstance;
}

export function disconnectWS() {
  if (wsInstance) {
    wsInstance.disconnect();
    wsInstance = null;
    console.log("🔌 WebSocket instance disconnected");
  }
}

export function isWSConnected() {
  return wsInstance && wsInstance.socket.readyState === WebSocket.OPEN;
}
