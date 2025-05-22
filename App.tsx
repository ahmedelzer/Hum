import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView, StyleSheet } from "react-native";
import { GluestackUIProvider } from "./components/ui";
import "./global.css";
// import AppNavigation from "./navigation/AppNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { LocalizationProvider } from "./context/LocalizationContext";
import { WS_Provider } from "./context/WS";
import { AuthProvider } from "./context/auth";
import RootStack from "./src/navigators/RootStack";
import store from "./src/store/reduxStore";

const queryClient = new QueryClient();
// Task name constant
// const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

// // Define the background task
// TaskManager.defineTask(
//   BACKGROUND_NOTIFICATION_TASK,
//   ({ data, error, executionInfo }) => {
//     if (error) {
//       console.log("Error occurred in background notification task:", error);
//     } else if (data) {
//       console.log("Background notification data:", data);
//     }
//   }
// );

// // Register the task at a global level
// Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK).catch((error) =>
//   console.error("Task registration failed:", error)
// );
export default function App() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <GluestackUIProvider>
            <LocalizationProvider>
              <WS_Provider>
                <AuthProvider>
                  <SafeAreaView
                    style={{
                      flex: 1,
                      // backgroundColor: "#000",
                    }}
                  >
                    <RootStack />
                  </SafeAreaView>
                </AuthProvider>
              </WS_Provider>
            </LocalizationProvider>
          </GluestackUIProvider>
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
    // <Notification />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// http://maingatewayapi.ihs-solutions.com:8000/${projectProxyRoute}/Api
