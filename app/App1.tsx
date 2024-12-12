import React, { useEffect } from "react";
import { View, Text, Button, Platform } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

// Define the background fetch task name
const BACKGROUND_FETCH_TASK = "background-fetch-task";

// Define the background fetch task
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    // Simulate an API call or any background task you need to run
    // const response = await fetch('https://api.example.com/data');
    // const data = await response.json();
    console.log("Fetched data in background:");
    // Return NewData if the task was successful, or Failed if not
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error("Error fetching data in background:", error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

const App: React.FC = () => {
  // Function to register the background fetch task
  const registerBackgroundFetch = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    if (status === BackgroundFetch.BackgroundFetchStatus.Available) {
      await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 60 * 15, // 15 minutes
        stopOnTerminate: false, // Continue after app termination
        startOnBoot: true, // Start on device reboot
      });
      console.log("Background Fetch Task registered");
    } else {
      console.log("Background fetch is not available");
    }
  };

  // Function to check background fetch status
  const checkFetchStatus = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    console.log("Background fetch status:", status);
  };

  useEffect(() => {
    // Register background fetch when the app is loaded
    registerBackgroundFetch();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Background Fetch Example</Text>
      <Button title="Check Fetch Status" onPress={checkFetchStatus} />
    </View>
  );
};

export default App;
