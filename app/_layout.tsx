import { View, Text } from "react-native";
import React from "react";
import { Tabs, Stack } from "expo-router";
import HeaderParent from "../src/components/header/HeaderParent";

const TabsLayout = () => {
  const dummyArr = [
    {
      dashboardItemID: "5359edc3-663c-4669-9432-0d57de60ee83",
      dashboardMenuItemName: "MenuItem1",
      routePath: "Home",
      projectProxyRoute: "HumMenu",
    },
    {
      dashboardItemID: "5359edc3-663c-4669-9432-0d57de60ee83",
      dashboardMenuItemName: "MenuItem1",
      routePath: "index",
      projectProxyRoute: "HumMenu",
    },
    // Add more items if necessary
  ];

  return (
    <Tabs>
      {dummyArr.map((item) => (
        <Tabs.Screen
          key={item.dashboardMenuItemName}
          name={item.routePath}
          //   options={getTabOptions(item)}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
