import React, { FC, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./HomeStack";
import MessengerStack from "./MessengerStack";
import NetworkStack from "./NetworkStack";
import ProfileStack from "./ProfileStack";
import { useTranslation } from "react-i18next";
import { Icon, useTheme } from "react-native-paper";
import { storage } from "../utils/storage";
import { useQueryClient } from "@tanstack/react-query";
import MenuDropdown from "../components/MenuDropdown/MenuDropdown";
import Notifications from "../components/Notifications/Notifications";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import {
  getFocusedRouteNameFromRoute,
  Route,
  RouteProp,
} from "@react-navigation/native";
import { RootStackParamList } from "./RootStack";
import CustomDrawerContent from "../components/DrawerContent/DrawerContent";
import {
  unSeenMessagesStore,
  useGetRouteName,
  useMessageSentBolean,
} from "../store/zustandStore";
import { useSelectedLanguage } from "../hooks/useSetLanguage";

const Drawer = createDrawerNavigator();

const DrawerNavigator: FC = ({
  navigation,
  globalNotifications,
  privateNotifications,
  notification,
  unSeenMessageNotifications,
  sendMessage,
  bottomNotifications,
  ...props
}: any) => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 1024;
  const isLapTop = width >= 1024 && width <= 1267;
  const { language } = useSelectedLanguage();
  const { routeName } = useGetRouteName();
  const { t } = useTranslation();
  const theme = useTheme<any>();
  const subdomain = storage.getString("subdomain");
  const queryClient = useQueryClient();

  const { unSeenMessages, setUnSeenMessages } = unSeenMessagesStore();
  const { messageSentBolean, setMessageSentBolean } = useMessageSentBolean();

  const getTabBarVisibility = (
    route: RouteProp<RootStackParamList, any> | Partial<Route<string>>
  ) => {
    const routeName = getFocusedRouteNameFromRoute(route);

    const hideOnScreens = [
      "RoomsScreen",
      "Speakers",
      "FloorPlan",
      "Agenda",
      "Poll",
      "QAPollTabs",
      "QA",
      "Exhibitors",
      "SignIn",
      "EditPersonalProfile",
      "UserProfileScreen",
      "ResetPassword",
      "UserCalendarView",
      "CalendarTabs",
      "ChatScreen",
      "OtherUserProfile",
      "MeetingScreen",
      "QrScreen",
      "SearchScreen",
    ];
    return hideOnScreens.indexOf(routeName as string) <= -1 ? "flex" : "none";
  };

  useEffect(() => {
    if (
      privateNotifications?.filter((item: any) => item.seen === null).length !=
      0
    ) {
      queryClient.invalidateQueries({ queryKey: ["USER_MEETINGS"] });
      queryClient.invalidateQueries({ queryKey: ["MEETING_CALENDAR"] });
    }
  }, [privateNotifications?.filter((item: any) => item.seen === null).length]);

  useEffect(() => {
    unSeenMessageNotifications > 0 && setUnSeenMessages(false);
  }, [unSeenMessageNotifications]);

  const homeIcon = ({ color }: { focused: boolean; color: string }) => (
    <Icon source="home-outline" size={33} color={color} />
  );
  const accountIcon = ({ color }: { focused: boolean; color: string }) => (
    <Icon source="account-outline" size={33} color={color} />
  );
  const MessagesIcon = ({ color }: { focused: boolean; color: string }) => (
    <Icon source="message-processing-outline" size={33} color={color} />
  );
  const NetworkIocn = ({ color }: { focused: boolean; color: string }) => (
    <Icon source="account-multiple-outline" size={33} color={color} />
  );

  const LabelWithBadge = ({ label, badgeCount, isFocused, isColor }: any) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          transform: language === "ar" ? [{ scaleX: -1 }] : [],
        }}>
        <Text
          style={{
            color: isColor,
            fontSize: 16,
            fontFamily: "Poppins-Regular",
            fontWeight: "400",
          }}>
          {label}
        </Text>
        {badgeCount > 0 && (
          <View
            style={{
              marginLeft: 5,
              // backgroundColor: "red",
              borderRadius: 8,
              width: 16,
              height: 16,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text
              style={{
                color: "white",
                fontSize: 10,
              }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName={"Home"}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route, navigation }) => ({
        drawerLabelStyle: {
          fontSize: 16,
          fontFamily: "Poppins-Regular",
          fontWeight: "400",
          transform: language === "ar" ? [{ scaleX: -1 }] : [],
        },
        // DRAWER STYLE

        drawerType: isLargeScreen ? "permanent" : "front",
        drawerStyle: {
          width: isLapTop ? 150 : "auto",
          // marginHorizontal: 24,
          borderColor: "transparent",
          borderRightColor: "#F2F2F2", // Add this line
          borderLeftColor: "#F2F2F2", // Add this line
          backgroundColor: "#fff",
        },
        // el tabs nfsaha
        drawerItemStyle: {
          marginHorizontal: 50,
          rowGap: 20,
        },

        // HEADER STYLE
        headerTitle: () => null,
        headerShown: getTabBarVisibility(route) === "flex",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#f2f2f2",
        },
        headerTitleAlign: "center",
        headerTintColor: "#2D343F",
        headerTitleStyle: {
          fontSize: 16,
          fontFamily: "Poppins-Regular",
          fontWeight: "600",
        },

        headerRightContainerStyle: {
          marginRight: 8,
        },
        headerLeftContainerStyle: {
          marginLeft: 8,
        },
        headerLeft: MenuDropdown,
        headerRight: () => (
          <Notifications
            //@ts-ignore
            notification={notification}
            sendMessage={sendMessage}
            globalNotifications={globalNotifications}
            privateNotifications={privateNotifications}
          />
        ),
      })}>
      <Drawer.Screen
        name={t("home") as any}
        component={HomeStack}
        options={{
          unmountOnBlur: true,
          drawerIcon: homeIcon,
          drawerLabel: t("home"),
        }}
      />
      <Drawer.Screen
        name={t("messages") as any}
        component={MessengerStack}
        options={{
          drawerLabel: ({ focused, color }) => (
            <LabelWithBadge
              isColor={color}
              isFocused={focused}
              label={t("messages")}
              badgeCount={
                (unSeenMessageNotifications > 0 && !unSeenMessages) ||
                messageSentBolean
                  ? 1
                  : 0
              } // Replace 5 with your dynamic badge count
            />
          ),

          drawerIcon: MessagesIcon,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name={t("network") as any}
        component={NetworkStack}
        options={{
          unmountOnBlur: true,
          drawerIcon: NetworkIocn,
          drawerLabel: t("network"),
        }}
      />

      <Drawer.Screen
        name={t("profile") as any}
        component={ProfileStack}
        options={{
          unmountOnBlur: true,
          drawerLabel: ({ color, focused }) => (
            <LabelWithBadge
              isColor={color}
              isFocused={focused}
              label={t("profile")}
              badgeCount={
                privateNotifications?.filter(
                  (item: any) =>
                    item.seen === null && !item?.message.includes("accepted")
                )
                  ? privateNotifications?.filter(
                      (item: any) =>
                        item.seen === null &&
                        !item?.message.includes("accepted")
                    ).length
                  : null
              }
            />
          ),
          drawerIcon: accountIcon,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
