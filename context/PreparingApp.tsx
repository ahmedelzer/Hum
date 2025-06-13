import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetReoute } from "../request";
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
  const reduxSelectedNode = useSelector(
    (state: any) => state.location?.selectedNode
  );

  // Address location API
  const addressLocationDataSourceAPI = (
    query: any,
    skip: number,
    take: number
  ) => {
    SetReoute(AddressLocationSchema.projectProxyRoute); // Make sure SetReoute is defined
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
  }, [addressLocationGetAction, addressLocationState.rows.length, dispatch]);

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
    SetReoute(NearestBranchesSchema.projectProxyRoute);
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

  // Local state for selected node
  const [selectedNode, setSelectedNode] = useState(reduxSelectedNode);

  // Load Nearest Branches when location is selected and nodeGetAction is ready
  useEffect(() => {
    if (!selectedLocation || !nodeGetAction) return;

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
  }, [selectedLocation, nodeGetAction]);

  // 🔌 WebSocket handler effect on selectedNode change
  useEffect(() => {
    if (!selectedNode || WS_Connected) return;

    SetReoute(NodeMenuItemsSchema.projectProxyRoute);

    ConnectToWS(setWSsetMessage, setWS_Connected)
      .then(() => console.log("🔌 WebSocket setup done"))
      .catch((e) => console.error("❌ WebSocket setup error", e));
  }, [selectedNode, WS_Connected]);
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
  }, []);

  // If useWebSocketHandler returns cleanup function (unsubscribe), call it on unmount

  return (
    <WSContext.Provider
      value={{ notifications: [], setNotifications: () => {} }}
    >
      {children}
    </WSContext.Provider>
  );
};
