// WSContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import reducer from "../src/components/Pagination/reducer";
import { initialState } from "../src/components/Pagination/initialState";
import { getField } from "../src/utils/operation/getField";
import { ConnectToWS } from "../src/utils/WS/ConnectToWS";
import { useNetwork } from "./NetworkContext";
import { useWS } from "./WSProvider";
import { WSMessageHandler } from "../src/utils/WS/handleWSMessage";
import { buildApiUrl } from "../components/hooks/APIsFunctions/BuildApiUrl";
import { useSelector } from "react-redux";
import { prepareLoad } from "../src/utils/operation/loadHelpers";
import { createRowCache } from "../src/components/Pagination/createRowCache";
import CartSchema from "../src/Schemas/MenuSchema/CartSchema.json";
import CartSchemaActions from "../src/Schemas/MenuSchema/CartSchemaActions.json";
import { useShopNode } from "./ShopNodeProvider";
import { useErrorToast } from "../src/components/form-container/ShowErrorToast";
// Create context
export const CartContext = createContext(null);

// Context provider component
export const CartProvider = ({ children }) => {
  const { status, isOnline } = useNetwork();
  const { _wsMessageCart, setWSMessageCart } = useWS();
  const { showErrorToast } = useErrorToast();
  const [cartState, cartReducerDispatch] = useReducer(
    reducer,
    initialState(4000, CartSchema.idField)
  );
  const [cart_WS_Connected, setCartWS_Connected] = useState(false);
  const {
    rows: cartRows,
    totalCount: cartTotalCount,
    loading: cartLoading,
  } = cartState;
  const parameters = CartSchema?.dashboardFormSchemaParameters ?? [];
  const getCustomerCartAction =
    CartSchemaActions &&
    CartSchemaActions.find(
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
  //const [selectedNode, setSelectedNode] = useState(reduxSelectedNode || null);
  const { selectedNode, setSelectedNode } = useShopNode();
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
    nodeMenuItemID: getField(parameters, "nodeMenuItemID"),
    menuCategoryID: getField(parameters, "menuCategoryID"),
    idField: CartSchema.idField,
    dataSourceName: CartSchema.dataSourceName,
    cardAction: getField(parameters, "cardAction"),
    discount: getField(parameters, "discount"),
    priceAfterDiscount: getField(parameters, "priceAfterDiscount"),
    note: getField(parameters, "note"),
    proxyRoute: CartSchema.projectProxyRoute,
  };
  useEffect(() => {
    if (!selectedNode) return;
    setCartWS_Connected(false);
  }, [selectedNode, isOnline]);
  useEffect(() => {
    // 🌐 WebSocket connect effect

    if (cart_WS_Connected) return;
    let cleanup;
    ConnectToWS(setWSMessageCart, setCartWS_Connected)
      .then(() => console.log("🔌 Cart WebSocket connected"))
      .catch((e) => {
       
        console.error("❌ Cart WebSocket error", e);
      });
    return () => {
      if (cleanup) cleanup(); // Clean up when component unmounts or deps change
      console.log("🧹 Cleaned up WebSocket handler");
    };
  }, [cart_WS_Connected]);

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
    if (!_wsMessageCart) return;

    const handlerCartWSMessage = new WSMessageHandler({
      _WSsetMessage: _wsMessageCart, // match param name
      fieldsType: cartFieldsType,
      rows: cartRows,
      totalCount: cartTotalCount,
      callbackReducerUpdate: cartCallbackReducerUpdate,
    });
    handlerCartWSMessage.process();
  }, [_wsMessageCart]);

  const cartDataSourceAPI = (query, skip, take) => {
    return buildApiUrl(query, {
      pageIndex: skip + 1,
      pageSize: take,
      // ...row,
    });
  };
  const loadData = useCallback(() => {
    prepareLoad({
      state: cartState,
      dataSourceAPI: cartDataSourceAPI,
      getAction: getCustomerCartAction,
      cache: createRowCache(4000),
      reducerDispatch: cartReducerDispatch,
      abortController: false,
      reRequest: true,
    });
  }, [
    cartDataSourceAPI,
    getCustomerCartAction,
    cartReducerDispatch,
    cartState,
    selectedNode,
  ]);
  useEffect(() => {
    if (isOnline) {
      resetAndReload(); // Reload only when back online
    }
  }, [isOnline]);

  const resetAndReload = useCallback(() => {
    cartReducerDispatch({
      type: "RESET_SERVICE_LIST",
      payload: { lastQuery: "" },
    });
    setTimeout(() => {
      loadData();
    }, 0);
  }, [loadData]);
  return (
    <CartContext.Provider
      value={{
        cartState,
        cartReducerDispatch,
        cartFieldsType,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to consume the context
export const useCart = () => useContext(CartContext);
