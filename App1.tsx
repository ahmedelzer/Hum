import React, { useEffect } from "react";
import { Button, View } from "react-native";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import TestWithStaticServer from "./src/components/notification/TestWithStaticServer";

export default function App() {
  useEffect(() => {
    ReactNativeForegroundService.add_task(() => log(), {
      delay: 1000,
      onLoop: true,
      taskId: "taskid",
      onError: (e) => console.log(`Error logging:`, e),
    });
  }, []);

  const startTask = () => {
    ReactNativeForegroundService.start({
      id: 1244,
      title: "Foreground Service",
      message: "Service is running",
      icon: "ic_launcher",
      button: true,
      buttonText: "Stop",
      buttonOnPress: "stopService",
      color: "#000000",
    });
  };

  const stopTask = () => {
    ReactNativeForegroundService.stopAll();
  };

  return (
    <View style={{ marginTop: 50 }}>
      <Button onPress={startTask} title="Start Foreground Service" />
      <Button onPress={stopTask} title="Stop Foreground Service" />
      <TestWithStaticServer />
    </View>
  );
}

const log = () => console.log("Hello World");
