// WSContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { buildApiUrl } from "../components/hooks/APIsFunctions/BuildApiUrl";
import { useErrorToast } from "../src/components/form-container/ShowErrorToast";
import { createRowCache } from "../src/components/Pagination/createRowCache";
import { getRemoteRows } from "../src/components/Pagination/getRemoteRows";
import { initialState } from "../src/components/Pagination/initialState";
import reducer from "../src/components/Pagination/reducer";
import SuggestCardSchema from "../src/Schemas/MenuSchema/SuggestCardSchema.json";
import SuggestCardSchemaActions from "../src/Schemas/MenuSchema/SuggestCardSchemaActions.json";
import { getField } from "../src/utils/operation/getField";
import { prepareLoad } from "../src/utils/operation/loadHelpers";
import { ConnectToWS } from "../src/utils/WS/ConnectToWS";
import { WSMessageHandler } from "../src/utils/WS/handleWSMessage";
import { useNetwork } from "./NetworkContext";
import { useShopNode } from "./ShopNodeProvider";
import { useWS } from "./WSProvider";
// Create context
export const SuggestContext = createContext(null);
const VIRTUAL_PAGE_SIZE = 10;

// Context provider component
export const SuggestProvider = ({ children }) => {
  const [shownNodeMenuItemIDs, setShownNodeMenuItemIDs] = useState([]);
  const [schemaActions, setSchemaActions] = useState(SuggestCardSchemaActions);
  const [reRequest, setReRequest] = useState(false);
  const { _wsMessageMenuItem, setWSMessageMenuItem } = useWS();
  const [WS_Connected, setWS_Connected] = useState(false);
  const { showErrorToast } = useErrorToast();

  const reduxSelectedLocation = useSelector(
    (state: any) => state.location?.selectedLocation
  );
  const { selectedNode, setSelectedNode } = useShopNode();
  const parameters = SuggestCardSchema?.dashboardFormSchemaParameters ?? [];
  //

  //
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
  const reduxSelectedNode = useSelector(
    (state: any) => state.location?.selectedNode
  );

  const [selectedLocation, setSelectedLocation] = useState(
    reduxSelectedLocation || null
  );
  //const [selectedNode, setSelectedNode] = useState(reduxSelectedNode || null);

  // const selectedNode = selectSelectedNode(store.getState());
  const [state, reducerDispatch] = useReducer(
    reducer,
    initialState(VIRTUAL_PAGE_SIZE, SuggestCardSchema.idField)
  );
  const { requestedSkip, take, lastQuery } = state;

  const [currentSkip, setCurrentSkip] = useState(1);
  const dataSourceAPI = (query, skip, take) => {
    return buildApiUrl(query, {
      pageIndex: skip + 1,
      pageSize: take,
      shownNodeMenuItemIDs: shownNodeMenuItemIDs.join(","),
      projectRout: SuggestCardSchema.projectProxyRoute,
    });
  };
  const cache = createRowCache(VIRTUAL_PAGE_SIZE);
  const getAction =
    schemaActions &&
    schemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Get"
    );

  const { rows, skip, totalCount, loading } = state;
  const {
    status: { isConnected: isOnline },
  } = useNetwork();

  useEffect(() => {
    if (!selectedNode) return;
    setWS_Connected(false);
  }, [selectedNode, isOnline]);
  // 🌐 Setup WebSocket connection on mount or WS_Connected change
  useEffect(() => {
    if (WS_Connected) return;
    let cleanup;
    ConnectToWS(setWSMessageMenuItem, setWS_Connected)
      .then(() => console.log("🔌 WebSocket setup done"))
      .catch((e) => {});
    return () => {
      if (cleanup) cleanup(); // Clean up when component unmounts or deps change
      console.log("🧹 Cleaned up WebSocket handler");
    };
  }, [WS_Connected]);

  // 🧠 Reducer callback to update rows
  const callbackReducerUpdate = async (ws_updatedRows) => {
    await reducerDispatch({
      type: "WS_OPE_ROW",
      payload: {
        rows: ws_updatedRows.rows,
        totalCount: ws_updatedRows.totalCount,
      },
    });
  };

  // 📨 React to WebSocket messages only when valid
  useEffect(() => {
    if (!_wsMessageMenuItem) return;
    const _handleWSMessage = new WSMessageHandler({
      _WSsetMessage: _wsMessageMenuItem,
      fieldsType: suggestFieldsType,
      rows,
      totalCount,
      callbackReducerUpdate,
    });
    _handleWSMessage.process();
    //setWSMessageMenuItem(_wsMessageMenuItem);
  }, [_wsMessageMenuItem]);

  const loadData = useCallback(() => {
    console.log("====================================");
    console.log(shownNodeMenuItemIDs, "shownNodeMenuItemIDs from provider");
    console.log("====================================");
    prepareLoad({
      state,
      dataSourceAPI,
      getAction,
      cache: createRowCache(4000),
      reducerDispatch,
      abortController: false,
      reRequest: true,
    });
  }, [
    dataSourceAPI,
    getAction,
    reducerDispatch,
    state,
    selectedNode,
    shownNodeMenuItemIDs,
    schemaActions,
  ]);

  useEffect(() => {
    if (isOnline) {
      resetAndReload(); // Reload only when back online
    }
  }, [isOnline, shownNodeMenuItemIDs]);

  const resetAndReload = useCallback(() => {
    console.log("====================================");
    console.log(dataSourceAPI(getAction, 0, VIRTUAL_PAGE_SIZE * 2));
    console.log("====================================");
    reducerDispatch({
      type: "RESET_SERVICE_LIST",
      payload: {
        lastQuery: dataSourceAPI(getAction, 0, VIRTUAL_PAGE_SIZE * 2),
      },
    });
    setTimeout(() => {
      loadData();
    }, 0);
  }, [loadData]);

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

    if (isScrolledToBottom && rows.length < totalCount && !loading) {
      getRemoteRows(currentSkip, VIRTUAL_PAGE_SIZE * 2, reducerDispatch); //todo change dispatch by reducerDispatch
      setCurrentSkip(currentSkip + 1);
    }
  };
  return (
    <SuggestContext.Provider
      value={{
        shownNodeMenuItemIDs,
        setShownNodeMenuItemIDs,
        schemaActions,
        setSchemaActions,
        suggestFieldsType,
        state,
        reducerDispatch,
        handleScroll,
        resetAndReload,
      }}
    >
      {children}
    </SuggestContext.Provider>
  );
};

// Custom hook to consume the context
export const useSuggest = () => useContext(SuggestContext);
