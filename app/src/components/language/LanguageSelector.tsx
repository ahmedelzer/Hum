import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  I18nManager,
  DevSettings,
} from "react-native";
import schemaLanguages from "../../Schemas/LanguageSchema/LanguageSchema.json";
import LanguageSchemaActions from "../../Schemas/LanguageSchema/LanguageSchemaActions.json";
import LocalizationSchemaActions from "../../Schemas/Localization/LocalizationSchemaActions.json";
import staticLocalization from "../../../context/staticLocalization.json";
import { Dropdown } from "react-native-element-dropdown";
import { GetProjectUrl, SetHeaders, SetReoute } from "../../../request";
import { LanguageContext } from "../../../context/Language";
import useFetch from "../../../components/hooks/APIsFunctions/useFetch";
import { DeepMerge } from "./DeepMerge";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import UseFetchWithoutBaseUrl from "../../../components/hooks/APIsFunctions/UseFetchWithoutBaseUrl";
import { LocalizationContext } from "../../../context/LocalizationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
const LanguageSelector = () => {
  const [selectedLanguage, SetSelectedLanguage] = useState(null); // or an appropriate default value
  const [isFocus, setIsFocus] = useState(false);
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
    isRTL,
    setIsRTL,
    language: Lan,
    setLanguage,
    setLocalization,
    setLanguageID,
  } = useContext(LocalizationContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!Lan || !(await AsyncStorage.getItem("languageID"))) {
        const shortName = data?.dataSource[0]?.shortName;

        const language = data?.dataSource?.find(
          (language) => language.shortName === shortName
        );
        SetSelectedLanguage(shortName);
        PrepareLanguage(shortName, language);
      } else {
        AsyncStorage.getItem("language").then((savedLanguage) => {
          SetSelectedLanguage(savedLanguage); // Set the state from AsyncStorage
        });
      }
    };

    fetchData();
  }, [data]);

  const changeLanguage = (lang) => {
    const language = data?.dataSource?.find(
      (language) => language.shortName === lang
    );
    PrepareLanguage(lang, language);
  };
  function PrepareLanguage(shortName: string, language: any) {
    SetSelectedLanguage(shortName);
    setLanguage(shortName);
    if (language) {
      AsyncStorage.setItem("languageID", language.languageID);
      setLanguageID(language.languageID);
      AsyncStorage.setItem("language", shortName);
      if (language.rightDirectionEnable !== isRTL) {
        setIsRTL(language.rightDirectionEnable);
        AsyncStorage.setItem("right", language.rightDirectionEnable.toString());
        I18nManager.forceRTL(language.rightDirectionEnable);
        DevSettings.reload();
      }
    }
  }
  // //localization
  const getLocalizationAction = LocalizationSchemaActions?.find(
    (action) => action.dashboardFormActionMethodType === "Get"
  );

  // // Using useFetch hook to fetch data
  const language = selectedLanguage || Lan;
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
  const renderLabel = () => {
    if (selectedLanguage || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };
  // const data = [
  //   { label: "Item 1", value: "1" },
  //   { label: "Item 2", value: "2" },
  //   { label: "Item 3", value: "3" },
  //   { label: "Item 4", value: "4" },
  //   { label: "Item 5", value: "5" },
  //   { label: "Item 6", value: "6" },
  //   { label: "Item 7", value: "7" },
  //   { label: "Item 8", value: "8" },
  // ];
  const items =
    data?.dataSource?.map((name) => {
      return { label: name.shortName, value: name.shortName };
    }) || [];
  const [value, setValue] = useState(null);
  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={items}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={selectedLanguage}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          changeLanguage(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default LanguageSelector;
