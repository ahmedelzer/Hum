import React, { useContext, useEffect, useRef, useState } from "react";
import { WS_Class } from "../../../components/hooks/ws/WS_Class";
// import { LocalizationContext } from "../../../context/LocalizationContext";
// import { WSContext } from "../../../context/WS";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import * as IntentLauncher from "expo-intent-launcher";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "../../../components/ui";
import { moderateScale } from "react-native-size-matters";
import { Bell } from "lucide-react-native";
import TestBackGroundServices from "./TestBackGroundServices";
import RedCounter from "../../utils/RedCounter";

// Notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
// Background task name
const BACKGROUND_TASK_NAME = "BACKGROUND_WS_KEEP_ALIVE";

// Initialize WebSocket
const initializeWebSocket = (socketRef, showNotification) => {
  const WS = new WS_Class(
    "ws://maingatewayapi.ihs-solutions.com:8001/Notifications?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMzdiN2YzNS0wZWEyLTQxNGYtOGQ4My02OTY0ODEyNzFhMjUiLCJqdGkiOiJhMjFhZjk1YS0yNGVhLTQxZTktOGUxOC0zMmZlYzIwOWNmZjUiLCJpc3MiOiJ5b3VyX2lzc3VlciIsImlhdCI6IjkvNC8yMDI0IDk6MDg6MzYgQU0iLCJleHAiOjE3MzMzMDMzMTYsIlVzZXJuYW1lIjoiYWRtaW4iLCJSb2xlIjoiOCIsIlVzZXJJRCI6ImUzN2I3ZjM1LTBlYTItNDE0Zi04ZDgzLTY5NjQ4MTI3MWEyNSIsIlVzZXJzR3JvdXBJRCI6IjU2NGNmNjVmLTEzMTItNDhkMS1iOThjLThkYzE1NGNlZmM1OSIsIlVzZXJzR3JvdXBEYXNoYm9hcmRGb3JtU2NoZW1hQWN0aW9ucyI6IltdIiwiVXNlcnNHcm91cERhc2hib2FyZE1lbnVJdGVtcyI6Ilt7XCJVc2Vyc0dyb3VwRGFzaGJvYXJkTWVudUl0ZW1JRFwiOlwiMzQ0NzZjOTUtNGE5Ni00OTlkLWJiYzQtMjdmNTc0ZmNlOTYwXCIsXCJEYXNoYm9hcmRNZW51SXRlbU5hbWVcIjpcIkhvbWUgTWFpbiBDb250ZW50c1wiLFwiUm91dGVQYXRoXCI6XCJkeW5hbWljVHJhbnNmb3JtRm9ybVwiLFwiVXNlcnNHcm91cElEXCI6XCI1NjRjZjY1Zi0xMzEyLTQ4ZDEtYjk4Yy04ZGMxNTRjZWZjNTlcIixcIkRhc2hib2FyZEl0ZW1JRFwiOlwiODMxZmM0YzEtMGZkNy00OTQ4LTg0ZTItZjRjOTlkNDc2NDc0XCJ9LHtcIlVzZXJzR3JvdXBEYXNoYm9hcmRNZW51SXRlbUlEXCI6XCJjYTIwMzA2ZS00MjM4LTRkYjUtOGVjZS01NWNhZGU4MGY1ZDhcIixcIkRhc2hib2FyZE1lbnVJdGVtTmFtZVwiOlwiQnJhbmQgQXJlYXNcIixcIlJvdXRlUGF0aFwiOlwiZHluYW1pY1RhYmxlXCIsXCJVc2Vyc0dyb3VwSURcIjpcIjU2NGNmNjVmLTEzMTItNDhkMS1iOThjLThkYzE1NGNlZmM1OVwiLFwiRGFzaGJvYXJkSXRlbUlEXCI6XCI0NDI4OGJhNy0xYTBlLTQ1ZGItYWVlYS1iM2ZiOGUzNjE1NTJcIn0se1wiVXNlcnNHcm91cERhc2hib2FyZE1lbnVJdGVtSURcIjpcImY3MjYzYjc1LThkODUtNGIwNS05OTU5LTlhZDk3ZTFhMjU0OVwiLFwiRGFzaGJvYXJkTWVudUl0ZW1OYW1lXCI6XCJMYW5ndWFnZXNcIixcIlJvdXRlUGF0aFwiOlwiZHluYW1pY1RhYmxlXCIsXCJVc2Vyc0dyb3VwSURcIjpcIjU2NGNmNjVmLTEzMTItNDhkMS1iOThjLThkYzE1NGNlZmM1OVwiLFwiRGFzaGJvYXJkSXRlbUlEXCI6XCI3NmQzMzAwZC1hMTU1LTQ5NjEtYjNiYS00ODNkNTMwODUyYzFcIn0se1wiVXNlcnNHcm91cERhc2hib2FyZE1lbnVJdGVtSURcIjpcImJiZTU0MmYxLWVlOWEtNDk2OS1hMGZlLWExNzhlNjFmZjQ3MFwiLFwiRGFzaGJvYXJkTWVudUl0ZW1OYW1lXCI6XCJQb3N0c1wiLFwiUm91dGVQYXRoXCI6XCJkeW5hbWljVGFibGVcIixcIlVzZXJzR3JvdXBJRFwiOlwiNTY0Y2Y2NWYtMTMxMi00OGQxLWI5OGMtOGRjMTU0Y2VmYzU5XCIsXCJEYXNoYm9hcmRJdGVtSURcIjpcIjA4ZjBiMDg2LThkMTUtNDJhNC04NjkyLWI5MTFiMzQ0OGNmMlwifSx7XCJVc2Vyc0dyb3VwRGFzaGJvYXJkTWVudUl0ZW1JRFwiOlwiZWI4YWFmNWQtNjI0ZS00Nzk4LWEwNzktZTgwOWZkZDU2NDU4XCIsXCJEYXNoYm9hcmRNZW51SXRlbU5hbWVcIjpcIkhvbWUgUG9zdHNcIixcIlJvdXRlUGF0aFwiOlwiZHluYW1pY1RyYW5zZm9ybUZvcm1cIixcIlVzZXJzR3JvdXBJRFwiOlwiNTY0Y2Y2NWYtMTMxMi00OGQxLWI5OGMtOGRjMTU0Y2VmYzU5XCIsXCJEYXNoYm9hcmRJdGVtSURcIjpcIjI1MTY3MzIzLTVmYzYtNGFhZS1hMGExLTI0YmY0Yjk0MzhlYVwifSx7XCJVc2Vyc0dyb3VwRGFzaGJvYXJkTWVudUl0ZW1JRFwiOlwiNTViYWQxMjEtMjBiNC00ZWUzLThiNDktZmMzZTRlZGQ2NzE2XCIsXCJEYXNoYm9hcmRNZW51SXRlbU5hbWVcIjpcIkN1c3RvbWVyIFJlcXVlc3RzXCIsXCJSb3V0ZVBhdGhcIjpcImR5bmFtaWNGb3JtRGVwZW5kZW5jaWVzXCIsXCJVc2Vyc0dyb3VwSURcIjpcIjU2NGNmNjVmLTEzMTItNDhkMS1iOThjLThkYzE1NGNlZmM1OVwiLFwiRGFzaGJvYXJkSXRlbUlEXCI6XCI1MDJjMzdiMy0wZmRlLTQwMjQtYTExYi0yOTU5NjBhOGIxYzlcIn1dIiwiYXVkIjoieW91cl9hdWRpZW5jZSJ9.DwWJGss5Hun5Ak4D4IGIMiI8Ap2c8WBqpPn9kLZ7xWo&languageID=e2b6bd4f-a30b-4d70-ae80-f510479a45eb"
    // "ws://192.168.1.2:8080"
  );
  // const WS = new WS_Class("ws://192.168.1.2:8080");
  socketRef.current = WS.socket;

  WS.connect();

  // Handle incoming messages
  WS.ReciveMessages(showNotification);

  return WS;
};

