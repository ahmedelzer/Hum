import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LocalizationContext } from "../../../context/LocalizationContext";

export default function GoBackHeader({ title, subTitle }) {
  const navigation = useNavigation();
  const { isRTL } = useContext(LocalizationContext);

  return (
    <View className="flex-row items-center justify-start border-b border-card">
      <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
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
