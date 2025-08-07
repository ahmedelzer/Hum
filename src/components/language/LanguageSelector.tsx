import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager, Platform, View } from "react-native";
import RNRestart from "react-native-restart";

import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import useFetch from "../../../components/hooks/APIsFunctions/useFetch";
import UseFetchWithoutBaseUrl from "../../../components/hooks/APIsFunctions/UseFetchWithoutBaseUrl";
import staticLocalization from "../../../context/staticLocalization.json";
import { GetProjectUrl } from "../../../request";

import {
  setLanguageRow,
  setLocalization,
} from "../../reducers/localizationReducer";
import schemaLanguages from "../../Schemas/LanguageSchema/LanguageSchema.json";
import LanguageSchemaActions from "../../Schemas/LanguageSchema/LanguageSchemaActions.json";
import LocalizationSchemaActions from "../../Schemas/Localization/LocalizationSchemaActions.json";
import SelectComponent from "../../utils/component/SelectComponent";
import { DeepMerge } from "./DeepMerge";
const LanguageSelector = () => {
  const dispatch = useDispatch();
  const languageRow = useSelector((state) => state.localization.languageRow);

  const prams = schemaLanguages.dashboardFormSchemaParameters;

  const languageName = prams.find(
    (p) => p.parameterType === "Language"
  ).parameterField;
  const direction = prams.find(
    (p) => p.parameterType === "Direction"
  ).parameterField;

  const dataSourceAPI = (query) =>
    buildApiUrl(query, {
      pageIndex: 1,
      pageSize: 1000,
      activeStatus: 1,
 
    });

  const getLanguageAction = LanguageSchemaActions?.find(
    (action) => action.dashboardFormActionMethodType === "Get"
  );

  const query = dataSourceAPI(getLanguageAction);
  const { data } = UseFetchWithoutBaseUrl(query);

  useEffect(() => {
    if (
      languageRow &&
      Object.keys(languageRow).length === 0 &&
      data?.dataSource?.length > 0
    ) {
      const shortName = data?.dataSource[0][languageName];
      const language = data?.dataSource?.find(
        (lang) => lang[languageName] === shortName
      );
      PrepareLanguage(shortName, language);
    }
  }, [data]);

  const changeLanguage = async (lang) => {
    await PrepareLanguage(lang[languageName], lang);
  };

  async function PrepareLanguage(shortName, language) {
    dispatch(setLanguageRow(language)); // Redux action handles storage
    if (language) {
      if (language[direction] !== I18nManager.isRTL) {
        AsyncStorage.setItem("isRTL", language[direction].toString());
        if (Platform.OS === "web") {
          window.document.dir = language[direction] ? "rtl" : "ltr";
        } else {
          I18nManager.forceRTL(language[direction]);
          RNRestart.Restart();
        }
      }
    }
  }

  // fetch localization
  const getLocalizationAction = LocalizationSchemaActions?.find(
    (action) => action.dashboardFormActionMethodType === "Get"
  );

  const currentLang = languageRow[languageName];
  const { data: localization } = useFetch(
    `/${getLocalizationAction?.routeAdderss}/${currentLang}`,
    schemaLanguages.projectProxyRoute
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
      dispatch(
        setLocalization(
          typeof merged === "string" ? JSON.parse(merged) : merged
        )
      );
    }
  }, [localization]);
  return (
    <View className="mx-2">
      <SelectComponent
        idField={schemaLanguages.idField}
        labelField={languageName}
        mapData={data?.dataSource}
        onValueChange={(shortName) => {
          const lang = data?.dataSource?.find(
            (item) => item[languageName] === shortName
          );
          changeLanguage(lang);
        }}
        selectedValue={languageRow[languageName]}
        valueField={languageName}
        IconComponent={
          <FontAwesome name="edit" size={18} className="text-text ms-2" />
        }
      />
    </View>
  );
};

export default LanguageSelector;
