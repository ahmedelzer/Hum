import { WSclass } from "../../../components/hooks/ws/WS_Class";



// Store sockets in memory, keyed by wsKey (e.g. pathname only)
const wsMemoryInstances = {};

export function getWSInstance(url, onMessageCallback) {
  //const wsKey = getWSKeyFromUrl(url); // normalized key based on path
  //const wsStateInstances = store.getState().ws.wsInstances;

  let existing = wsMemoryInstances[url];
  const isClosed =
    !existing?.socket ||
    existing.socket.readyState === WebSocket.CLOSING ||
    existing.socket.readyState === WebSocket.CLOSED;

  if (isClosed) {
    console.log("🆕 Creating new WebSocket instance", url);

    const wsObject = new WSclass(url); // create your custom WS wrapper

    wsMemoryInstances[url] = wsObject;

 

    // // Connect and bind callback
     wsObject.connect(() => {
    //   store.dispatch(
    //     changeInstanceConnectState({
    //       key: wsKey,
    //       connected: true,
    //     })
    //   );

      if (typeof onMessageCallback === "function") {
        wsObject.ReciveMessages(onMessageCallback);
      }
    });

    return wsObject;
  } else {
    console.log("♻️ Reusing existing WebSocket instance");

    if (
      typeof onMessageCallback === "function" &&
      existing.ReciveMessages
    ) {
      existing.ReciveMessages(onMessageCallback);
    }

    return existing;
  }
}

export function disconnectWS(url) {
  const instance = wsMemoryInstances[url];
  if (instance?.disconnect) {
    instance.disconnect();
    console.log("🔌 WebSocket disconnected:", url);
  }
}

export function isWSConnected(url) {
  //const wsKey = getWSKeyFromUrl(url);
  const instance = wsMemoryInstances[url];
  return instance?.socket?.readyState === WebSocket.OPEN;
}

// function getWSKeyFromUrl(url) {
//   try {
//     const parsedUrl = new URL(url);
//     return parsedUrl.pathname; // normalize key to avoid duplicates with different params
//   } catch (err) {
//     console.error("Invalid WebSocket URL:", url);
//     return url; // fallback to original
//   }
// }
