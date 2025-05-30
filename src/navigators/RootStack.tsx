import React, { FC, useEffect, useState } from "react";
// react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Chase } from "react-native-animated-spinkit";
import { useAuth } from "../../context/auth";
import LoadingScreen from "../kitchensink-components/loading/LoadingScreen";
import { useDeviceInfo } from "../utils/component/useDeviceInfo";
import BottomBarTabs from "./BottomTabBar";
import OutsideStack from "./OutSideStack";
import { checkOnboarding } from "../utils/operation/checkOnboarding";
import SplashNavigation from "./SplashNavigation";

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
  const { user, hasOnboarded, loading } = useAuth();
  const { os } = useDeviceInfo();

  return (
    <NavigationContainer linking={linking}>
      {hasOnboarded ? (
        !loading ? (
          user ? (
            <BottomBarTabs />
          ) : (
            <OutsideStack />
          )
        ) : (
          <LoadingScreen
            LoadingComponent={os == "web" && <Chase size={40} />}
          />
        )
      ) : (
        <SplashNavigation />
      )}
      {/* <WebNavigation /> */}
      {/* <OutsideStack /> */}
      {/* todo make here anther component for web  */}
      {/* {os === "web" ? <WebNavigation /> : <BottomBarTabs />} */}
      {/* <BottomBarTabs /> */}
      {/* <HomestayPage /> */}
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
