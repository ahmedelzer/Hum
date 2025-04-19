import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export function TabsHeader() {
  const navigation = useNavigation();
  const route = useRoute(); // Get current route
  const activeTab = route.name; // Set active tab based on current route

  // Define tab options
  const tabs = [
    { name: "Home", icon: "home" },
    { name: "MenuView", icon: "menu" },
    { name: "Profile", icon: "person" },
  ];

  return (
    <View className="flex-row gap-4">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: tab.name }], // This prevents back navigation
            });
          }}
          className={`flex flex-row items-center px-4 py-2 rounded-lg transition-all ${
            activeTab === tab.name ? "bg-accent text-body" : "bg-transparent"
          }`}
        >
          <MaterialIcons
            name={tab.icon}
            size={22}
            className={`mr-2 ${
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
        </TouchableOpacity>
      ))}
    </View>
  );
}
