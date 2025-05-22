import { WSclass } from "../../../components/hooks/ws/WS_Class";
import {
  addInstance,
  changeInstanceConnectState,
} from "../../reducers/WS_Reducer";
import store from "../../store/reduxStore"; // ⬅️ your Redux store

let wsInstance = null;

export function getWSInstance(url, onMessageCallback, baseURL) {
  // Access the Redux state directly from the store
  const wsInstances = store.getState().ws.wsInstances;

  // Find if the instance already exists
  let existingInstance = wsInstances.find((instance) => instance.key === url);

  // Check if the existing instance is closed or undefined
  const isClosed =
    !existingInstance ||
    !existingInstance.socket ||
    existingInstance.socket.readyState === WebSocket.CLOSING ||
    existingInstance.socket.readyState === WebSocket.CLOSED;

  if (isClosed) {
    console.log("🆕 Creating new WebSocket instance");

    // Create a new WebSocket instance
    existingInstance = new WSclass(url);

    // Connect the WebSocket instance
    existingInstance.connect(() => {
      // Dispatch connected state to Redux once connected
      store.dispatch(
        changeInstanceConnectState({
          key: url,
          message: existingInstance.ReciveMessages(onMessageCallback),
          connected: true,
        })
      );
    });

    // If an onMessageCallback is provided, use it
    if (typeof onMessageCallback === "function") {
      existingInstance.ReciveMessages(onMessageCallback);
    }

    // Save instance in Redux (initially connected: false)
    store.dispatch(
      addInstance({
        key: url,
        connected: false, // Will update once connect callback fires
      })
    );
  } else {
    console.log("♻️ Reusing existing WebSocket instance");
  }

  return existingInstance;
}

export function disconnectWS() {
  if (wsInstance) {
    // Disconnect WebSocket if it exists
    wsInstance.disconnect();
    wsInstance = null;
    console.log("🔌 WebSocket instance disconnected");
  }
}

export function isWSConnected() {
  // Check if WebSocket is connected and its readyState is OPEN
  return (
    wsInstance &&
    wsInstance.socket &&
    wsInstance.socket.readyState === WebSocket.OPEN
  );
}
