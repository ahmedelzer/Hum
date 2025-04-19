import React, { useState, useCallback } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { Box, HStack } from "../../../components/ui";
import SearchBarFilter from "../filters/SearchBarFilter";
import Searchbar from "../search-bar/Searchbar";
import AddLocation from "./AddLocation";
import MenuCardsView from "./MenuCardsView";
import { useDeviceInfo } from "../../utils/useDeviceInfo";
import { HomestayInfoTabs } from "./HomestayInfoTabs";

const MenuView = ({ schemas }: any) => {
  const [row, setRow] = useState({});
  const { width, height, os, modelName } = useDeviceInfo();

  const [refreshing, setRefreshing] = useState(false);
  const [key, setKey] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setKey((r) => r + 1);
    // Do your refresh logic here, e.g., reset row or re-fetch data
    setRow({}); // Optional: reset filters
    // Simulate API delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const searchBarSchema = schemas?.find(
    (schema: any) => schema.schemaType === "searchBar"
  );
  const searchBarFilter = schemas?.find(
    (schema: any) => schema.schemaType === "filters"
  );
  const menuCardItem = schemas?.find(
    (schema: any) => schema.schemaType === "menuItemCards"
  );
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HStack space="2xl" className="items-center md:my-2">
        <View style={{ flex: 1 }}>
          <Searchbar schema={searchBarSchema} setRow={setRow} row={row} />
        </View>
        {/* Optional filters */}
        {/* <View style={{ flex: 0 }}>
          <SearchBarFilter schema={searchBarFilter} setRow={setRow} row={row} />
        </View> */}
      </HStack>

      <Box
        className="md:px-0 -mt-4"
        style={{ paddingBottom: os === "web" ? 0 : 180 }}
        key={key}
      >
        <View className="my-5">
          <HomestayInfoTabs setRow={setRow} row={row} />
        </View>
        <MenuCardsView menuCardItem={menuCardItem} row={row} setRow={setRow} />
      </Box>
    </ScrollView>
  );
};

export default MenuView;
