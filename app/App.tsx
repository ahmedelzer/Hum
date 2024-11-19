import "./global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SafeAreaView, StyleSheet } from "react-native";
// import RootStack from "./src/navigators/RootStack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#fff",
          }}
        >
          {/* <RootStack /> */}
        </SafeAreaView>
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
