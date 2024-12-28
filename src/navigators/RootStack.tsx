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

const Stack = createStackNavigator<RootStackParamList>();
const RootStack: FC = (props: any) => {
  const { user, loading } = useAuth();
  return (
    <NavigationContainer>
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
