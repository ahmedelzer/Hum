import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { WSMessageHandler } from "../../utils/WS/handleWSMessage";
import { SetReoute } from "../../../request";
import { ConnectToWS } from "../../utils/WS/ConnectToWS";
import { getField } from "../../utils/operation/getField";
import { initialState } from "../../components/Pagination/initialState";
import reducer from "../../components/Pagination/reducer";
import CartSchema from "../../Schemas/MenuSchema/CartSchema.json";
import CartSchemaActions from "../../Schemas/MenuSchema/CartSchemaActions.json";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function InvoiceSummary({ title, cartInfo }) {
  const [expanded, setExpanded] = useState(true);
  const [reRequest, setReRequest] = useState(false);
  const [_WSsetMessage, setWSsetMessage] = useState("{}");
  const [WS_Connected, setWS_Connected] = useState(false);
  //const navigation = useNavigation();
  //const { localization } = useContext(LocalizationContext);

  // Get schema parameters
  ////cart
  const [cartState, cartReducerDispatch] = useReducer(
    reducer,
    initialState(4000, CartSchema.idField)
  );
  const {
    rows: cartRows,
    totalCount: cartTotalCount,
    loading: cartLoading,
  } = cartState;
  const [cart_WS_Connected, setCartWS_Connected] = useState(false);

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

    ConnectToWS(setWSsetMessage, setCartWS_Connected)
      .then(() => console.log("🔌 Cart WebSocket connected"))
      .catch((e) => console.error("❌ Cart WebSocket error", e));
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
    if (!cartState.rows) return;
    if (!_WSsetMessage) return;

    const handlerCartWSMessage = new WSMessageHandler({
      _WSsetMessage, // match param name
      fieldsType: cartFieldsType,
      rows: cartRows,
      totalCount: cartTotalCount,
      callbackReducerUpdate: cartCallbackReducerUpdate,
    });
    handlerCartWSMessage.process();
  }, [_WSsetMessage, cartState.rows]);

  // Animate height (optional approach)
  // You could also use LayoutAnimation for automatic smooth height changes (simpler)

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View className="mt-1 mb-6 border border-accent rounded-xl p-2">
      {/* Header area - tap to toggle */}
      <TouchableOpacity
        onPress={toggleExpanded}
        activeOpacity={0.7}
        className="mt-1 mb-2 rounded-xl p-2 !bg-accent flex-row justify-between items-center"
      >
        <Text className="text-lg font-bold text-body">{title}</Text>
        <Text className="text-lg font-bold text-body">
          {cartInfo?.TotalAmount
            ? `$${cartInfo.TotalAmount.toFixed(2)}`
            : "$0.00"}
        </Text>
      </TouchableOpacity>

      {/* Expandable details */}
      {expanded && (
        <View className="space-y-1 mt-2">
          <Row label="Total Amount" value={cartInfo.TotalAmount ?? 0} />
          <Row label="Total Tax" value={cartInfo.TotalTaxAmount ?? 0} />
          <Row label="Total Fees" value={cartInfo.TotalFeesAmount ?? 0} />
          <Row
            label="Total Discount"
            value={cartInfo.TotalDiscountAmount ?? 0}
          />
          <Row label="Net Amount" value={cartInfo.NetAmount ?? 0} />
          <Row
            label="Special Net Amount"
            value={cartInfo.SpecialNetAmount ?? 0}
          />
          <Row
            label="Shipments Needed"
            value={cartInfo.TotalShipmentsNeeded ?? 0}
          />
        </View>
      )}
    </View>
  );
}

function Row({ label, value = 0 }) {
  return (
    <View className="flex flex-row justify-between">
      <Text className="text-base text-text">{label}</Text>
      <Text className="text-base font-semibold text-text">{value}</Text>
    </View>
  );
}
