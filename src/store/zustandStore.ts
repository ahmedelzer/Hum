// import { create } from "zustand";

// interface TokenStore {
//   token: string | null;
//   setToken: (token: string | null) => void;
// }

// const useToken = create<TokenStore>((set) => ({
//   token: null,
//   setToken: (token) => set({ token }),
// }));

// export default useToken;
import * as SecureStore from "expo-secure-store";

// npx expo install expo-secure-store

export const saveSecureValue = async (key: any, value: any) => {
  await SecureStore.setItemAsync(key, value);
};

export const retrieveSecureValue = async (key: any) => {
  let result = await SecureStore.getItemAsync(key);
  return result;
};

export const deleteKey = async (key: any) => {
  await SecureStore.deleteItemAsync(key);
};
