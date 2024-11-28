import React, { useContext, useEffect, useState } from "react";
import { WS_Class } from "../../../components/hooks/ws/WS_Class";
import useNetworkStatus from "../../utils/useNetworkStatus";
import { LocalizationContext } from "../../../context/LocalizationContext";
import { WSContext } from "../../../context/WS";
import { Text } from "react-native";
import { Use } from "react-native-svg";

function Notification() {
  //todo make opartions of ws one context,Insert,Update,Delete and display it in component
  const { notifications, setNotifications } = useContext(WSContext);
  const { localization, languageID, isRTL } = useContext(LocalizationContext);
  const [notificationsNewNum, setNotificationsNewNum] = useState(0);
  const { isOnline } = useNetworkStatus(); //!make isOnline
  // Create a new WebSocket connection
  const WS = new WS_Class(
    "ws://maingatewayapi.ihs-solutions.com:8001/Chanels/Notifications?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMzdiN2YzNS0wZWEyLTQxNGYtOGQ4My02OTY0ODEyNzFhMjUiLCJqdGkiOiJhMjFhZjk1YS0yNGVhLTQxZTktOGUxOC0zMmZlYzIwOWNmZjUiLCJpc3MiOiJ5b3VyX2lzc3VlciIsImlhdCI6IjkvNC8yMDI0IDk6MDg6MzYgQU0iLCJleHAiOjE3MzMzMDMzMTYsIlVzZXJuYW1lIjoiYWRtaW4iLCJSb2xlIjoiOCIsIlVzZXJJRCI6ImUzN2I3ZjM1LTBlYTItNDE0Zi04ZDgzLTY5NjQ4MTI3MWEyNSIsIlVzZXJzR3JvdXBJRCI6IjU2NGNmNjVmLTEzMTItNDhkMS1iOThjLThkYzE1NGNlZmM1OSIsIlVzZXJzR3JvdXBEYXNoYm9hcmRGb3JtU2NoZW1hQWN0aW9ucyI6IltdIiwiVXNlcnNHcm91cERhc2hib2FyZE1lbnVJdGVtcyI6Ilt7XCJVc2Vyc0dyb3VwRGFzaGJvYXJkTWVudUl0ZW1JRFwiOlwiMzQ0NzZjOTUtNGE5Ni00OTlkLWJiYzQtMjdmNTc0ZmNlOTYwXCIsXCJEYXNoYm9hcmRNZW51SXRlbU5hbWVcIjpcIkhvbWUgTWFpbiBDb250ZW50c1wiLFwiUm91dGVQYXRoXCI6XCJkeW5hbWljVHJhbnNmb3JtRm9ybVwiLFwiVXNlcnNHcm91cElEXCI6XCI1NjRjZjY1Zi0xMzEyLTQ4ZDEtYjk4Yy04ZGMxNTRjZWZjNTlcIixcIkRhc2hib2FyZEl0ZW1JRFwiOlwiODMxZmM0YzEtMGZkNy00OTQ4LTg0ZTItZjRjOTlkNDc2NDc0XCJ9LHtcIlVzZXJzR3JvdXBEYXNoYm9hcmRNZW51SXRlbUlEXCI6XCJjYTIwMzA2ZS00MjM4LTRkYjUtOGVjZS01NWNhZGU4MGY1ZDhcIixcIkRhc2hib2FyZE1lbnVJdGVtTmFtZVwiOlwiQnJhbmQgQXJlYXNcIixcIlJvdXRlUGF0aFwiOlwiZHluYW1pY1RhYmxlXCIsXCJVc2Vyc0dyb3VwSURcIjpcIjU2NGNmNjVmLTEzMTItNDhkMS1iOThjLThkYzE1NGNlZmM1OVwiLFwiRGFzaGJvYXJkSXRlbUlEXCI6XCI0NDI4OGJhNy0xYTBlLTQ1ZGItYWVlYS1iM2ZiOGUzNjE1NTJcIn0se1wiVXNlcnNHcm91cERhc2hib2FyZE1lbnVJdGVtSURcIjpcImY3MjYzYjc1LThkODUtNGIwNS05OTU5LTlhZDk3ZTFhMjU0OVwiLFwiRGFzaGJvYXJkTWVudUl0ZW1OYW1lXCI6XCJMYW5ndWFnZXNcIixcIlJvdXRlUGF0aFwiOlwiZHluYW1pY1RhYmxlXCIsXCJVc2Vyc0dyb3VwSURcIjpcIjU2NGNmNjVmLTEzMTItNDhkMS1iOThjLThkYzE1NGNlZmM1OVwiLFwiRGFzaGJvYXJkSXRlbUlEXCI6XCI3NmQzMzAwZC1hMTU1LTQ5NjEtYjNiYS00ODNkNTMwODUyYzFcIn0se1wiVXNlcnNHcm91cERhc2hib2FyZE1lbnVJdGVtSURcIjpcImJiZTU0MmYxLWVlOWEtNDk2OS1hMGZlLWExNzhlNjFmZjQ3MFwiLFwiRGFzaGJvYXJkTWVudUl0ZW1OYW1lXCI6XCJQb3N0c1wiLFwiUm91dGVQYXRoXCI6XCJkeW5hbWljVGFibGVcIixcIlVzZXJzR3JvdXBJRFwiOlwiNTY0Y2Y2NWYtMTMxMi00OGQxLWI5OGMtOGRjMTU0Y2VmYzU5XCIsXCJEYXNoYm9hcmRJdGVtSURcIjpcIjA4ZjBiMDg2LThkMTUtNDJhNC04NjkyLWI5MTFiMzQ0OGNmMlwifSx7XCJVc2Vyc0dyb3VwRGFzaGJvYXJkTWVudUl0ZW1JRFwiOlwiZWI4YWFmNWQtNjI0ZS00Nzk4LWEwNzktZTgwOWZkZDU2NDU4XCIsXCJEYXNoYm9hcmRNZW51SXRlbU5hbWVcIjpcIkhvbWUgUG9zdHNcIixcIlJvdXRlUGF0aFwiOlwiZHluYW1pY1RyYW5zZm9ybUZvcm1cIixcIlVzZXJzR3JvdXBJRFwiOlwiNTY0Y2Y2NWYtMTMxMi00OGQxLWI5OGMtOGRjMTU0Y2VmYzU5XCIsXCJEYXNoYm9hcmRJdGVtSURcIjpcIjI1MTY3MzIzLTVmYzYtNGFhZS1hMGExLTI0YmY0Yjk0MzhlYVwifSx7XCJVc2Vyc0dyb3VwRGFzaGJvYXJkTWVudUl0ZW1JRFwiOlwiNTViYWQxMjEtMjBiNC00ZWUzLThiNDktZmMzZTRlZGQ2NzE2XCIsXCJEYXNoYm9hcmRNZW51SXRlbU5hbWVcIjpcIkN1c3RvbWVyIFJlcXVlc3RzXCIsXCJSb3V0ZVBhdGhcIjpcImR5bmFtaWNGb3JtRGVwZW5kZW5jaWVzXCIsXCJVc2Vyc0dyb3VwSURcIjpcIjU2NGNmNjVmLTEzMTItNDhkMS1iOThjLThkYzE1NGNlZmM1OVwiLFwiRGFzaGJvYXJkSXRlbUlEXCI6XCI1MDJjMzdiMy0wZmRlLTQwMjQtYTExYi0yOTU5NjBhOGIxYzlcIn1dIiwiYXVkIjoieW91cl9hdWRpZW5jZSJ9.DwWJGss5Hun5Ak4D4IGIMiI8Ap2c8WBqpPn9kLZ7xWo&languageID=e2b6bd4f-a30b-4d70-ae80-f510479a45eb"
  );
  useEffect(() => {
    // Early return if token is missing or offline

    // `/Notifications?token=${token}&languageID=${languageID}`

    // Clear notifications when reconnecting
    setNotifications([]); // Reset notifications to an empty array

    // Connect the WebSocket
    WS.connect();
    console.log("WebSocket connected");

    // Cleanup function to disconnect WebSocket on unmount or offline status
    return () => {
      setNotifications([]); // Clear notifications again on cleanup
      WS.disconnect();
      console.log("WebSocket disconnected");
    };
  }, [isOnline]); // Re-run effect when token, online status or languageID changes
  useEffect(() => {
    setTimeout(() => {
      WS.ReciveMessages(showNotification);
    }, 10000);
    // Handle incoming messages and show notifications
    WS.ReciveMessages(showNotification);
  }, [WS.socket.readyState]);
  const showNotification = (notificationencode) => {
    console.log("====================================");
    console.log("notificationencode");
    console.log("====================================");
    const decodedString = decodeURIComponent(notificationencode);
    if (decodedString !== "ping") {
      // If the JSON inside is double-encoded (with escaped quotes), parse it again
      const parsedData = JSON.parse(decodedString);
      const RecivedNotificationsWihotkeyslower =
        parsedData.ope === "Context"
          ? JSON.parse(parsedData.notifications)
          : [parsedData.notifications];
      // Function to recursively convert object keys to lowercase
      const toLowerCaseKeys = (obj) => {
        if (Array.isArray(obj)) {
          return obj.map(toLowerCaseKeys); // Process each element if it's an array
        } else if (obj !== null && typeof obj === "object") {
          return Object.keys(obj).reduce((acc, key) => {
            acc[key.toLowerCase()] = toLowerCaseKeys(obj[key]); // Convert keys and recurse
            return acc;
          }, {});
        }
        return obj; // Return the value if it's not an object or array
      };

      // Convert all keys of RecivedNotifications to lowercase
      const RecivedNotifications = toLowerCaseKeys(
        RecivedNotificationsWihotkeyslower
      );
      console.log(RecivedNotifications, "normal");
      console.log("====================================");
      console.log(parsedData.ope, "normal");
      console.log("====================================");
    }
    // notifications.forEach((notification) => {
    //   notify(
    //     {
    //       message: notification.message,
    //       type: "info",
    //       displayTime: 3500,
    //       width: 250,
    //       animation: {
    //         show: {
    //           type: "slide",
    //           duration: 400,
    //           from: { position: { my: "top", at: "top", of: window } },
    //           to: { position: { my: "top", at: "top", of: window } },
    //         },
    //         hide: { type: "fade", duration: 200 },
    //       },
    //       contentTemplate: (element) => {
    //         const content = document.createElement("div");
    //         content.textContent = localization.notification.buttonClick;
    //         content.style.cursor = "pointer";
    //         content.className = "!p-2 !m-1 color btn text-md font-bold";
    //         content.onclick = () => handleNotifyClick(notification);
    //         element.appendChild(content);
    //       },
    //     },
    //     {
    //       direction: "down-push",
    //       position: "top right",
    //     }
    //   );
    // });

    // WSOperation(notification, notifications, setNotifications);
  };
  return <Text>Notification</Text>;
}

export default Notification;
