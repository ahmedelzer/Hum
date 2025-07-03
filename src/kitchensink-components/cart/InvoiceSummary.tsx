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
import CartInfoSchemaAction from "../../Schemas/MenuSchema/CartInfoSchemaAction.json";
import CustomerCartInfo from "./CustomerCartInfo";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import useFetchWithoutBaseUrl from "../../../components/hooks/APIsFunctions/UseFetchWithoutBaseUrl";
import CustomerInfoSchema from "../../Schemas/MenuSchema/CartInfoSchema.json";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function InvoiceSummary() {
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
  const cartInfoDataSourceAPI = (query) => {
    SetReoute(CartSchema.projectProxyRoute);
    return buildApiUrl(query);
  };
  const getCustomerCartAction =
    CartInfoSchemaAction &&
    CartInfoSchemaAction.find(
      (action) => action.dashboardFormActionMethodType === "Get"
    );
  const { data: GetCustomerCartInfo } = useFetchWithoutBaseUrl(
    cartInfoDataSourceAPI(getCustomerCartAction)
  );
  const totalField = getField(
    CustomerInfoSchema?.dashboardFormSchemaParameters,
    "totalAmount"
  );
  return (
    <View className="mt-1 mb-6 border border-accent rounded-xl p-2">
      {/* Header area - tap to toggle */}
      <TouchableOpacity
        onPress={toggleExpanded}
        activeOpacity={0.7}
        className="mt-1 mb-2 rounded-xl p-2 !bg-accent flex-row justify-between items-center"
      >
        <Text className="text-lg font-bold text-body">Order Summary</Text>
        <Text className="text-lg font-bold text-body">
          {GetCustomerCartInfo?.[totalField]
            ? `$${GetCustomerCartInfo[totalField].toFixed(2)}`
            : "$0.00"}
        </Text>
      </TouchableOpacity>

      {/* Expandable details */}
      {expanded && (
        <View className="space-y-1 mt-2">
          {GetCustomerCartInfo &&
            CustomerInfoSchema?.dashboardFormSchemaParameters
              .filter((i) => !i.isIDField)
              .map((i) => (
                <View
                  className="flex-row mt-2 items-center justify-between"
                  key={i.dashboardFormSchemaID}
                >
                  <Text className="text-md">{i.parameterTitel}</Text>
                  <Text className="text-md">
                    {GetCustomerCartInfo[i.parameterField]}
                  </Text>
                </View>
              ))}
        </View>
      )}
    </View>
  );
}
