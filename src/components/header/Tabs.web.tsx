import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";



export function TabsHeader({ direction = "horizontal" }) {
  const navigation = useNavigation();
  const route = useRoute();
  const activeTab = route.name;

  const tabs = [
    { name: "Home", icon: "home" },
    { name: "MenuView", icon: "menu" },
    { name: "Orders", icon: "receipt" },
    { name: "Profile", icon: "person" },
  ];

  return (
    <View className={`flex ${direction === "horizontal" ? "flex-row gap-4" : "flex-col gap-6"}`}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: tab.name }],
            })
          }
          className={`flex items-center justify-center px-4 py-2 rounded-lg duration-300 transition-all ${
            activeTab === tab.name
              ? "bg-accent text-body"
              : "bg-transparent text-muted hover:bg-accent hover:text-body"
          }`}
        >
          <View className={`flex ${direction === "horizontal" ? "flex-row items-center" : "flex-col items-center"} gap-1`}>
            <MaterialIcons
              name={tab.icon}
              size={22}
              className={`${
                activeTab === tab.name ? "text-body" : "text-primary-custom"
              }`}
            />
            <Text
              className={`${
                activeTab === tab.name ? "text-body" : "text-primary-custom"
              } font-medium`}
            >
              {tab.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

