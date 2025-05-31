import React, { FC } from "react";
// react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Chase } from "react-native-animated-spinkit";
import { useAuth } from "../../context/auth";
import LoadingScreen from "../kitchensink-components/loading/LoadingScreen";
import { useDeviceInfo } from "../utils/component/useDeviceInfo";
import BottomBarTabs from "./BottomTabBar";
import OutsideStack from "./OutSideStack";
import SplashNavigation from "./SplashNavigation";
import WebNavigator from "./WebNavigation";

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
      {RequiredScreens()}
      {/* <WebNavigation /> */}
      {/* <OutsideStack /> */}
      {/* todo make here anther component for web  */}
      {/* {os === "web" ? <WebNavigation /> : <BottomBarTabs />} */}
      {/* <BottomBarTabs /> */}
      {/* <HomestayPage /> */}
    </NavigationContainer>
  );
};
const RequiredScreens = () => {
  const { user, hasOnboarded, loading } = useAuth();
  const { os } = useDeviceInfo();
  if (loading) {
    return (
      <LoadingScreen LoadingComponent={os == "web" && <Chase size={40} />} />
    );
  }
  const mobileScreens = () => {
    if (!hasOnboarded) {
      return <SplashNavigation />;
    } else if (user) {
      return <BottomBarTabs />;
    } else {
      return <OutsideStack />;
    }
  };
  switch (os) {
    case "android":
    case "ios":
    case "windows":
    case "macos":
      return mobileScreens();
    case "web":
      return <WebNavigator />;
  }
};
export default RootStack;
