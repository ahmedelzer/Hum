import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import VIForegroundService from "@voximplant/react-native-foreground-service";

const TestBackGroundServices = () => {
  useEffect(() => {
    // Create notification channel when component mounts
    createNotificationChannel();
  }, []);

  return (
    <View>
      <Text>Test Background Services</Text>
      <Button title="Start Service" onPress={startForegroundService} />
      <Button title="Stop Service" onPress={stopForegroundService} />
    </View>
  );
};

async function createNotificationChannel() {
  const channelConfig = {
    id: "channelId",
    name: "Channel name",
    description: "Channel description",
    enableVibration: false,
  };

  try {
    await VIForegroundService.getInstance().createNotificationChannel(
      channelConfig
    );
    console.log("Notification channel created successfully!");
  } catch (error) {
    console.error("Error creating notification channel: ", error);
  }
}

async function startForegroundService() {
  const notificationConfig = {
    channelId: "channelId",
    id: 3456,
    title: "Title",
    text: "Some text",
    icon: "ic_icon",
    button: "Some text",
  };

  try {
    await VIForegroundService.getInstance().startService(notificationConfig);
    console.log("Foreground service started!");
  } catch (e) {
    console.error("Error starting foreground service: ", e);
  }
}

async function stopForegroundService() {
  try {
    await VIForegroundService.getInstance().stopService();
    console.log("Foreground service stopped!");
  } catch (error) {
    console.error("Error stopping foreground service: ", error);
  }
}

export default TestBackGroundServices;
