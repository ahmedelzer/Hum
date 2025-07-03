import React, { useEffect, useReducer, useState } from "react";
import reducer from "../../components/Pagination/reducer";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import { SetReoute } from "../../../request";
import ScratchVoucherCard from "../../Schemas/MenuSchema/ScratchVoucherCard.json";
import ScratchVoucherCardActions from "../../Schemas/MenuSchema/ScratchVoucherCardActions.json";
import { prepareLoad } from "../../utils/operation/loadHelpers";
import { createRowCache } from "../../components/Pagination/createRowCache";
import { initialState } from "../../components/Pagination/initialState";
import { Button, ScrollView, Text, View } from "react-native";
import { getRemoteRows } from "../../components/Pagination/getRemoteRows";
import { useSelector } from "react-redux";
const VIRTUAL_PAGE_SIZE = 4;
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
    // Call LoadData with the controller
  }, [currentPage]);
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  if (!rows.length) return <Text>{voucherLocale.notFound}</Text>;

  return (
    <View>
      <View className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rows.map((card) => (
          <View
            className="bg-body shadow-md rounded-xl p-4 border hover:shadow-lg transition"
            key={card.voucherCardUsageID}
          >
            <Text className="text-lg font-medium !text-accent truncate">
              {card.voucherCardCode}
            </Text>
            <Text className="text-sm text-primary-custom mt-1">
              {voucherLocale.usedOn} {card.usedAt}
            </Text>
          </View>
        ))}
      </View>

      {/* Pagination Controls */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 10,
          gap: 10,
        }}
      >
        <Button
          title={voucherLocale.more}
          onPress={handleNext}
          disabled={currentPage === totalPages}
        />
      </View>
    </View>
  );
};

export default VoucherCardList;
