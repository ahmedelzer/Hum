import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FC } from "react";
import HomeStack from "./HomeStack";
import { RootStackParamList } from "./RootStack";
import HomestayPage from "../kitchensink-components/HomestayPage";
import MenuView from "../components/menu-components/MenuView";
import MobileProfilePage from "../kitchensink-components/MobileProfilePage";
import { Icon } from "@/components/ui";
import { Home, Mail, Menu, User } from "lucide-react-native";
import { useGetDashboardForm } from "../services/react-query-hooks/GetDashboardForm";
import RenderItemsView from "../utils/renderItemsView";

const Tab = createBottomTabNavigator<RootStackParamList>();
const BottomBarTabs: FC = () => {
  const dummyArr = [
    {
      dashboardItemID: "5359edc3-663c-4669-9432-0d57de60ee81",
      dashboardMenuItemName: "MenuItem",
      routePath: "dynamicMenuItemsView",
      projectProxyRoute: "HumMenu",
    },
    {
      dashboardItemID: "5359edc3-663c-4669-9432-0d57de60ee83",
      dashboardMenuItemName: "MenuItem1",
      routePath: "Home",
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
      dashboardMenuItemName: "MenuIte42",
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

  return (
    <Tab.Navigator>
      {dummyArr.map((item: any) => (
        <Tab.Screen
          key={item.dashboardMenuItemName}
          name={item.routePath}
          options={{ headerShown: false, tabBarIcon: homeIcon }}>
          {() => (
            <RenderItemsView
              dashboardItemId={item.dashboardItemID}
              routePath={item.routePath}
            />
          )}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
    // <Tab.Navigator>
    //   {dummyArr.map((item: any) => (
    //     <Tab.Screen
    //       key={item.dashboardItemID}
    //       name={item.routePath}
    //       component={() => (
    //         <RenderItemsView
    //           dashboardItemId={item.dashboardItemID}
    //           routePath={item.routePath}
    //         />
    //       )}
    //       options={{ headerShown: false, tabBarIcon: homeIcon }}
    //     />
    //   ))}

    //   {/* <Tab.Screen
    //     name="Messages"
    //     component={HomeStack}
    //     options={{ headerShown: false, tabBarIcon: messageIcon }}
    //   />
    //   <Tab.Screen
    //     name="MenuView"
    //     component={MenuView}
    //     options={{ headerShown: false, tabBarIcon: menuIcon }}
    //   />
    //   <Tab.Screen
    //     options={{ headerShown: false, tabBarIcon: accountIcon }}
    //     name="Profile"
    //     component={MobileProfilePage}
    //   /> */}
    // </Tab.Navigator>
  );
};
export default BottomBarTabs;

// useEffect(() => {
//   const backAction = () => {
//     navigation.goBack();
//     return true; // Returning true prevents the default back action (exiting the app)
//   };

//   const backHandler = BackHandler.addEventListener(
//     "hardwareBackPress",
//     backAction
//   );

//   return () => backHandler.remove();
// }, [navigation]);
