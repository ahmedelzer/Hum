// CartWSManager.tsx
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { getField } from "../src/utils/operation/getField";
import CartSchema from "../src/Schemas/MenuSchema/CartSchema.json"
import CartSchemaActions from "../src/Schemas/MenuSchema/CartSchemaActions.json"
import { SetReoute } from "../request";
import { WSMessageHandler } from "../src/utils/WS/handleWSMessage";
import { ConnectToWS } from "../src/utils/WS/ConnectToWS";
import { createRowCache } from "../src/components/Pagination/createRowCache";
import { buildApiUrl } from "../components/hooks/APIsFunctions/BuildApiUrl";
import { prepareLoad } from "../src/utils/operation/loadHelpers";

const VIRTUAL_PAGE_SIZE = 4000;
const UserProviderLayer = () => {
  
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);
const total = useSelector((state) => state.cart.totalAmount);

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

  SetReoute(CartSchema.projectProxyRoute);

  ConnectToWS(setCartWSsetMessage, setCartWS_Connected)
    .then(() => console.log("🔌 Cart WebSocket connected"))
    .catch((e) => console.error("❌ Cart WebSocket error", e));
}, [cart_WS_Connected]);

// ✅ Callback to update reducer
const cartCallbackReducerUpdate = async (cart_ws_updatedRows) => {
  await reducerDispatch({
    type: "WS_OPE_ROW",
    payload: {
      rows: cart_ws_updatedRows.rows,
      totalCount: cart_ws_updatedRows.totalCount,
    },
  });
};

// 📨 WebSocket message handler
useEffect(() => {
  if (!cart || !cart.rows ) return;
  if (!cart_WSsetMessage) return;
const _handleWSMessage =new WSMessageHandler({
    _WSsetMessage: cart_WSsetMessage, // match param name
    fieldsType: cartFieldsType,
    rows: cart.rows,
    totalCount: cart.totalCount,
    callbackReducerUpdate: cartCallbackReducerUpdate,
  });
  _handleWSMessage.process();
}, [cart_WSsetMessage, cart.rows]);
/*
   const dataSourceAPI = (query, skip, take) => {
      SetReoute(CartSchemaActions.projectProxyRoute);
      return buildApiUrl(query, {
        pageIndex: skip + 1,
        pageSize: take,
        // ...row,
      });
    };
    const cache = createRowCache(VIRTUAL_PAGE_SIZE);
const getCustomerCartAction = CartSchemaActions&&CartSchemaActions.find(
        (action) => action.dashboardFormActionMethodType === "Get"
      );
  const loadCart = async () => {
    await prepareLoad({
      state: cart,
      dataSourceAPI,
      getAction: getCustomerCartAction,
      cache,
      reducerDispatch: dispatch,
    });
  };

  useEffect(() => {
    SetReoute(CartSchema.projectProxyRoute);
    loadCart();
  }, []);
console.log("cart.rows:",cart.rows);
 
*/
  return null;
};

export default UserProviderLayer;
