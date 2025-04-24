import React, { createContext, useEffect, useState } from "react";
import { DevSettings, I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";
import staticLocalization from "./staticLocalization.json";

// Define the shape of the Localization context
interface LocalizationContextType {
  isRTL: boolean;
  setIsRTL: React.Dispatch<React.SetStateAction<boolean>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  localization: object;
  setLocalization: React.Dispatch<
    React.SetStateAction<typeof staticLocalization>
  >;
  languageID: string;
  setLanguageID: React.Dispatch<React.SetStateAction<string>>;
}

// Define the LocalizationContext
export const LocalizationContext = createContext<LocalizationContextType>({
  isRTL: false,
  setIsRTL: () => {},
  language: "en",
  setLanguage: () => {},
  localization: staticLocalization,
  setLocalization: () => {},
  languageID: "",
  setLanguageID: () => {},
});

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isRTL, setIsRTL] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("en");
  const [localization, setLocalization] =
    useState<typeof staticLocalization>(staticLocalization);
  const [languageID, setLanguageID] = useState<string>("");

  // useEffect(() => {
  //   const initializeLocalization = async () => {
  //     const savedDirection = await AsyncStorage.getItem("isRTL");
  //     const savedLanguage = await AsyncStorage.getItem("language");
  //     const savedLocalization = await AsyncStorage.getItem("localization");
  //     const savedLanguageID = await AsyncStorage.getItem("languageID");
  //     console.log(savedDirection, savedLanguage, "savedLanguage");
  //     console.log(savedDirection, "sss");
  //     if (savedDirection !== null) {
  //       const direction = savedDirection === "true";
  //       setIsRTL(direction);
  //       if (I18nManager.isRTL !== direction) {
  //         console.log(
  //           I18nManager.isRTL,
  //           direction,
  //           "I18nManager.isRTL from cond"
  //         );
  //         I18nManager.allowRTL(direction);
  //         I18nManager.forceRTL(direction);
  //         // RNRestart.Restart(); // ⬅️ this is required to apply the change
  //         // return;
  //       }
  //     } else {
  //       I18nManager.forceRTL(false); //!delete that
  //       console.log(I18nManager.isRTL, "I18nManager.isRTL");
  //       setIsRTL(false);
  //     }
  //     if (savedLanguage) {
  //       setLanguage(savedLanguage);
  //     }

  //     if (savedLocalization) {
  //       setLocalization(
  //         typeof savedLocalization === "string"
  //           ? JSON.parse(savedLocalization)
  //           : savedLocalization
  //       );
  //     }

  //     if (savedLanguageID) {
  //       setLanguageID(savedLanguageID);
  //     }
  //   };

  //   initializeLocalization();
  // }, []);
  useEffect(() => {
    const initializeLocalization = async () => {
      const savedDirection = await AsyncStorage.getItem("isRTL");
      const savedLanguage = await AsyncStorage.getItem("language");
      const savedLocalization = await AsyncStorage.getItem("localization");
      const savedLanguageID = await AsyncStorage.getItem("languageID");

      let directionToSet = false; // Default to LTR (English)

      if (savedDirection !== null) {
        directionToSet = savedDirection === "true";
      } else {
        // If first time, save default (LTR)
        await AsyncStorage.setItem("isRTL", "false");
      }

      console.log("I18nManager.isRTL:", I18nManager.isRTL);
      console.log("directionToSet:", directionToSet);

      if (I18nManager.isRTL !== directionToSet) {
        console.log("Direction mismatch. Changing direction and restarting.");
        I18nManager.forceRTL(directionToSet);
        setTimeout(() => RNRestart.Restart(), 100); // small delay to avoid immediate loop
        return; // prevent setting state after restart request
      }

      // Set states (only if no restart is needed)
      setIsRTL(directionToSet);

      if (savedLanguage) {
        setLanguage(savedLanguage);
      }

      if (savedLocalization) {
        setLocalization(
          typeof savedLocalization === "string"
            ? JSON.parse(savedLocalization)
            : savedLocalization
        );
      }

      if (savedLanguageID) {
        setLanguageID(savedLanguageID);
      }
    };

    initializeLocalization();
  }, []);

  return (
    <LocalizationContext.Provider
      value={{
        isRTL,
        setIsRTL,
        language,
        setLanguage,
        localization,
        setLocalization,
        languageID,
        setLanguageID,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};