// Background Task Definition
TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  try {
    // console.log("Running background WebSocket keep-alive task...");
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ action: "ping" }));
      // console.log("WebSocket ping sent.");
    } else {
      // console.warn("WebSocket is not open. Reconnecting...");
      initializeWebSocket(socketRef, () => {});
    }
    return BackgroundFetch.Result.NewData;
  } catch (error) {
    // console.error("Error in background task:", error);
    return BackgroundFetch.Result.Failed;
  }
});

function Notification() {
  // const { notifications, setNotifications } = useContext(WSContext);
  // const { localization } = useContext(LocalizationContext);
  const [notificationsNewNum, setNotificationsNewNum] = useState(0);
  const socketRef = useRef(null);

  // Request notification permissions
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Notification permissions are required!");
      }
    };
    requestPermissions();
  }, []);

  // Setup WebSocket and Background Fetch
  // useEffect(() => {
  //   const showNotification = async (message) => {
  //     console.log("Received message:", message);
  //     await Notifications.scheduleNotificationAsync({
  //       content: {
  //         title: "New Notification",
  //         body: message || "You've received a new notification.",
  //         sound: "default",
  //       },
  //       trigger: null,
  //     });
  //   };

  //   const WS = initializeWebSocket(socketRef, showNotification);

  //   const registerBackgroundTask = async () => {
  //     const status = await BackgroundFetch.getStatusAsync();
  //     if (status === BackgroundFetch.Status.Available) {
  //       // console.log("Background fetch is available.");
  //       await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
  //         minimumInterval: 60, // Every 1 minute
  //         stopOnTerminate: false,
  //         startOnBoot: true,
  //       });
  //     } else {
  //       // console.warn("Background fetch is not available.");
  //     }
  //   };

  //   registerBackgroundTask();

  //   return () => {
  //     WS.disconnect();
  //     BackgroundFetch.unregisterTaskAsync(BACKGROUND_TASK_NAME);
  //     // console.log("WebSocket and background fetch unregistered.");
  //   };
  // }, []);
  const navigation = useNavigation();

  return (
    <View className="flex justify-center items-center">
      {/* <TestBackGroundServices /> */}
      <TouchableOpacity
        onPress={() => navigation.navigate("NotificationScreen")}
        className="p-2 rounded-lg bg-accent items-center justify-center"
      >
        {/* <Icon as={Bell} size={"md"}  /> */}
        <MaterialIcons name="notifications" size={24} className="!text-body" />
        {notificationsNewNum > 0 && <RedCounter count={notificationsNewNum} />}
      </TouchableOpacity>
      {/* bell-dot */}
    </View>
  );
}

export default Notification;
