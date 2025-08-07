import { AppRegistry } from "react-native";
import BackgroundService from "react-native-background-actions";
import * as Notifications from "expo-notifications";

const WEBSOCKET_URL = "ws://192.168.1.2:8080";

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

const backgroundTask = async () => {
  const ws = new WebSocket(WEBSOCKET_URL);

  ws.onopen = () => {
    console.log("WebSocket connected in background");
  };

  ws.onmessage = async (event) => {
    console.log("Received message:", event.data);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "New Message",
        body: event.data,
        sound: "default",
      },
      trigger: null,
    });
  };

  ws.onclose = () => {
    console.log("WebSocket disconnected, reconnecting...");
    backgroundTask(); // Restart the connection
  };

  while (true) {
    console.log("WebSocket running in background...");
    await sleep(1000);
  }
};

// Start background service when app launches
const startBackgroundService = async () => {
  await BackgroundService.start(backgroundTask, {
    taskName: "WebSocketService",
    taskTitle: "WebSocket Running",
    taskDesc: "Listening for WebSocket messages",
    taskIcon: { name: "ic_launcher", type: "mipmap" },
    parameters: {},
  });
};

AppRegistry.registerHeadlessTask(
  "WebSocketBackgroundTask",
  () => startBackgroundService
);
