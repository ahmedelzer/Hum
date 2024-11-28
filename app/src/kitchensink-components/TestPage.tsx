import React, { useContext } from "react";
import { Text, View, Button, StyleSheet, I18nManager } from "react-native";
import { LocalizationContext } from "../../context/LocalizationContext";
import LanguageSelector from "../components/language/LanguageSelector";

const SettingsScreen = () => {
  return <LanguageSelector />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});

export default SettingsScreen;
