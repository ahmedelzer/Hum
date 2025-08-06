// CartWSManager.tsx
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useReducer, useState } from "react";

import { getField } from "../src/utils/operation/getField";
import CartSchema from "../src/Schemas/MenuSchema/CartSchema.json";
import CartSchemaActions from "../src/Schemas/MenuSchema/CartSchemaActions.json";
import { WSMessageHandler } from "../src/utils/WS/handleWSMessage";
import { ConnectToWS } from "../src/utils/WS/ConnectToWS";
import { createRowCache } from "../src/components/Pagination/createRowCache";
import { buildApiUrl } from "../components/hooks/APIsFunctions/BuildApiUrl";
import { prepareLoad } from "../src/utils/operation/loadHelpers";
import { initialState } from "../src/components/Pagination/initialState";
import reducer from "../src/components/Pagination/reducer";
import { useNetwork } from "./NetworkContext";
import { useErrorToast } from "../src/components/form-container/ShowErrorToast";

const VIRTUAL_PAGE_SIZE = 4000;
const UserProviderLayer = (
  {
    // selectedLocation,
    // selectedNode,
  }
) => {
  const {
    status: { isConnected: isOnline },
  } = useNetwork();
  const { showErrorToast } = useErrorToast();
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
  const [cartState, cartReducerDispatch] = useReducer(
    reducer,
    initialState(4000, CartSchema.idField)
  );
  const [cart_WS_Connected, setCartWS_Connected] = useState(false);
  const [cart_WSsetMessage, setCartWSsetMessage] = useState(null);

  const parameters = CartSchema?.dashboardFormSchemaParameters ?? [];

  const cartFieldsType = {
    imageView: getField(parameters, "menuItemImage"),
    text: getField(parameters, "menuItemName"),
    description: getField(parameters, "menuItemDescription"),
    price: getField(parameters, "price"),
    rate: getField(parameters, "rate"),
    likes: getField(parameters, "likes"),
    dislikes: getField(parameters, "dislikes"),
    orders: getField(parameters, "orders"),
    reviews: getField(parameters, "reviews"),
    isAvailable: getField(parameters, "isAvailable"),
    menuCategoryID: getField(parameters, "menuCategoryID"),
    idField: CartSchema.idField,
    dataSourceName: CartSchema.dataSourceName,
    cardAction: getField(parameters, "cardAction"),
    discount: getField(parameters, "discount"),
    priceAfterDiscount: getField(parameters, "priceAfterDiscount"),
    note: getField(parameters, "note"),
    proxyRoute: CartSchema.projectProxyRoute,
  };

  // 🌐 WebSocket connect effect
  useEffect(() => {
    if (cart_WS_Connected) return;
    let cleanup;
    ConnectToWS(setCartWSsetMessage, setCartWS_Connected)
      .then(() => console.log("🔌 Cart WebSocket connected"))
      .catch((e) => {
        console.error("❌ Cart WebSocket error", e);
      });

    return () => {
      if (cleanup) cleanup(); // Clean up when component unmounts or deps change
      console.log("🧹 Cleaned up WebSocket handler");
    };
  }, [cart_WS_Connected, isOnline]);

  // ✅ Callback to update reducer
  const cartCallbackReducerUpdate = async (cart_ws_updatedRows) => {
    await cartReducerDispatch({
      type: "WS_OPE_ROW",
      payload: {
        rows: cart_ws_updatedRows.rows,
        totalCount: cart_ws_updatedRows.totalCount,
      },
    });
  };

  // 📨 WebSocket message handler
  useEffect(() => {
    if (!cartState || !cartState.rows) return;
    if (!cart_WSsetMessage) return;
    const _handleWSMessage = new WSMessageHandler({
      _WSsetMessage: cart_WSsetMessage, // match param name
      fieldsType: cartFieldsType,
      rows: cartState.rows,
      totalCount: cartState.totalCount,
      callbackReducerUpdate: cartCallbackReducerUpdate,
    });
    _handleWSMessage.process();
  }, [cart_WSsetMessage, cartState.rows, isOnline]);

  const dataSourceAPI = (query, skip, take) => {
    return buildApiUrl(query, {
      pageIndex: skip + 1,
      pageSize: take,
      projectRout: CartSchema.projectProxyRoute,

      // ...row,
    });
  };
  const cache = createRowCache(VIRTUAL_PAGE_SIZE);
  const getCustomerCartAction =
    CartSchemaActions &&
    CartSchemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Get"
    );

  // useEffect(() => {
  //   SetReoute(CartSchema.projectProxyRoute);
  //   prepareLoad({
  //     state: cartState,
  //     dataSourceAPI,
  //     getAction: getCustomerCartAction,
  //     cache,
  //     reducerDispatch: cartReducerDispatch,
  //   });
  // }, [selectedLocation, selectedNode]);

  return null;
};

export default UserProviderLayer;
