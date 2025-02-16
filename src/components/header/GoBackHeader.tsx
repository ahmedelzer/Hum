import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LocalizationContext } from "../../../context/LocalizationContext";

export default function GoBackHeader({
  title,
  subTitle,
  specialAction = false,
}) {
  const navigation = useNavigation();
  const { isRTL } = useContext(LocalizationContext);
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
      }flex-row items-center justify-start`}
    >
      <TouchableOpacity onPress={goBack} className="p-2">
        <AntDesign
          name={isRTL ? "arrowright" : "arrowleft"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <View>
        {title && <Text className="text-2xl font-bold">{title}</Text>}
        {subTitle && <Text className="text-sm text-text">{subTitle}</Text>}
      </View>
    </View>
  );
}
