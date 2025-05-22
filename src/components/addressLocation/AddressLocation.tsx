import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useReducer, useState } from "react";
import AddLocation from "./AddLocation";
import AddressLocationAction from "../../Schemas/AddressLocation/AddressLocationAction.json";
import AddressLocationSchema from "../../Schemas/AddressLocation/AddressLocation.json";
import { LocalizationContext } from "../../../context/LocalizationContext";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import reducer from "../Pagination/reducer";
import { initialState } from "../Pagination/initialState";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import { SetReoute } from "../../../request";
import { createRowCache } from "../Pagination/createRowCache";
import LoadData from "../../../components/hooks/APIsFunctions/LoadData";
import { updateRows } from "../Pagination/updateRows";
import { getRemoteRows } from "../Pagination/getRemoteRows";
import { VStack } from "../../../components/ui";
import LoadingScreen from "../../kitchensink-components/loading/LoadingScreen";
import { Chase } from "react-native-animated-spinkit";
import Pickup from "./selectedNode";
const VIRTUAL_PAGE_SIZE = 4;
export default function AddressLocation() {
  const { localization } = useContext(LocalizationContext);
  const [state, reducerDispatch] = useReducer(
    reducer,
    initialState(10, AddressLocationSchema.idField)
  );
  const [currentSkip, setCurrentSkip] = useState(1);
  const dataSourceAPI = (query, skip, take) => {
    SetReoute(AddressLocationSchema.projectProxyRoute);
    return buildApiUrl(query, {
      pageIndex: skip + 1,
      pageSize: take,
      // ...row,
    });
  };
  const cache = createRowCache(VIRTUAL_PAGE_SIZE);
  const getAction =
    AddressLocationAction &&
    AddressLocationAction.find(
      (action) => action.dashboardFormActionMethodType === "Get"
    );

  const { rows, skip, totalCount, loading } = state;
  useEffect(() => {
    // console.log(dataSourceAPI(getAction, 10, 20));

    LoadData(
      state,
      dataSourceAPI,
      getAction,
      cache,
      updateRows(reducerDispatch, cache, state),
      reducerDispatch
    );
    // Call LoadData with the controller
  });

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isScrolledToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isScrolledToBottom && rows.length < totalCount && !loading) {
      getRemoteRows(currentSkip, VIRTUAL_PAGE_SIZE * 2, reducerDispatch); //todo change dispatch by reducerDispatch
      setCurrentSkip(currentSkip + 1);
    }
  };
  const AddAddressLocation = (row) => {
    reducerDispatch({
      type: "UPDATE_ROWS",
      payload: {
        rows: [row],
        totalCount: state.totalCount + 1,
      },
    });
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      className="mt-4"
    >
      <AddLocation
        rows={rows}
        onScroll={handleScroll}
        AddAddressLocation={AddAddressLocation}
        loading={loading}
      />
    </ScrollView>
  );
}
