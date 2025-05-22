import React, { createContext, useEffect, useState } from "react";
import { DevSettings, I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";
import staticLocalization from "./staticLocalization.json";
import { lang } from "moment";

// Define the shape of the Localization context
interface LocalizationContextType {
  languageRow: object;
  setLanguageRow: React.Dispatch<React.SetStateAction<string>>;
  localization: object;
  setLocalization: React.Dispatch<
    React.SetStateAction<typeof staticLocalization>
  >;
  languageID: string;
  setLanguageID: React.Dispatch<React.SetStateAction<string>>;
}

// Define the LocalizationContext
export const LocalizationContext = createContext<LocalizationContextType>({
  languageRow: {},
  setLanguageRow: () => {},
  localization: staticLocalization,
  setLocalization: () => {},
  languageID: "",
  setLanguageID: () => {},
});

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [languageRow, setLanguageRow] = useState<object>({});
  const [localization, setLocalization] =
    useState<typeof staticLocalization>(staticLocalization);

  useEffect(() => {
    const initializeLocalization = async () => {
      const savedDirection = await AsyncStorage.getItem("isRTL");
      const savedLocalization = await AsyncStorage.getItem("localization");
      const savedLanguageRow = await AsyncStorage.getItem("languageRow");
      console.log(savedDirection, savedLanguageRow, "savedLanguage");
      if (savedDirection !== null) {
        const direction = savedDirection === "true";
        if (I18nManager.isRTL !== direction) {
          console.log(
            I18nManager.isRTL,
            direction,
            "I18nManager.isRTL from cond"
          );
          // I18nManager.allowRTL(direction);
          I18nManager.forceRTL(direction);
          // RNRestart.Restart(); // ⬅️ this is required to apply the change
          // return;
        }
      }
      // else {
      //   I18nManager.forceRTL(false); //!delete that
      //   console.log(I18nManager.isRTL, "I18nManager.isRTL");
      // }
      // I18nManager.forceRTL(true); //!delete that
      // console.log(I18nManager.isRTL, "I18nManager.isRTL");
      // setIsRTL(true);
      if (savedLanguageRow) {
        setLanguageRow(
          typeof savedLanguageRow === "string"
            ? JSON.parse(savedLanguageRow)
            : savedLanguageRow
        );
      }

      if (savedLocalization) {
        setLocalization(
          typeof savedLocalization === "string"
            ? JSON.parse(savedLocalization)
            : savedLocalization
        );
      }
    };

    initializeLocalization();
  }, []);

  return (
    <LocalizationContext.Provider
      value={{
        localization,
        setLocalization,
        languageRow,
        setLanguageRow,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};
