import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import NodeMenuItemsSchema from "../src/Schemas/MenuSchema/NodeMenuItemsSchema.json";
import { prepareLoad } from "../src/utils/operation/loadHelpers";
import AddressLocationAction from "../src/Schemas/AddressLocation/AddressLocationAction.json";
import AddressLocationSchema from "../src/Schemas/AddressLocation/AddressLocation.json";
import NearestBranchesSchema from "../src/Schemas/AddressLocation/NearestBranches.json";
import NearestBranchesActions from "../src/Schemas/AddressLocation/NearestBranchesActions.json";
import { initialState } from "../src/components/Pagination/initialState";
import { buildApiUrl } from "../components/hooks/APIsFunctions/BuildApiUrl";
import { createRowCache } from "../src/components/Pagination/createRowCache";
import reducer from "../src/components/Pagination/reducer";
import {
  updateSelectedLocation,
  updateSelectedNode,
} from "../src/reducers/LocationReducer";
import { WSMessageHandler } from "../src/utils/WS/handleWSMessage";
import { ConnectToWS } from "../src/utils/WS/ConnectToWS";
import { initializeLocalization } from "../src/reducers/localizationReducer";
import { useNetwork } from "./NetworkContext";
import { useErrorToast } from "../src/components/form-container/ShowErrorToast";
import { useShopNode } from "./ShopNodeProvider";

// Define the shape of the WebSocket context
interface WSContextType {
  notifications: any;
  setNotifications: React.Dispatch<React.SetStateAction<any>>;
}
const VIRTUAL_PAGE_SIZE = 4;
// Create the WebSocket context
export const WSContext = createContext<WSContextType>({
  notifications: [],
  setNotifications: () => {}, // Default no-op function
});

// WebSocket Context Provider

export const PreparingApp: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const {
    status: { isConnected: isOnline },
  } = useNetwork();
  const { selectedNode, setSelectedNode } = useShopNode();
  const { showErrorToast } = useErrorToast();
  // Address Location state with reducer
  const [addressLocationState, addressLocationReducerDispatch] = useReducer(
    reducer,
    initialState(10, AddressLocationSchema.idField)
  );

  // WebSocket state
  const [WS_Connected, setWS_Connected] = useState(false);
  const [_WSsetMessage, setWSsetMessage] = useState<any>(null);

  // Redux selectors
  const rows = useSelector((state: any) => state.menuItem.rows);
  const totalCount = useSelector((state: any) => state.menuItem.totalCount);
  const fieldsType = useSelector((state: any) => state.menuItem.fieldsType);
  const reduxSelectedLocation = useSelector(
    (state: any) => state.location?.selectedLocation
  );

  // Address location API
  const addressLocationDataSourceAPI = (
    query: any,
    skip: number,
    take: number
  ) => {
    return buildApiUrl(query, {
      pageIndex: skip + 1,
      pageSize: take,

    });
  };

  const addressLocationCache = createRowCache(VIRTUAL_PAGE_SIZE);
  const addressLocationGetAction = AddressLocationAction?.find(
    (action) => action.dashboardFormActionMethodType === "Get"
  );

  // Local state for selected location
  const [selectedLocation, setSelectedLocation] = useState(
    reduxSelectedLocation || null
  );

  // Load Address Location on getAction ready
  useEffect(() => {
    if (!addressLocationGetAction) return;

    prepareLoad({
      state: addressLocationState,
      dataSourceAPI: addressLocationDataSourceAPI,
      getAction: addressLocationGetAction,
      cache: addressLocationCache,
      reducerDispatch: addressLocationReducerDispatch,
    });

    if (addressLocationState.rows.length > 0) {
      dispatch(updateSelectedLocation(addressLocationState.rows[0]));
      setSelectedLocation(addressLocationState.rows[0]);
    }
  }, [
    addressLocationGetAction,
    addressLocationState.rows.length,
    dispatch,
    isOnline,
  ]);

  // Nearest Branches state with reducer
  const [nodeState, nodeReducerDispatch] = useReducer(
    reducer,
    initialState(10, NearestBranchesSchema.idField)
  );
  const [nodeMenuItemState, nodeMenuItemReducerDispatch] = useReducer(
    reducer,
    initialState(10, NodeMenuItemsSchema.idField)
  );
  const nodeDataSourceAPI = (query: any, skip: number, take: number) => {
    return buildApiUrl(query, {
      pageIndex: skip + 1,
      pageSize: take,
      ...(selectedLocation || {}),
    });
  };

  const nodeCache = createRowCache(VIRTUAL_PAGE_SIZE);
  const nodeGetAction = NearestBranchesActions?.find(
    (action) => action.dashboardFormActionMethodType === "Get"
  );
  // Load Nearest Branches when location is selected and nodeGetAction is ready
  useEffect(() => {
    if (
      !selectedLocation ||
      !nodeGetAction ||
      Object.keys(selectedNode).length > 0
    )
      return;

    prepareLoad({
      state: nodeState,
      dataSourceAPI: nodeDataSourceAPI,
      getAction: nodeGetAction,
      cache: nodeCache,
      reducerDispatch: nodeReducerDispatch,
    });

    if (nodeState.rows.length > 0) {
      const firstNode = nodeState.rows[0];
      dispatch(updateSelectedNode(firstNode));
      setSelectedNode(firstNode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocation, nodeGetAction, isOnline]);

  // 🔌 WebSocket handler effect on selectedNode change
  useEffect(() => {
    if (!selectedNode || WS_Connected) return;
    let cleanup;
    ConnectToWS(setWSsetMessage, setWS_Connected)
      .then(() => console.log("🔌 WebSocket setup done"))
      .catch((e) => {
        console.error("❌ Cart WebSocket error", e);
      });

    return () => {
      if (cleanup) cleanup(); // Clean up when component unmounts or deps change
      console.log("🧹 Cleaned up WebSocket handler");
    };
  }, [selectedNode, WS_Connected, isOnline]);
  const callbackReducerUpdate = async (ws_updatedRows) => {
    await nodeMenuItemReducerDispatch({
      type: "WS_OPE_ROW",
      payload: {
        rows: ws_updatedRows.rows,
        totalCount: ws_updatedRows.totalCount,
      },
    });
  };

  useEffect(() => {
    if (nodeMenuItemState.rows.length > 0) {
      const _handleWSMessage = new WSMessageHandler({
        _WSsetMessage,
        fieldsType,
        rows,
        totalCount,
        callbackReducerUpdate,
      });
      _handleWSMessage.process();
    }
  }, [_WSsetMessage]);
  useEffect(() => {
    dispatch(initializeLocalization());
  }, [isOnline]);

  // If useWebSocketHandler returns cleanup function (unsubscribe), call it on unmount

  return (
    <WSContext.Provider
      value={{ notifications: [], setNotifications: () => {} }}
    >
      {children}
    </WSContext.Provider>
  );
};
