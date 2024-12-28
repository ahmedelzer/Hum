// import { StateStorage } from "zustand/middleware";
// import { MMKV } from "react-native-mmkv";
// import { Platform } from "react-native";

// let AES: any, Utf8: any;
// if (Platform.OS === "web") {
//   AES = require("crypto-js/aes");
//   Utf8 = require("crypto-js/enc-utf8");
// }

// export const storage = new MMKV();

// export function getItem<T>(key: string): T | null {
//   const value = storage.getString(key);
//   console.log(`getItem - key: ${key}, value: ${value}`);
//   return value ? JSON.parse(value) : null;
// }

// export function setItem<T>(key: string, value: T): void {
//   // console.log(`setItem - key: ${key}, value: ${JSON.stringify(value)}`);
//   storage.set(key, JSON.stringify(value));
// }

// export function removeItem(key: string): void {
//   console.log(`removeItem - key: ${key}`);
//   storage.delete(key);
// }

// export function clearStorage(): void {
//   console.log(`clearStorage`);
//   storage.clearAll();
// }

// export const zustandStorage: StateStorage = {
//   setItem: (name, value) => {
//     // console.log(
//     //   `zustandStorage.setItem - name: ${name}, value: ${JSON.stringify(value)}`
//     // );
//     if (Platform.OS === "web") {
//       // Convert the value to a string and encrypt it
//       const encryptedValue = AES.encrypt(
//         JSON.stringify(value),
//         name
//       ).toString();
//       // Store the encrypted string
//       storage.set(name, encryptedValue);
//     } else {
//       storage.set(name, JSON.stringify(value));
//     }
//   },
//   getItem: (name) => {
//     const value = storage.getString(name);
//     // console.log(`zustandStorage.getItem - name: ${name}, value: ${value}`);
//     if (value) {
//       if (Platform.OS === "web") {
//         // Decrypt the value
//         const bytes = AES.decrypt(value, name);
//         const decryptedValue = bytes.toString(Utf8);
//         // Convert the decrypted string back to its original format
//         try {
//           return JSON.parse(decryptedValue);
//         } catch (error) {
//           console.error("Error parsing decrypted value:", error);
//           return null;
//         }
//       } else {
//         return JSON.parse(value);
//       }
//     }
//     return null;
//   },
//   removeItem: (name) => {
//     console.log(`zustandStorage.removeItem - name: ${name}`);
//     storage.delete(name);
//   },
// };
