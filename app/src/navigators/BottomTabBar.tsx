import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartPage from "../kitchensink-components/cart/CartPage";
import HomeScreen from "../kitchensink-components/cart/h";
import { RootStackParamList } from "./RootStack";
import { Icon } from "@/components/ui";
import { Home, Mail, Menu, User } from "lucide-react-native";
import RenderItemsView from "../utils/renderItemsView";
import Header from "../components/header/Header";
import HeaderParent from "../components/header/HeaderParent";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator<RootStackParamList>();

// Define the TestStack with HomeScreen and CartPage
const TestStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="Cart" component={CartPage} />
  </Stack.Navigator>
);

const BottomBarTabs: FC = () => {
  const dummyArr = [
    {
      dashboardItemID: "5359edc3-663c-4669-9432-0d57de60ee83",
      dashboardMenuItemName: "MenuItem1",
      routePath: "Home",
      projectProxyRoute: "HumMenu",
    },
    {
      dashboardItemID: "5359edc3-663c-4669-9432-0d57de60ee81",
      dashboardMenuItemName: "MenuItem",
      routePath: "dynamicMenuItemsView",
      projectProxyRoute: "HumMenu",
    },
    {
      dashboardItemID: "5359edc3-663c-4669-9432-0d57de60ee83",
      dashboardMenuItemName: "MenuItem1",
      routePath: "test", // Using the test route for nested navigators
      projectProxyRoute: "HumMenu",
    },
    {
      dashboardItemID: "5359edc3-663c-4669-9432-0d57de60ee82",
      dashboardMenuItemName: "MenuItem2",
      routePath: "MenuView",
      projectProxyRoute: "HumMenu",
    },
    {
      dashboardItemID: "5359edc3-663c-4669-9432-0d57de60ee84",
      dashboardMenuItemName: "MenuItem42",
      routePath: "Profile",
      projectProxyRoute: "HumMenu",
    },
  ];

  const homeIcon = ({ color }: { focused: boolean; color: string }) => (
    <Icon as={Home} size="lg" color={color} />
  );
  const accountIcon = ({ color }: { focused: boolean; color: string }) => (
    <Icon as={User} size="lg" color={color} />
  );
  const messageIcon = ({ color }: { focused: boolean; color: string }) => (
    <Icon as={Mail} size="lg" color={color} />
  );
  const menuIcon = ({ color }: { focused: boolean; color: string }) => (
    <Icon as={Menu} size="lg" color={color} />
  );
  const MargeStackWithTabs = (item) => {
    const RenderComponent = () => (
      <RenderItemsView
        dashboardItemId={item.dashboardItemID}
        routePath={item.routePath}
      />
    );

    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Rendered Item View Screen */}
        <Stack.Screen name={item.routePath} component={RenderComponent} />

        {/* Cart Screen */}
        <Stack.Screen name="Cart" component={CartPage} />
      </Stack.Navigator>
    );
  };
  const SetOptions = (item) => {
    switch (item.routePath) {
      case "Home":
      case "dynamicMenuItemsView":
        return {
          headerShown: true,
          tabBarIcon: homeIcon,
          headerTitle: () => <HeaderParent />,
        };
      case "Profile":
        return {
          headerShown: false,
          tabBarIcon: homeIcon,
        };
      default:
        return {
          headerShown: false,
          tabBarIcon: homeIcon,
        };
    }
  };
  return (
    <Tab.Navigator>
      {dummyArr.map((item: any) => (
        <Tab.Screen
          key={item.dashboardMenuItemName}
          name={item.routePath}
          options={SetOptions(item)}
        >
          {() => {
            // if (item.routePath === "test") {
            //   return <TestStack />;
            // }
            return MargeStackWithTabs(item);
          }}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};

export default BottomBarTabs;
