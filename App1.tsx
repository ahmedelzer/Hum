import React, { useEffect } from "react";
import { View, Text } from "react-native";
import WebSocketClient from "./src/components/notification/TestWithStaticServer";
import { registerBackgroundFetch } from "./src/components/notification/registerBackgroundFetch";

const App = () => {
  useEffect(() => {
    registerBackgroundFetch();
  }, []);

  return (
    <View>
      <Text>Expo WebSocket Notifications</Text>
      <WebSocketClient />
    </View>
  );
};

export default App;
