import { AntDesign } from "@expo/vector-icons";
import { default as React, useEffect, useReducer, useState } from "react";
import { Text, View } from "react-native";
import { Chase } from "react-native-animated-spinkit";
import { useDispatch, useSelector } from "react-redux";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "../../../components/ui";
import { SetReoute } from "../../../request";
import LoadingScreen from "../../kitchensink-components/loading/LoadingScreen";
import {
  selectSelectedNode,
  updateSelectedNode,
} from "../../reducers/LocationReducer";
import NearestBranchesSchema from "../../Schemas/AddressLocation/NearestBranches.json";
import NearestBranchesActions from "../../Schemas/AddressLocation/NearestBranchesActions.json";
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
      <Select
        value={selectedLocation[displayLookupParam.lookupDisplayField]} // only the id is passed around
        onValueChange={(selected) => {
          dispatch(updateSelectedNode(selected)); // store full object
        }}
        className="flex-1 mx-2"
      >
        <SelectTrigger
          variant="outline"
          size="sm"
          className="flex-1 justify-between h-11"
        >
          <SelectInput
            value={node?.[displayLookupParam.lookupDisplayField] ?? ""}
            placeholder="Select option"
            className="text-base text-text"
          />
          <SelectIcon as={AntDesign} name="down" className="mr-3 text-text" />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {loading && (
              <LoadingScreen LoadingComponent={<Chase size={40} />} />
            )}
            {rows?.length === 0 && !loading && (
              <Text className="text-center justify-center items-center flex-1 mt-4">
                {localization.Hum_screens.menu.noItems}
              </Text>
            )}
            {rows.map((location) => (
              <SelectItem
                label={location[displayLookupParam.lookupDisplayField]}
                value={location}
                key={location[idField]}
              />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
    </View>
  );
}
