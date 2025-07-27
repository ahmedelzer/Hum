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
// import Toast from "react-native-toast-message";
import * as Linking from "expo-linking";
import { Toast } from "../../components/ui";
import { CartProvider } from "../../context/CartProvider";
import { MenuProvider } from "../../context/MenuProvider";
import { ToastProvider } from "@gluestack-ui/toast";
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
  prefixes: [Linking.createURL("/"), "https://your-app.web.app"],
  config: {
    screens: {
      Home: "",
      Profile: "profile", // ensure `userId` is passed
      Cart: "cart",
      MenuView: "menu",
      SignIn: "signin",
      SignUp: "signup",
      Orders: "orders",
      ForgetPassword: "forget-password",
      NotificationScreen: "notifications",
      CheckoutScreen: "checkout",
      DetailsProductScreen: "product/:id", // if using dynamic products
    },
  },
};

const Stack = createStackNavigator<RootStackParamList>();
const RootStack: FC = (props: any) => {
  return (
    <NavigationContainer linking={linking}>
      <ToastProvider>
        {RequiredScreens()}
        {/* <Toast /> */}
        {/* <Toast /> */}
      </ToastProvider>
      {/* <Toa */}
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
      return (
        <CartProvider>
          <MenuProvider>
            <WebNavigator />
          </MenuProvider>
        </CartProvider>
      );
  }
};
export default RootStack;
