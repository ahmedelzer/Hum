import React, { FC, useState } from "react";
// react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomBarTabs from "./BottomTabBar";
import OutsideStack from "./OutSideStack";
import { retrieveSecureValue } from "../store/zustandStore";
import { useAuth } from "../../context/auth";

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
  const { user, loading } = useAuth();
  return (
    !loading && (
      <NavigationContainer>
        {user && <BottomBarTabs />}
        {!user && <OutsideStack />}
        {/* <BottomBarTabs /> */}
        {/* <BottomBarTabs /> */}
      </NavigationContainer>
    )
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
