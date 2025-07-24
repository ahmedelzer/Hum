import React, { useEffect, useReducer, useState } from "react";
import { Button, ScrollView, Text, View, StyleSheet, Dimensions } from "react-native";
import reducer from "../../components/Pagination/reducer";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import { SetReoute } from "../../../request";
import ScratchVoucherCard from "../../Schemas/MenuSchema/ScratchVoucherCard.json";
import ScratchVoucherCardActions from "../../Schemas/MenuSchema/ScratchVoucherCardActions.json";
import { prepareLoad } from "../../utils/operation/loadHelpers";
import { createRowCache } from "../../components/Pagination/createRowCache";
import { initialState } from "../../components/Pagination/initialState";
import { useSelector } from "react-redux";
import { ImageBackground } from "../../../components/ui";
import VoucherCard from "./VoucherCard";

const VIRTUAL_PAGE_SIZE = 2;

const VoucherCardList = () => {
  const [state, reducerDispatch] = useReducer(
    reducer,
    initialState(VIRTUAL_PAGE_SIZE, ScratchVoucherCard.idField)
  );
  const localization = useSelector((state) => state.localization.localization);
  const voucherLocale = localization.Hum_screens.profile.collapses.find(
    (collapse) => collapse.type === "vouchers"
  ).childrenText;

  const [currentSkip, setCurrentSkip] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  
  const dataSourceAPI = (query, skip, take) => {
    SetReoute(ScratchVoucherCard.projectProxyRoute);
    return buildApiUrl(query, {
      pageIndex: skip + currentPage,
      pageSize: take,
    });
  };

  const cache = createRowCache(VIRTUAL_PAGE_SIZE);
  const getAction =
    ScratchVoucherCardActions &&
    ScratchVoucherCardActions.find(
      (action) => action.dashboardFormActionMethodType === "Get"
    );

  const { rows, skip, totalCount, loading } = state;
  const totalPages = Math.ceil(totalCount / (VIRTUAL_PAGE_SIZE * 2));

  useEffect(() => {
    prepareLoad({
      state,
      dataSourceAPI,
      getAction,
      cache,
      reducerDispatch,
    });
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (!rows.length) return <Text>{voucherLocale.notFound}</Text>;

  // Get screen width for responsive layout
  const screenWidth = Dimensions.get('window').width;
  
  // Determine number of columns based on screen width
  const getColumns = () => {
    if (screenWidth < 1460) return 1;   // Mobile (equivalent to sm:)
    return 2;  // Tablet (equivalent to lg:)
                         // Desktop
  };

  const numColumns = getColumns();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.gridContainer, { 
          flexDirection: 'row',
          flexWrap: 'wrap',
        }]}>
          {rows.map((card, index) => (
            <View key={index} style={{
              width: `${100/numColumns}%`,
              padding: 8, // Equivalent to gap-4 (16px total)
            }}>
              <VoucherCard item={card} />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Pagination Controls */}
      <View style={styles.paginationContainer}>
        <Button
          title={voucherLocale.more}
          onPress={handleNext}
          disabled={currentPage === totalPages}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  gridContainer: {
    width: '100%',
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    gap: 10,
  },
});

export default VoucherCardList;