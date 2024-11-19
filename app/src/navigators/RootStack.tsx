import React, { FC, useState } from "react";
// react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomBarTabs from "./BottomTabBar";
import OutsideStack from "./OutSideStack";
import useToken from "../store/zustandStore";

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

const Stack = createStackNavigator<RootStackParamList>();
const RootStack: FC = (props: any) => {
  const { token, setToken } = useToken();
  return (
    <NavigationContainer>
      {token && <BottomBarTabs />}
      {!token && <OutsideStack />}
      {/* <BottomBarTabs /> */}
      {/* <BottomBarTabs /> */}
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
