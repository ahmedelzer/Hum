import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import {
  DevSettings,
  I18nManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import useFetch from "../../../components/hooks/APIsFunctions/useFetch";
import UseFetchWithoutBaseUrl from "../../../components/hooks/APIsFunctions/UseFetchWithoutBaseUrl";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "../../../components/ui";
import { LocalizationContext } from "../../../context/LocalizationContext";
import staticLocalization from "../../../context/staticLocalization.json";
import { GetProjectUrl, SetReoute } from "../../../request";
import schemaLanguages from "../../Schemas/LanguageSchema/LanguageSchema.json";
import LanguageSchemaActions from "../../Schemas/LanguageSchema/LanguageSchemaActions.json";
import LocalizationSchemaActions from "../../Schemas/Localization/LocalizationSchemaActions.json";
import { DeepMerge } from "./DeepMerge";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RNRestart from "react-native-restart";
const LanguageSelector = () => {
  const prams = schemaLanguages.dashboardFormSchemaParameters;
  const languageName = prams.find(
    (pram) => pram.parameterType === "Language"
  ).parameterField;
  const direction = prams.find(
    (pram) => pram.parameterType === "Direction"
  ).parameterField;
  SetReoute(schemaLanguages.projectProxyRoute);
  const dataSourceAPI = (query) =>
    buildApiUrl(query, {
      pageIndex: 1,
      pageSize: 1000,
      activeStatus: 1,
    });
  const getAction =
    LanguageSchemaActions &&
    LanguageSchemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Get"
    );
  const query = dataSourceAPI(getAction);
  const { data } = UseFetchWithoutBaseUrl(query);
  const {
    languageRow: Lan,
    setLanguageRow,
    setLocalization,
  } = useContext(LocalizationContext);
  useEffect(() => {
    const fetchData = async () => {
      if (Lan && Object.keys(Lan).length < 0) {
        const shortName = data?.dataSource[0][languageName];

        const language = data?.dataSource?.find(
          (language) => language[languageName] === shortName
        );
        PrepareLanguage(shortName, language);
      }
    };

    fetchData();
  }, [data]);

  const changeLanguage = async (lang) => {
    await PrepareLanguage(lang[languageName], lang);
  };
  async function PrepareLanguage(shortName: string, language: any) {
    // SetSelectedLanguage(shortName);
    setLanguageRow(language);
    if (language) {
      AsyncStorage.setItem("languageRow", JSON.stringify(language));
      if (language[direction] !== I18nManager.isRTL) {
        AsyncStorage.setItem("isRTL", language[direction].toString());
        console.log("restart", language);
        I18nManager.forceRTL(language[direction]);
        RNRestart.Restart();
      }
    }
  }
  // //localization
  const getLocalizationAction = LocalizationSchemaActions?.find(
    (action) => action.dashboardFormActionMethodType === "Get"
  );

  // // Using useFetch hook to fetch data
  const language = Lan[languageName];
  const { data: localization } = useFetch(
    `/${getLocalizationAction?.routeAdderss}/${language}`,
    GetProjectUrl()
  );

  useEffect(() => {
    if (localization) {
      const localFormat = localization.replace(
        /ObjectId\("([^"]+)"\)/g,
        '"$1"'
      );
      const dataObject = JSON.parse(localFormat);
      delete dataObject._id;
      const merged = DeepMerge(staticLocalization, dataObject);
      setLocalization(typeof merged === "string" ? JSON.parse(merged) : merged);
      AsyncStorage.setItem("localization", JSON.stringify(merged));
    }
  }, [localization, setLocalization]);

  return (
    <View className="mx-2">
      <Select
        value={Lan[languageName]}
        onValueChange={changeLanguage}
        className="flex-1"
      >
        <SelectTrigger
          variant="unstyled" // use 'unstyled' to fully control appearance
          size="sm"
          className="flex-1 flex-row items-center justify-between h-11 px-3 bg-transparent border border-border rounded-md"
        >
          <SelectInput
            placeholder="Select option"
            value={Lan[languageName]}
            className="text-base text-text "
          />
          <FontAwesome name="edit" size={18} className="text-text ms-2" />
        </SelectTrigger>

        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>

            {data?.dataSource?.map((language) => (
              <SelectItem
                key={language[schemaLanguages.idField]}
                label={language[languageName]}
                value={language}
              />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
    </View>
  );
};
export default LanguageSelector;
