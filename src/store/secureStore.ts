import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// Helpers for web cookies
function setCookie(key, value, days = 30) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${key}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(key) {
  const cookies = document.cookie.split("; ").reduce((acc, current) => {
    const [k, v] = current.split("=");
    acc[k] = decodeURIComponent(v);
    return acc;
  }, {});
  return cookies[key] ?? null;
}

function deleteCookie(key) {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Secure store fallback handling
export const saveSecureValue = async (key, value) => {
  if (Platform.OS === "web") {
    setCookie(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

export const retrieveSecureValue = async (key) => {
  if (Platform.OS === "web") {
    return getCookie(key);
  } else {
    return await SecureStore.getItemAsync(key);
  }
};

export const deleteKey = async (key) => {
  if (Platform.OS === "web") {
    deleteCookie(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};
