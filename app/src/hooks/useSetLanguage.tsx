import type TranslateOptions from "i18next";
import memoize from "lodash.memoize";
import { useCallback, useEffect } from "react";
import { I18nManager } from "react-native";
import { useMMKVString } from "react-native-mmkv";
import { storage } from "../utils/storage";
import i18n from "../i18n";
import * as Localization from "expo-localization";

export const LOCAL = "local";

export const translate = memoize(
  (key, options = undefined) => i18n.t(key, options) as unknown as string,
  (key, options: typeof TranslateOptions) =>
    options ? key + JSON.stringify(options) : key
);

export const changeLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
  if (lang === "ar") {
    I18nManager.forceRTL(true);
    setTimeout(() => {
      location.reload();
    }, 300);
  } else {
    I18nManager.forceRTL(false);
    setTimeout(() => {
      location.reload();
    }, 300);
  }
};

export const useSelectedLanguage = () => {
  const [language, setLang] = useMMKVString(LOCAL);
  const defaultLang = Localization.locale.split("-")[0];

  useEffect(() => {
    const lang = storage.getString(LOCAL) || defaultLang;
    setLang(lang);
  }, [language]);

  const setLanguage = useCallback(
    (lang: string) => {
      setLang(lang);
      if (lang !== undefined) changeLanguage(lang as string);
    },
    [setLang]
  );

  return { language, setLanguage };
};
