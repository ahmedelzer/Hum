import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { I18nManager, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RNRestart from "react-native-restart";

import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "../../../components/ui";

import useFetch from "../../../components/hooks/APIsFunctions/useFetch";
import UseFetchWithoutBaseUrl from "../../../components/hooks/APIsFunctions/UseFetchWithoutBaseUrl";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import staticLocalization from "../../../context/staticLocalization.json";
import { GetProjectUrl, SetReoute } from "../../../request";

import schemaLanguages from "../../Schemas/LanguageSchema/LanguageSchema.json";
import LanguageSchemaActions from "../../Schemas/LanguageSchema/LanguageSchemaActions.json";
import LocalizationSchemaActions from "../../Schemas/Localization/LocalizationSchemaActions.json";
import {
  setLanguageRow,
  setLocalization,
} from "../../reducers/localizationReducer";
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

  SetReoute(schemaLanguages.projectProxyRoute);

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
        I18nManager.forceRTL(language[direction]);
        RNRestart.Restart();
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
      dispatch(
        setLocalization(
          typeof merged === "string" ? JSON.parse(merged) : merged
        )
      );
    }
  }, [localization]);

  return (
    <View className="mx-2">
      <Select
        value={languageRow[languageName]}
        onValueChange={changeLanguage}
        className="flex-1"
      >
        <SelectTrigger
          variant="unstyled"
          size="sm"
          className="flex-1 flex-row items-center justify-between h-11 px-3 bg-transparent border border-border rounded-md"
        >
          <SelectInput
            placeholder="Select option"
            value={languageRow[languageName]}
            className="text-base text-text"
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
