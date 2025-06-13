import { default as React, useEffect, useReducer, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import { SetReoute } from "../../../request";
import {
  selectSelectedNode,
  updateSelectedNode,
} from "../../reducers/LocationReducer";
import NearestBranchesSchema from "../../Schemas/AddressLocation/NearestBranches.json";
import NearestBranchesActions from "../../Schemas/AddressLocation/NearestBranchesActions.json";
import SelectComponent from "../../utils/component/SelectComponent";
import { prepareLoad } from "../../utils/operation/loadHelpers";
import { createRowCache } from "../Pagination/createRowCache";
import { getRemoteRows } from "../Pagination/getRemoteRows";
import { initialState } from "../Pagination/initialState";
import reducer from "../Pagination/reducer";
const VIRTUAL_PAGE_SIZE = 4;
export default function NearestBranches() {
  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation
  );
  const node = useSelector(selectSelectedNode);
  const selectedTab = useSelector((state) => state.location.selectedTab);

  const dispatch = useDispatch();

  const idField = NearestBranchesSchema.idField;
  const displayLookupParam =
    NearestBranchesSchema.dashboardFormSchemaParameters.find(
      (pram) => pram.parameterType == "displayLookup"
    );
  const localization = useSelector((state) => state.localization.localization);
  const [state, reducerDispatch] = useReducer(
    reducer,
    initialState(10, NearestBranchesSchema.idField)
  );
  const [currentSkip, setCurrentSkip] = useState(1);
  const dataSourceAPI = (query, skip, take) => {
    SetReoute(NearestBranchesSchema.projectProxyRoute);
    return buildApiUrl(query, {
      pageIndex: skip + 1,
      pageSize: take,
      ...selectedLocation,
    });
  };
  const cache = createRowCache(VIRTUAL_PAGE_SIZE);
  const getAction =
    NearestBranchesActions &&
    NearestBranchesActions.find(
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
  useEffect(() => {
    if (!loading && !Object.keys(node).length > 0 && rows.length > 0) {
      dispatch(updateSelectedNode(rows[0]));
    }
  }, [loading, selectedTab]);
  return (
    <View className="flex flex-row items-center mt-3">
      <SelectComponent
        idField={idField}
        labelField={displayLookupParam.lookupDisplayField}
        mapData={rows}
        onValueChange={(selected) => {
          dispatch(updateSelectedNode(selected)); // store full object
        }}
        selectedValue={node?.[displayLookupParam.lookupDisplayField]}
        valueField=""
        loading={loading}
      />
    </View>
  );
}
