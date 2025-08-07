import React, { FC } from "react";
import { Platform, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer"; // Import drawer
import BottomBarTabs from "./BottomTabBar";
import OutsideStack from "./OutSideStack";
import { useAuth } from "../../context/auth";
import LoadingScreen from "../kitchensink-components/loading/LoadingScreen";
import HomestayPage from "../kitchensink-components/HomestayPage";
import Profile from "./ProfileStack";
import MenuView from "../components/menu-components/MenuView";
const linking = {
  prefixes: ["http://localhost:19006", "https://your-app.web.app"],
  config: {
    screens: {
      Home: "",
      Profile: "profile/:userId",
      Settings: "settings",
    },
  },
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator(); // Drawer Navigator

const DrawerNavigator: FC = () => {
  return (
    <Drawer.Navigator
      id={undefined}
      drawerContent={(props) => <CustomDrawerContent {...props} />} // Custom drawer UI
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen name="Home" component={HomestayPage} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Menu" component={MenuView} />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Welcome!</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default DrawerNavigator;
