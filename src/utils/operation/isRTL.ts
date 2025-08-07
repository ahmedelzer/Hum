import { I18nManager, Platform } from "react-native";

export const isRTL = (): boolean => {
  let isRTL = false;
  if (Platform.OS === "web") {
    if (window.document.dir === "rtl") isRTL = true;
  } else {
    isRTL = I18nManager.isRTL;
  }
  return isRTL;
};
