import {
  default as React,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { useNetwork } from "../../../context/NetworkContext";
import { useWS } from "../../../context/WSProvider";
// import { LocalizationContext } from "../../../context/LocalizationContext";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import { SetReoute } from "../../../request";
import SuggestCardSchema from "../../Schemas/MenuSchema/SuggestCardSchema.json";
import { getField } from "../../utils/operation/getField";
import { prepareLoad } from "../../utils/operation/loadHelpers";
import { createRowCache } from "../Pagination/createRowCache";
import { getRemoteRows } from "../Pagination/getRemoteRows";
import { initialState } from "../Pagination/initialState";
import reducer from "../Pagination/reducer";
import { RenderSuggestCards } from "./RenderSuggestCards";
import { WSMessageHandler } from "../../utils/WS/handleWSMessage";
import { ConnectToWS } from "../../utils/WS/ConnectToWS";
let VIRTUAL_PAGE_SIZE = 10;

export default function SuggestCardContainer({
  schema,
  schemaActions,
  suggestContainerType = 1,
  shownNodeMenuItemIDs,
}) {
  const { status, isOnline } = useNetwork();
  const [WS_Connected, setWS_Connected] = useState(false);
  const [currentSkip, setCurrentSkip] = useState(1);
  const { _wsMessageSuggest, setWSMessageSuggest } = useWS();

  const [suggestState, suggestReducerDispatch] = useReducer(
    reducer,
    initialState(4000, SuggestCardSchema.idField)
  );
  const parameters = SuggestCardSchema?.dashboardFormSchemaParameters ?? [];
  const getSuggestAction =
    schemaActions &&
    schemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Get"
    );
  const reduxSelectedLocation = useSelector(
    (state: any) => state.location?.selectedLocation
  );
  const reduxSelectedNode = useSelector(
    (state: any) => state.location?.selectedNode
  );

  const [selectedLocation, setSelectedLocation] = useState(
    reduxSelectedLocation || null
  );
  const [selectedNode, setSelectedNode] = useState(reduxSelectedNode || null);
  const suggestFieldsType = {
    imageView: getField(parameters, "menuItemImage"),
    text: getField(parameters, "menuItemName"),
    description: getField(parameters, "menuItemDescription"),
    price: getField(parameters, "price"),
    isAvailable: getField(parameters, "isAvailable"),
    discount: getField(parameters, "discount"),
    priceAfterDiscount: getField(parameters, "priceAfterDiscount"),
    rewardPoints: getField(parameters, "rewardPoints"),
    idField: SuggestCardSchema.idField,
    dataSourceName: SuggestCardSchema.dataSourceName,
    cardAction: getField(parameters, "cardAction"),
  };

  const {
    rows: suggestRows,
    totalCount: suggestTotalCount,
    loading: suggestLoading,
  } = suggestState;

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    console.log("scrolling");

    const isScrolledToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    console.log(
      isScrolledToBottom,
      layoutMeasurement,
      contentOffset,
      contentSize
    );

    if (
      isScrolledToBottom &&
      suggestRows.length < suggestTotalCount &&
      !suggestLoading
    ) {
      getRemoteRows(currentSkip, VIRTUAL_PAGE_SIZE * 2, suggestReducerDispatch); //todo change dispatch by reducerDispatch
      setCurrentSkip(currentSkip + 1);
    }
  };

  const suggestDataSourceAPI = (query, skip, take) => {
    SetReoute(SuggestCardSchema.projectProxyRoute);
    return buildApiUrl(query, {
      pageIndex: skip + 1,
      pageSize: take,
      shownNodeMenuItemIDs: shownNodeMenuItemIDs.join(","),
    });
  };

  useEffect(() => {
    if (!selectedNode) return;
    setWS_Connected(false);
  }, [selectedNode, isOnline]);
  // 🌐 Setup WebSocket connection on mount or WS_Connected change
  useEffect(() => {
    if (WS_Connected) return;

    SetReoute(SuggestCardSchema.projectProxyRoute);
    let cleanup;
    ConnectToWS(setWSMessageSuggest, setWS_Connected)
      .then(() => console.log("🔌 WebSocket setup done"))
      .catch((e) => {});
    return () => {
      if (cleanup) cleanup(); // Clean up when component unmounts or deps change
      console.log("🧹 Cleaned up WebSocket handler");
    };
  }, [WS_Connected]);

  // 🧠 Reducer callback to update rows
  const callbackReducerUpdate = async (ws_updatedRows) => {
    await suggestReducerDispatch({
      type: "WS_OPE_ROW",
      payload: {
        rows: ws_updatedRows.rows,
        totalCount: ws_updatedRows.totalCount,
      },
    });
  };

  // 📨 React to WebSocket messages only when valid
  useEffect(() => {
    if (!_wsMessageSuggest) return;
    const _handleWSMessage = new WSMessageHandler({
      _WSsetMessage: _wsMessageSuggest,
      fieldsType: suggestFieldsType,
      rows: suggestRows,
      totalCount: suggestTotalCount,
      callbackReducerUpdate,
    });
    _handleWSMessage.process();
    //setWSMessageMenuItem(_wsMessageMenuItem);
  }, [_wsMessageSuggest]);
  const loadData = useCallback(() => {
    prepareLoad({
      state: suggestState,
      dataSourceAPI: suggestDataSourceAPI,
      getAction: getSuggestAction,
      cache: createRowCache(4000),
      reducerDispatch: suggestReducerDispatch,
      abortController: false,
      reRequest: true,
    });
  }, [
    suggestDataSourceAPI,
    getSuggestAction,
    suggestReducerDispatch,
    suggestState,
    selectedNode,
    ,
  ]);
  useEffect(() => {
    if (isOnline) {
      resetAndReload(); // Reload only when back online
    }
  }, [isOnline, shownNodeMenuItemIDs, schemaActions]);

  const resetAndReload = useCallback(() => {
    suggestReducerDispatch({
      type: "RESET_SERVICE_LIST",
      payload: { lastQuery: "" },
    });
    setTimeout(() => {
      loadData();
    }, 0);
  }, [loadData]);
  return (
    <ScrollView
      horizontal
      className="mt-2"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 12,
        paddingHorizontal: 12,
        alignItems: "flex-start",
      }}
    >
      <RenderSuggestCards
        items={suggestRows}
        schemaActions={schemaActions}
        suggestContainerType={suggestContainerType}
        suggestFieldsType={suggestFieldsType}
      />
    </ScrollView>
  );
}
