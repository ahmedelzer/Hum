// // import React, { useEffect } from "react";
// // import { View, Text, Button } from "react-native";
// // import VIForegroundService from "@voximplant/react-native-foreground-service";

// // const TestBackGroundServices = () => {
// //   useEffect(() => {
// //     // Create notification channel when component mounts
// //     createNotificationChannel();
// //   }, []);

// //   return (
// //     <View>
// //       <Text>Test Background Services</Text>
// //       <Button title="Start Service" onPress={startForegroundService} />
// //       <Button title="Stop Service" onPress={stopForegroundService} />
// //     </View>
// //   );
// // };

// // async function createNotificationChannel() {
// //   const channelConfig = {
// //     id: "channelId",
// //     name: "Channel name",
// //     description: "Channel description",
// //     enableVibration: false,
// //   };

// //   try {
// //     await VIForegroundService.getInstance().createNotificationChannel(
// //       channelConfig
// //     );
// //     console.log("Notification channel created successfully!");
// //   } catch (error) {
// //     console.error("Error creating notification channel: ", error);
// //   }
// // }

// // async function startForegroundService() {
// //   const notificationConfig = {
// //     channelId: "channelId",
// //     id: 3456,
// //     title: "Title",
// //     text: "Some text",
// //     icon: "ic_icon",
// //     button: "Some text",
// //   };

// //   try {
// //     await VIForegroundService.getInstance().startService(notificationConfig);
// //     console.log("Foreground service started!");
// //   } catch (e) {
// //     console.error("Error starting foreground service: ", e);
// //   }
// // }

// // async function stopForegroundService() {
// //   try {
// //     await VIForegroundService.getInstance().stopService();
// //     console.log("Foreground service stopped!");
// //   } catch (error) {
// //     console.error("Error stopping foreground service: ", error);
// //   }
// // }

// // export default TestBackGroundServices;
// import React, { useEffect } from "react";
// import { Alert } from "react-native";
// import * as TaskManager from "expo-task-manager";
// import * as BackgroundFetch from "expo-background-fetch";

// const BACKGROUND_TASK = "background-task";

// TaskManager.defineTask(BACKGROUND_TASK, async () => {
//   console.log("Running in the background");
//   // Add your logic here (e.g., log or perform background tasks)
//   return BackgroundFetch.Result.NewData; // Indicate that there is new data
// });

// export default function ForegroundService() {
//   useEffect(() => {
//     // Register the background fetch task
//     const registerBackgroundFetch = async () => {
//       try {
//         await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK, {
//           minimumInterval: 60 * 15, // 15 minutes (minimum allowed)
//           stopOnTerminate: false, // Keep running when app is terminated
//           startOnBoot: true, // Start task on device reboot
//         });
//       } catch (e) {
//         console.error("Failed to register background fetch task", e);
//       }
//     };

//     registerBackgroundFetch();

//     return () => {
//       // Unregister the task when the component unmounts
//       BackgroundFetch.unregisterTaskAsync(BACKGROUND_TASK);
//     };
//   }, []);

//   return null;
// }
