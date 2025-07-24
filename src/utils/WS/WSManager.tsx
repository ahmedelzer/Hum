import { WSclass } from "../../../components/hooks/ws/WS_Class";


const wsMemoryInstances = {};

export function getWSInstance(url, onMessageCallback) {
  let instance = wsMemoryInstances[url];
  const isClosed = !instance || 
                  instance.readyState === WebSocket.CLOSING || 
                  instance.readyState === WebSocket.CLOSED;

  if (isClosed) {
    console.log("🆕 Creating new WebSocket instance", url);
    instance = new WSclass(url);
    wsMemoryInstances[url] = instance;
    
    instance.connect(() => {
      if (typeof onMessageCallback === "function") {
        const removeHandler = instance.addMessageHandler(onMessageCallback);
        return { instance, removeHandler };
      }
    });
  } else {
    console.log("♻️ Reusing existing WebSocket instance", url);
    
    if (typeof onMessageCallback === "function") {
      const removeHandler = instance.addMessageHandler(onMessageCallback);
      return { instance, removeHandler };
    }
    
    if (instance.readyState !== WebSocket.OPEN) {
      instance.connect();
    }
  }

  return { instance };
}

export function disconnectWS(url) {
  const instance = wsMemoryInstances[url];
  if (instance) {
    // Only disconnect if no more message handlers
    if (instance.messageCallbacks.length === 0) {
      instance.disconnect();
      delete wsMemoryInstances[url];
      console.log("🔌 WebSocket disconnected:", url);
    } else {
      console.log("⚠️ Keeping connection alive - active handlers:", instance.messageCallbacks.length);
    }
  }
}

export function isWSConnected(url) {
  const instance = wsMemoryInstances[url];
  return instance?.readyState === WebSocket.OPEN;
}