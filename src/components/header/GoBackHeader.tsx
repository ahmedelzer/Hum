import { View, Text, TouchableOpacity, I18nManager } from "react-native";
import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LocalizationContext } from "../../../context/LocalizationContext";

export default function GoBackHeader({
  title,
  subTitle,
  specialAction = false,
  rightComponent,
}) {
  const navigation = useNavigation();
  const goBack = () => {
    if (!specialAction) {
      navigation.goBack();
    } else {
      specialAction();
    }
  };
  return (
    <View
      className={`${
        !specialAction && "border-b border-card "
      }flex-row items-center justify-start relative`}
    >
      <TouchableOpacity onPress={goBack} className="p-2">
        <AntDesign
          name={I18nManager.isRTL ? "arrowright" : "arrowleft"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <View>
        {title && <Text className="text-2xl font-bold">{title}</Text>}
        {subTitle && <Text className="text-sm text-text">{subTitle}</Text>}
      </View>
      <View
        className={
          "absolute top-1 " + `${I18nManager.isRTL ? "right-5" : "right-5"}`
        }
      >
        {rightComponent ? rightComponent : <View style={{ width: 24 }} />}
      </View>
    </View>
  );
}
