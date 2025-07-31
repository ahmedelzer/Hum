import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import LanguageSelector from "../language/LanguageSelector";
import { TabsHeader } from "./Tabs.web";
import { theme } from "../../Theme";
import { useSelector } from "react-redux";

const categoryNavMobileStyles = {
  container: "w-full h-full bg-card p-8",
  closeButtonWrapper: "flex justify-end mb-8 cursor-pointer",
  closeButtonIcon: "text-3xl",
  linkWrapper: "flex flex-col gap-y-8",
};

const CategoryNavMobile = ({ setCatNavMobile }) => {
  const navigation = useNavigation();
  const localization = useSelector((state) => state.localization.localization);

  const handleNavigate = (routeName) => {
    navigation.reset({
      index: 0,
      routes: [{ name: routeName }],
    });
    setCatNavMobile(false); // close after navigation
  };

  return (
    <View
      className={categoryNavMobileStyles.container}
      style={{ backgroundColor: theme.body }}
    >
      {/* Close button */}

      {/* Navigation Links via TabsHeader */}
      <View className={categoryNavMobileStyles.linkWrapper}>
        <TabsHeader direction="vertical" />

        {/* Language Selector */}
        <View className="mt-6">
          <Text className="uppercase mb-1 font-medium">
            {localization.navbar.language}
          </Text>
          <LanguageSelector />
        </View>
      </View>
    </View>
  );
};

export default CategoryNavMobile;
