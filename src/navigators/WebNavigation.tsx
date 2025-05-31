import { createStackNavigator } from "@react-navigation/stack";
import HeaderParent from "../components/header/HeaderParent";
import NotificationScreen from "../components/notification/NotificationScreen";
import CartPage from "../kitchensink-components/cart/CartPage";
import CheckoutScreen from "../kitchensink-components/cart/CheckoutScreen";
import { SetResponsiveContainer } from "../utils/component/SetResponsiveContainer";
import RenderItemsView from "../utils/component/renderItemsView";
// import MenuFilter from "../components/filters/MenuFilter";
import { Suspense, lazy } from "react";
import { Chase } from "react-native-animated-spinkit";
import DetailsScreen from "../components/menu-components/DetailsScreen";
import { ForgotPassword } from "../kitchensink-components/auth/forgot-password";
import { SignIn } from "../kitchensink-components/auth/signin";
import { SignUp } from "../kitchensink-components/auth/signup";
import LoadingScreen from "../kitchensink-components/loading/LoadingScreen";

const Stack = createStackNavigator();
const MenuFilter = lazy(() => import("../components/filters/MenuFilter"));
// const SignUp = lazy(() => import("../kitchensink-components/auth/signup"));
// Dummy data for dynamic stack generation
const dummyArr = [
  {
    dashboardItemID: "5359edc3-663c-4669-9432-0d57de60ee83",
    dashboardMenuItemName: "MenuItem1",
    routePath: "Home",
    projectProxyRoute: "HumMenu",
  },
  {
    dashboardItemID: "5359edc3-663c-4669-9432-0d57de60ee82",
    dashboardMenuItemName: "MenuItem",
    routePath: "MenuView",
    projectProxyRoute: "HumMenu",
  },
  {
    dashboardItemID: "5359edc3-663c-4669-9432-0d57de60ee83",
    dashboardMenuItemName: "MenuItem1",
    routePath: "test",
    projectProxyRoute: "HumMenu",
  },
  {
    dashboardItemID: "5359edc3-663c-4669-9432-0d57de60ee84",
    dashboardMenuItemName: "MenuItem42",
    routePath: "Profile",
    projectProxyRoute: "HumMenu",
  },
];

// Function to create stack navigators dynamically
const MargeStackWithTabs = (item) => {
  function RenderComponent() {
    return (
      <RenderItemsView
        dashboardItemId={item.dashboardItemID}
        routePath={item.routePath}
      />
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Main Dynamic Screen */}
      <Stack.Screen
        name={item.routePath}
        component={RenderComponent}
        options={
          item.routePath !== "Profile"
            ? {
                headerShown: true,
                headerTitle: () =>
                  SetResponsiveContainer(<HeaderParent />, false), // Show HeaderParent only for non-Profile screens
              }
            : {}
        }
      />

      {/* Static Screens */}
      <Stack.Screen
        name="Cart"
        component={() => SetResponsiveContainer(<CartPage />, true)}
      />
      <Stack.Screen
        name="MenuFilter"
        component={() => SetResponsiveContainer(<MenuFilter />, true)}
      />
      <Stack.Screen name="DetailsProductScreen" component={DetailsScreen} />

      <Stack.Screen
        name="CheckoutScreen"
        component={() => SetResponsiveContainer(<CheckoutScreen />, true)}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={() => SetResponsiveContainer(<NotificationScreen />, true)}
      />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgetPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

const WebNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      screenLayout={({ children }) => (
        <Suspense
          fallback={<LoadingScreen LoadingComponent={<Chase size={40} />} />}
        >
          {children}
        </Suspense>
      )}
    >
      {/* Generate screens dynamically from dummyArr */}
      {dummyArr.map((item) => (
        <Stack.Screen
          key={item.dashboardItemID}
          name={item.routePath}
          component={() => MargeStackWithTabs(item)}
        />
      ))}
    </Stack.Navigator>
  );
};

export default WebNavigator;
