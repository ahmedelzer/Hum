import { WSclass } from "../../../components/hooks/ws/WS_Class";
import {
  addInstance,
  addInstanceStateHandlingMessage,
  changeInstanceState,
} from "../../reducers/WS_Reducer";
import { store } from "../../store/reduxStore";

export function getWSInstance(baseUrl, url, onMessageCallback) {
  const wsInstances = store.getState().ws.wsInstances;

  let instance = wsInstances.find((instance) => instance.key === baseUrl);

  let isClosed =
    !instance ||
    instance.ws.readyState === WebSocket.CLOSING ||
    instance.ws.readyState === WebSocket.CLOSED;
  if (!isClosed) {
    const haveSemParams = instance.url === url;
    if (!haveSemParams) {
      disconnectWS(baseUrl);
      isClosed = true;
    }
  }
  if (isClosed) {
    console.log("🆕 Creating new WebSocket instance", url);
    instance = new WSclass(url);

    instance.connect(() => {
      if (typeof onMessageCallback === "function") {
        const removeHandler = instance.addMessageHandler(onMessageCallback);
        return { instance, removeHandler };
      }
    });
    store.dispatch(
      addInstance({
        key: baseUrl,
        url: url,
        ws: instance,
        handlingMessages: [onMessageCallback],
        connected: true,
      })
    );
  } else if (
    instance.handlingMessages.find(
      (handlingMessage) => handlingMessage !== onMessageCallback
    )
  ) {
    console.log("♻️ Reusing existing WebSocket instance", url);

    if (typeof onMessageCallback === "function") {
      const removeHandler = instance.ws.addMessageHandler(onMessageCallback);
      store.dispatch(
        addInstanceStateHandlingMessage({
          key: url,
          handlingMessage: onMessageCallback,
        })
      );
      return { instance, removeHandler };
    }

    if (instance.readyState !== WebSocket.OPEN) {
      instance.connect();
    }
  }

  return { instance };
}

export function disconnectWS(baseURL) {
  const wsInstances = store.getState().ws.wsInstances;
  let instance = wsInstances.find((instance) => instance.key === baseURL);
  if (instance) {
    // Only disconnect if no more message handlers
    instance.ws.disconnect();
    // if (instance.ws.messageCallbacks.length === 0) {
    //   // store.dispatch(
    //   //   addInstanceStateHandlingMessage({
    //   //     key: url,
    //   //     handlingMessage: onMessageCallback,
    //   //   }))
    //   console.log("🔌 WebSocket disconnected:", baseURL);
    // } else {
    //   console.log(
    //     "⚠️ Keeping connection alive - active handlers:",
    //     instance.messageCallbacks.length
    //   );
    // }
  }
}

export function isWSConnected(url) {
  const wsInstances = store.getState().ws.wsInstances;
  let instance = wsInstances.find((instance) => instance.key === url);
  return instance.ws?.readyState === WebSocket.OPEN;
}
