import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "../../../components/ui";
import { ShoppingCartIcon } from "lucide-react-native";
import { moderateScale, scale } from "react-native-size-matters";
import Notification from "../notification/Notification";

export default function HeaderParent() {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center w-full justify-between bg-body border-b border-b-card py-2">
      {/* Logo and App Name in Column */}
      <View className="flex flex-row items-center">
        <Image
          source={require("../../../assets/display/logo.jpeg")} // Replace with your logo path
          style={{
            width: scale(60), // Responsive logo width
            height: moderateScale(40), // Responsive logo height
            resizeMode: "cover",
          }}
        />
        {/* <Text className="text-lg font-bold text-text mx-2">Hum App</Text> */}
      </View>
      <View className="flex flex-row items-center mx-4">
        <TouchableOpacity
          onPress={() => navigation.navigate("Cart")}
          className="p-2 rounded-lg bg-accent items-center justify-center mx-2"
        >
          <Icon as={ShoppingCartIcon} size={"md"} className="text-body" />
        </TouchableOpacity>
        <Notification />
      </View>
      {/* Cart Icon */}
    </View>
  );
}
