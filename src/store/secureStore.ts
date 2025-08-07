import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import LZString from "lz-string";
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
    const compressed = LZString.compressToUTF16(value);
    console.log("====================================");
    console.log(value);
    console.log("====================================");
    await SecureStore.setItemAsync(key, compressed);
  }
};

export const retrieveSecureValue = async (key) => {
  if (Platform.OS === "web") {
    return getCookie(key);
  } else {
    const stored = await SecureStore.getItemAsync(key);
    const decompressed = LZString.decompressFromUTF16(stored);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5Mjk1ZTgxMi02ZDE1LTRlNTMtOTkyMC1jNTQzOTRiYzU2YWQiLCJqdGkiOiJjYjkzY2U0MC1hMTA2LTQ0OTItOWFkYi0zMzIxZDZhZWM4NDMiLCJpc3MiOiJJSFMiLCJpYXQiOiI0LzcvMjAyNSAzOjQ4OjM1IFBNIiwiZXhwIjoxNzUxOTAzMzE1LCJVc2VybmFtZSI6InRlc3RBaG1lZDEyIiwiUm9sZSI6IjAiLCJVc2VySUQiOiI5Mjk1ZTgxMi02ZDE1LTRlNTMtOTkyMC1jNTQzOTRiYzU2YWQiLCJQZXJzb25JRCI6IjMwM2MxZmQ2LTgwMzYtNGFlMS1iMmEwLWZhMDhkNzZmNGNlNyIsIlVzZXJUb2tlbklEIjoiOTEwZmVhMTYtNTJlYS00YzdkLWI4NDktNmZjNjYzYWMzMWFjIiwiQ2xpZW50SUQiOiJkMzgwNDM1NS1hMDljLTQ2ZWMtOTEwYy1kYzAyNGE0YmFlMWIiLCJVc2Vyc0dyb3VwSUQiOiIzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTYiLCJVc2Vyc0dyb3VwRGFzaGJvYXJkRm9ybVNjaGVtYUFjdGlvbnMiOiJbXSIsIlVzZXJzR3JvdXBEYXNoYm9hcmRNZW51SXRlbXMiOiJbXSIsImF1ZCI6IkFsbCJ9.FtNxnquKIVZqH2N_ed9680ByW0HxnACSlRGrFK3pcHg";
    return token;
  }
};

export const deleteKey = async (key) => {
  if (Platform.OS === "web") {
    deleteCookie(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};
