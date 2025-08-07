import React from "react";
import { View, Text } from "react-native";
import { useNetwork } from "../../context/NetworkContext";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../Theme";

const ConnectionStatusOverlay = () => {
  const { isOnline } = useNetwork();

  if (isOnline) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.error,
        paddingVertical: 12,
        paddingHorizontal: 16,
        zIndex: 999,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        elevation: 5,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      }}
    >
      {/* <MaterialIcons name="wifi-off" size={20} color={theme.text} /> */}
      <MaterialIcons name="perm-scan-wifi" size={20} color={theme.text} />
      <Text style={{ color: theme.text, fontSize: 16, fontWeight: "600" }}>
        No Internet Connection
      </Text>
    </View>
  );
};

export default ConnectionStatusOverlay;
