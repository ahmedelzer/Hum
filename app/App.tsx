import "./global.css";
import { SafeAreaView, StyleSheet, View } from "react-native";
import RootStack from "./src/navigators/RootStack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GluestackUIProvider } from "./components/ui";
// import AppNavigation from "./navigation/AppNavigation";
import { Text } from "react-native";
import { LocalizationProvider } from "./context/LocalizationContext";
import { AuthProvider } from "./context/auth";
import Notification from "./src/components/notification/Notification";
import { WS_Class } from "./components/hooks/ws/WS_Class";
import Header from "./src/kitchensink-components/Header";
import { WS_Provider } from "./context/WS";

const queryClient = new QueryClient();
console.log("====================================");
console.log();
console.log("====================================");
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <LocalizationProvider>
          <WS_Provider>
            <AuthProvider>
              <SafeAreaView
                style={{
                  flex: 1,
                  // backgroundColor: "#111111",
                }}
                // className="bg-body"
              >
                {/* <Notification /> */}
                <RootStack />
                {/* <WebSocketBackgroundService /> */}
              </SafeAreaView>
            </AuthProvider>
          </WS_Provider>
        </LocalizationProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
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
