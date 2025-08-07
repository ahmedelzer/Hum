import { useState, useEffect } from "react";
import { Dimensions, Platform } from "react-native";
import * as Device from "expo-device";

export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    os: Platform.OS, // 'ios' | 'android' | 'web'
    modelName: null,
  });

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const modelName = Device.modelName || "Unknown Device";
      setDeviceInfo((prev) => ({ ...prev, modelName }));
    };

    fetchDeviceInfo();

    const updateDimensions = () => {
      setDeviceInfo((prev) => ({
        ...prev,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      }));
    };

    // Listen for screen orientation changes
    const subscription = Dimensions.addEventListener(
      "change",
      updateDimensions
    );

    return () => {
      subscription?.remove();
    };
  }, []);

  return deviceInfo;
};
