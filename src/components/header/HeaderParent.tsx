import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { moderateScale, scale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { useAuth } from "../../../context/auth";
import AddressLocationCollapsible from "../../utils/component/AddressLocationCollapsible";
import RedCounter from "../../utils/component/RedCounter";
import { useDeviceInfo } from "../../utils/component/useDeviceInfo";
import Notification from "../notification/Notification";
import CategoryNavMobile from "./CategoryNavMobile.web";
import { TabsHeader } from "./Tabs.web";
export default function HeaderParent() {
  const navigation = useNavigation();
  const { os } = useDeviceInfo();
  const { userGust } = useAuth();
  const cart = useSelector((state) => state.cart.cart);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <View className="w-full">
      <View className="flex-row items-center justify-between py-2">
        {os === "web" && (
          <View className="block md:hidden">
            <TouchableOpacity
              onPress={() => setMobileNavOpen(true)}
              className="me-16 max-300:me-0 cursor-pointer"
            >
              <Feather name="menu" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
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
        {/* Web-only Navigation Tabs */}
        {os === "web" && (
          <View className="hidden md:block">
            <TabsHeader />
          </View>
        )}
        <View className="flex flex-row items-center !ms-4">
          {!userGust ? (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate("Cart")}
                className="p-2 rounded-lg bg-accent items-center justify-center me-2 relative"
              >
                <MaterialIcons
                  name="shopping-cart"
                  size={22}
                  className="!text-body"
                />
                {cart.length > 0 && <RedCounter count={cart.length} />}
              </TouchableOpacity>
              <Notification />
            </>
          ) : (
            <TouchableOpacity
              className="p-2 rounded-lg bg-accent items-center justify-center me-2 relative !text-body"
              onPress={() => navigation.navigate("SignIn")}
            >
              <Text>Login</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* Cart Icon */}
      </View>
      {os === "web" && mobileNavOpen && (
        <CategoryNavMobile setCatNavMobile={setMobileNavOpen} />
      )}
    </View>
  );
}
