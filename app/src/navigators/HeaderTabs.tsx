import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RootStackParamList } from "./RootStack";
import { StackScreenProps } from "@react-navigation/stack";
import ChatMessagesScreen from "../components/ChatComponent/ChatMessagesScreen";
import ChatRequestMessagesTabs from "../components/ChatComponent/ChatRequestMessagesTabs";
import { useTranslation } from "react-i18next";
import { Icon, IconButton, Searchbar, useTheme } from "react-native-paper";
import { useSelectedLanguage } from "../hooks/useSetLanguage";
import { useMessageSentBolean, useShowBadgeStore } from "../store/zustandStore";
import useNotifications from "../hooks/useNotifications";

const Tab = createMaterialTopTabNavigator();
type Props = StackScreenProps<RootStackParamList, "QrScreen" | "HeaderTabs">;

function HeaderTabs(props: any): JSX.Element {
  const { language } = useSelectedLanguage();
  const [chatSearch, setChatSearch] = useState("");
  const theme = useTheme();
  const { t } = useTranslation();
  const { messageSentBolean, setMessageSentBolean } = useMessageSentBolean();
  const { showBadge, setShowBadge } = useShowBadgeStore();

  const renderSearchForQr = () => {
    return (
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          columnGap: 8,
          marginTop: -4,
        }}>
        <Searchbar
          value={chatSearch}
          autoCorrect={false}
          clearButtonMode="always"
          autoCapitalize="none"
          onChangeText={(e) => console.log(e)}
          placeholder={t("searchForUser")}
          placeholderTextColor={"#505050"}
          style={{
            flex: 1,
            height: 40,
            justifyContent: "center",
            backgroundColor: "#fff",
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
          }}
          inputStyle={{
            textAlign: language === "ar" ? "right" : "left",
            fontSize: 14,
            alignSelf: "center",
            fontFamily: "Poppins-Regular",
            color: "#505050",
          }}
        />
        <IconButton
          icon="qrcode-scan"
          mode="outlined"
          style={{
            borderRadius: 10,
            borderColor: theme.colors.primary,
          }}
          iconColor={theme.colors.primary}
          size={22}
          onPress={() => {
            props.navigation.navigate("QrScreen");
          }}
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <SafeAreaView
        style={{
          flex: 1,
          marginHorizontal: 16,
          backgroundColor: "#f2f2f2",
        }}>
        {renderSearchForQr()}
        <Tab.Navigator
          initialRouteName="ChatMessages"
          style={{
            direction: "ltr",
            marginTop: -8,
          }}
          backBehavior="firstRoute"
          screenOptions={{
            swipeEnabled: true,
            animationEnabled: true,
            //   tabBarScrollEnabled: true,
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: "#A3ADBC",
            tabBarStyle: {
              backgroundColor: "transparent",
              overflow: "hidden",
              marginVertical: 8,
            },
            tabBarLabelStyle: {
              alignSelf: "center",
              lineHeight: 24,
              fontFamily: "Poppins-Regular",
              fontWeight: "500",
              fontSize: 16,
            },
            tabBarItemStyle: { flexDirection: "row" },
            tabBarIndicatorStyle: {
              backgroundColor: theme.colors.primary,
            },
          }}>
          <>
            <Tab.Screen
              name="ChatMessages"
              component={ChatMessagesScreen}
              options={{
                tabBarIconStyle: {
                  top: 4,
                },
                tabBarLabel: ({ focused, color }) => {
                  return (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text
                        style={{
                          color,
                          fontFamily: "Poppins-Regular",
                          fontSize: 16,
                          fontWeight: "500",
                        }}>
                        {t("chats")}
                      </Text>
                      {showBadge ? (
                        <View
                          style={{
                            marginLeft: 4,
                            // backgroundColor: "red",
                            borderRadius: 9, // Half of height and width to make it circular
                            height: 16,
                            width: 16,
                            justifyContent: "center",
                            alignItems: "center",
                          }}>
                          <Text style={{ color: "#fff", fontSize: 8 }}>
                            {showBadge ? 1 : null}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  );
                },
                tabBarLabelStyle: {
                  fontFamily: "Poppins-Regular",
                  fontWeight: "500",
                  textTransform: "none",
                },
                tabBarIcon: ({ color }) => (
                  <Icon
                    source="message-processing-outline"
                    size={20}
                    color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="ChatRequestMessages"
              component={ChatRequestMessagesTabs}
              options={{
                tabBarIconStyle: {
                  top: 4,
                },
                tabBarLabel: ({ focused, color }) => {
                  const badgeCount = messageSentBolean ? 1 : null;
                  return (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text
                        style={{
                          color,
                          fontFamily: "Poppins-Regular",
                          fontSize: 16,
                          fontWeight: "500",
                        }}>
                        {t("requests")}
                      </Text>
                      {badgeCount && (
                        <View
                          style={{
                            marginLeft: 4,
                            backgroundColor: "red",
                            borderRadius: 9, // Half of height and width to make it circular
                            height: 16,
                            width: 16,
                            justifyContent: "center",
                            alignItems: "center",
                          }}>
                          <Text style={{ color: "#fff", fontSize: 8 }}>
                            {badgeCount}
                          </Text>
                        </View>
                      )}
                    </View>
                  );
                },

                tabBarLabelStyle: {
                  fontFamily: "Poppins-Regular",
                  fontWeight: "500",
                  textTransform: "none",
                },
                tabBarIcon: ({ color }) => (
                  <Icon source="message-outline" size={20} color={color} />
                ),
              }}
            />
          </>
        </Tab.Navigator>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
export default HeaderTabs;
