import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { GluestackUIProvider } from "./components/ui";
import "./global.css";
// import AppNavigation from "./navigation/AppNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
// import  {PreparingApp} from "./context/PreparingApp";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "./context/auth";
import RootStack from "./src/navigators/RootStack";
import { persistor, store } from "./src/store/reduxStore";
import { theme } from "./src/Theme";
import UserProviderLayer from "./context/UserProviderLayer";
import { PreparingApp } from "./context/PreparingApp";
import { WSProvider } from "./context/WSProvider";
import { SchemaProvider } from "./context/SchemaProvider";
import { NetworkProvider } from "./context/NetworkContext";
import { ShopNodeProvider } from "./context/ShopNodeProvider";
// import UserProviderLayer from "./context/UserProviderLayer";

const queryClient = new QueryClient();

export default function App() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <PersistGate
          loading={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color={theme.accentHover} />
            </View>
          }
          persistor={persistor}
        >
          <QueryClientProvider client={queryClient}>
            <GluestackUIProvider mode="light">
              <NetworkProvider>
                <ShopNodeProvider>
                  <PreparingApp>
                    <AuthProvider>
                      <SafeAreaView style={{ flex: 1, overflow: "scroll" }}>
                        <UserProviderLayer />
                        <SchemaProvider>
                          <WSProvider>
                            <RootStack />
                          </WSProvider>
                        </SchemaProvider>
                      </SafeAreaView>
                    </AuthProvider>
                  </PreparingApp>
                </ShopNodeProvider>
              </NetworkProvider>
            </GluestackUIProvider>
          </QueryClientProvider>
        </PersistGate>
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
