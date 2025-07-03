import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  I18nManager,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { isRTL } from "../../utils/operation/isRTL";

export default function GoBackHeader({
  title,
  subTitle,
  specialAction = false,
  rightComponent,
}) {
  const navigation = useNavigation();
  const goBack = () => {
    if (!specialAction) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        if (Platform.OS === "web") {
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        } else {
          navigation.navigate("Home");
        }
      }
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
          name={isRTL() ? "arrowright" : "arrowleft"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <View>
        {title && <Text className="text-2xl font-bold">{title}</Text>}
        {subTitle && <Text className="text-sm text-text">{subTitle}</Text>}
      </View>
      <View
        className={"absolute top-1 " + `${isRTL() ? "!left-5" : "!right-5"}`}
      >
        {rightComponent ? rightComponent : <View style={{ width: 24 }} />}
      </View>
    </View>
  );
}
