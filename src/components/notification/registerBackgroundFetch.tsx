import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";

const BACKGROUND_FETCH_TASK = "background-websocket-task";
const WEBSOCKET_URL = "ws://192.168.1.2:8080"; // Replace with your WebSocket server URL

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    console.log("Running WebSocket background task...");

    return new Promise((resolve) => {
      const ws = new WebSocket(WEBSOCKET_URL);

      ws.onopen = () => {
        console.log("WebSocket connected in background");
      };

      ws.onmessage = async (event) => {
        console.log("Background WebSocket Message:", event.data);

        // Send push notification
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "New WebSocket Message",
            body: event.data,
            sound: "default",
          },
          trigger: null,
        });
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error.message);
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
      };

      // Keep connection alive for a short time
      setTimeout(() => {
        ws.close();
        resolve(BackgroundFetch.Result.NewData);
      }, 5000);
    });
  } catch (error) {
    console.error("WebSocket background task failed:", error);
    return BackgroundFetch.Result.Failed;
  }
});

// Function to register background fetch
export async function registerBackgroundFetch() {
  const status = await BackgroundFetch.getStatusAsync();
  if (
    status === BackgroundFetch.Status.Restricted ||
    status === BackgroundFetch.Status.Denied
  ) {
    console.log("Background fetch is disabled");
    return;
  }

  console.log("Registering background WebSocket task...");
  await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60, // Run every 1 minute
    stopOnTerminate: false, // Keep running after the app is closed
    startOnBoot: true, // Restart on boot
  });

  console.log("Background WebSocket task registered.");
}
