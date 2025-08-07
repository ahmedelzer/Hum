import React, { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";

const WEBSOCKET_URL = "ws://192.168.1.2:8080"; // Replace with your WebSocket server URL

const WebSocketClient = () => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    console.log("Connecting WebSocket...");
    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = async (event) => {
      console.log("WebSocket message received:", event.data);

      // Send push notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "New Message",
          body: event.data,
          sound: "default",
        },
        trigger: null,
      });
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error.message);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected, reconnecting...");
      setTimeout(() => setWs(new WebSocket(WEBSOCKET_URL)), 5000); // Reconnect in 5 seconds
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  return null;
};

export default WebSocketClient;
