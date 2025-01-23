import { SquareBottomDashedScissors } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { AppState, Text, View } from "react-native";
import PushNotification from "react-native-push-notification";

const TestWithStaticServer = () => {
  const ws = useRef(null);

  const connectWebSocket = () => {
    ws.current = new WebSocket("ws://192.168.1.2:8080");

    ws.current.onopen = () => {
      console.log("WebSocket Connected");
      ws.current.send("Hello Server!");
    };

    ws.current.onmessage = (event) => {
      console.log("Message from server ", event.data);
      PushNotification.localNotification({
        message: event.data,
      });
    };

    ws.current.onclose = (e) => {
      console.log("WebSocket closed", e.reason);
      reconnectWebSocket();
    };
  };

  const reconnectWebSocket = () => {
    setTimeout(() => {
      connectWebSocket();
    }, 5000);
  };

  useEffect(() => {
    connectWebSocket();

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "active") {
        connectWebSocket();
      }
    };

    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      //   AppState.removeEventListener("change", handleAppStateChange);
      ws.current.close();
    };
  }, []);
  return (
    <View>
      <Text>WebSocket Testing</Text>
    </View>
  );
};

export default TestWithStaticServer;
