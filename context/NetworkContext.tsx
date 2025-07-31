import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import NetInfo from "@react-native-community/netinfo";
import { AppState, Platform, View } from "react-native";
import { Text } from "../components/ui";
import { useErrorToast } from "../src/components/form-container/ShowErrorToast";
import { SetIsOnline } from "../request";

type ConnectionType =
  | "wifi"
  | "cellular"
  | "ethernet"
  | "none"
  | "unknown"
  | "bluetooth"
  | "vpn"
  | "other";

type NetworkStatus = {
  isConnected: boolean;
  isInternetReachable: boolean;
  connectionType: ConnectionType;
  lastUpdated: Date | null;
};

type NetworkContextType = {
  status: NetworkStatus;
  isOnline: boolean;
  checkNetwork: () => Promise<void>;
};

const NetworkContext = createContext<NetworkContextType>({
  status: {
    isConnected: true,
    isInternetReachable: true,
    connectionType: "unknown",
    lastUpdated: null,
  },
  isOnline: false,
  checkNetwork: async () => {},
});

export const NetworkProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [status, setStatus] = useState<NetworkStatus>({
    isConnected: true,
    isInternetReachable: true,
    connectionType: "unknown",
    lastUpdated: null,
  });

  const [isOnline, setIsOnline] = useState(true);
  const [lastChecked, setLastChecked] = useState(Date.now());
  const { showErrorToast } = useErrorToast();
  const checkNetwork = useCallback(async () => {
    try {
      const state = await NetInfo.fetch();

      setStatus({
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable ?? false,
        connectionType: (state.type as ConnectionType) || "unknown",
        lastUpdated: new Date(),
      });
    } catch (error) {
      console.error("Network check failed:", error);
      setStatus({
        isConnected: false,
        isInternetReachable: false,
        connectionType: "unknown",
        lastUpdated: new Date(),
      });
    }
  }, []);

  // Continuous internet verification every 2 seconds

  const verifyInternet = async () => {
    try {
      const netState = await NetInfo.fetch();

      if (!netState.isConnected || !netState.isInternetReachable) {
        console.log("🔴 No network or unreachable");
        SetIsOnline(false);

        // showErrorToast("connection Error", "please connect to internet ");
        setIsOnline(false);
        return;
      }
      setIsOnline(true);
      SetIsOnline(true);
      console.log("🟢 Connected to API", new Date().toLocaleString());
      // Only reload if enough time has passed since the last check (e.g., 5 minutes)
      const now = Date.now();
      const minutesSinceLast = (now - lastChecked) / 1000;
      if (minutesSinceLast > 5 && Platform.OS === "web") {
        console.log("🔄 Reloading due to network change");
        window.location.reload();
      }

      setLastChecked(now);
      // Optional: log type of connection
      console.log(`📡 Network Type: ${netState.type}`);

      // Now test actual API reachability
      // const response = await fetch('http://41.196.0.25:8000/BrandingMartAccounting/api/Accounting/GetAccountInfo', {
      //   method: 'GET',
      //   cache: 'no-store',
      // });

      // if (response.status === 204) {
      //   console.log('🟢 Connected to API');
      //   setIsOnline(true);
      // } else {
      //   console.log('🔴 API responded with unexpected status:', response.status);
      //   setIsOnline(false);
      // }
    } catch (error) {
      console.log("🔴 Error during API check", error);
      setIsOnline(false);
      SetIsOnline(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(verifyInternet, 2000);
    return () => clearInterval(intervalId);
  }, [verifyInternet]);

  // Listen to app state and network status
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setStatus({
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable ?? false,
        connectionType: (state.type as ConnectionType) || "unknown",
        lastUpdated: new Date(),
      });
    });

    const appStateListener = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (nextAppState === "active") {
          checkNetwork();
        }
      }
    );

    checkNetwork();

    return () => {
      unsubscribe();
      appStateListener.remove();
    };
  }, [checkNetwork]);

  return (
    <NetworkContext.Provider value={{ status, isOnline, checkNetwork }}>
      {!isOnline && (
        <View className="bg-red-500 py-2 w-full absolute top-0 z-50">
          <Text className="text-white text-center font-bold">
            ⚠️ You are offline
          </Text>
        </View>
      )}

      {/* Main Content */}
      <View style={{ paddingTop: isOnline ? 0 : 40, flex: 1 }}>{children}</View>
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  return useContext(NetworkContext);
};
