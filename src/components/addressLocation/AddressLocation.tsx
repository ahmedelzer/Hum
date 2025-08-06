import React, { useEffect, useReducer, useState } from "react";
import { ScrollView } from "react-native";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import AddressLocationSchema from "../../Schemas/AddressLocation/AddressLocation.json";
import AddressLocationAction from "../../Schemas/AddressLocation/AddressLocationAction.json";
import { prepareLoad } from "../../utils/operation/loadHelpers";
import { createRowCache } from "../Pagination/createRowCache";
import { getRemoteRows } from "../Pagination/getRemoteRows";
import { initialState } from "../Pagination/initialState";
import reducer from "../Pagination/reducer";
import AddLocation from "./AddLocation";
const VIRTUAL_PAGE_SIZE = 4;
export default function AddressLocation() {
  const [state, reducerDispatch] = useReducer(
    reducer,
    initialState(10, AddressLocationSchema.idField)
  );
  const [currentSkip, setCurrentSkip] = useState(1);
  const dataSourceAPI = (query, skip, take) => {
    return buildApiUrl(query, {
      pageIndex: skip + 1,
      pageSize: take,
      projectRout: AddressLocationSchema.projectProxyRoute,

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
    prepareLoad({
      state,
      dataSourceAPI,
      getAction,
      cache,
      reducerDispatch,
    });
  }, []);

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
