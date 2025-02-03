import React, { FC, useState } from "react";
// react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomBarTabs from "./BottomTabBar";
import OutsideStack from "./OutSideStack";
import { retrieveSecureValue } from "../store/zustandStore";
import { useAuth } from "../../context/auth";
import LoadingScreen from "../kitchensink-components/loading/LoadingScreen";
import StackNavigator from "./StackNavigator";
import HeaderParent from "../components/header/HeaderParent";
import RenderItemsView from "../utils/renderItemsView";
import { FontAwesome } from "@expo/vector-icons";
import { SquareArrowUpRight } from "lucide-react-native";

// types
export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Rooms: undefined;
  GatesView: undefined;
  LiveGateView: undefined;
  LiveGateStack: undefined;
  LiveChatView: undefined;
  MenuView: undefined;
  UserProfile: undefined;
  Messages: undefined;
  RoomsView: undefined;
};
``;
//todo: make with pixel rexio padding or margin top with  platforms
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

const Stack = createStackNavigator<RootStackParamList>();
const RootStack: FC = (props: any) => {
  const { user, loading } = useAuth();
  return (
    <NavigationContainer linking={linking}>
      {/* {!loading ? (
        user ? (
          <BottomBarTabs />
        ) : (
          <OutsideStack />
        )
      ) : (
        <LoadingScreen />
      )} */}
      {/* <OutsideStack /> */}
      <BottomBarTabs />
      {/* <HeaderParent /> */}
      {/* <RenderItemsView
        dashboardItemId={"dynamicMenuItemsView"}
        routePath={"Home"}
      /> */}
      {/* <FontAwesome name="group" size={24} color={"black"} /> */}
      {/* //that works in web */}
      {/* <SquareArrowUpRight
        size={16}
        color="black"
        style={{
          position: "absolute",
          bottom: 4,
          left: 4,
        }}
      /> */}
      {/* //thats not works in web */}
      {/* <StackNavigator /> */}
    </NavigationContainer>
  );
};

export default RootStack;

// function NoDataUrls() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="ChooseEvents" component={NoDataUrl} />
//     </Stack.Navigator>
//   );
// }
// function ErrorStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Error" component={Error} />
//     </Stack.Navigator>
//   );
// }

// {subDomain !== undefined ? (
//   !user.access_token ? (
//     <OutsideStack />
//   ) : (
//     <BottomBarTabs />
//   )
// ) : (
//   <ErrorStack />
// )}
