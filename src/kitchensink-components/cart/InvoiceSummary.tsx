import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { WSMessageHandler } from "../../utils/WS/handleWSMessage";
import { SetReoute } from "../../../request";
import { ConnectToWS } from "../../utils/WS/ConnectToWS";
import { getField } from "../../utils/operation/getField";
import CartInfoSchemaAction from "../../Schemas/MenuSchema/CartInfoSchemaAction.json";
import CustomerInfoSchema from "../../Schemas/MenuSchema/CartInfoSchema.json";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import useFetchWithoutBaseUrl from "../../../components/hooks/APIsFunctions/UseFetchWithoutBaseUrl";
import { useWS } from "../../../context/WSProvider";
import { isRTL } from "../../utils/operation/isRTL";
// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function InvoiceSummary({ row, setRow }) {
  const [expanded, setExpanded] = useState(true);
  const [cartInfo, setCartInfo] = useState({});
  const { _wsMessageCart, setWSMessageCart } = useWS();
  const [cartInfo_WS_Connected, setCartInfoWS_Connected] = useState(false);
  const localization = useSelector((state) => state.localization.localization);

  const cartInfoDataSourceAPI = (query) => {
    SetReoute(CustomerInfoSchema.projectProxyRoute);
    return buildApiUrl(query);
  };

  const getCustomerCartAction = CartInfoSchemaAction?.find(
    (action) => action.dashboardFormActionMethodType === "Get"
  );

  const { data: GetCustomerCartInfo, isLoading } = useFetchWithoutBaseUrl(
    cartInfoDataSourceAPI(getCustomerCartAction)
  );

  useEffect(() => {
    if (!isLoading && GetCustomerCartInfo) {
      setCartInfo(GetCustomerCartInfo);
    }
  }, [isLoading, GetCustomerCartInfo]);

  const params = CustomerInfoSchema?.dashboardFormSchemaParameters ?? [];

  const cartInfoFieldsType = {
    idField: CustomerInfoSchema.idField,
    dataSourceName: CustomerInfoSchema.dataSourceName,
    proxyRoute: CustomerInfoSchema.projectProxyRoute,
    totalAmount: getField(params, "totalAmount", false),
    invoiceItemsTaxAmount: getField(params, "invoiceItemsTaxAmount", false),
    invoiceTaxAmount: getField(params, "invoiceTaxAmount", false),
    totalFeesAmount: getField(params, "totalFeesAmount", false),
    feesAmount: getField(params, "feesAmount", false),
    netAmount: getField(params, "netAmount", false),
    invoiceItemsDiscountAmount: getField(
      params,
      "invoiceItemsDiscountAmount",
      false
    ),
    invoiceDiscountAmount: getField(params, "invoiceDiscountAmount", false),
    totalDiscountAmount: getField(params, "totalDiscountAmount", false),
    totalTaxAmount: getField(params, "totalTaxAmount", false),
    totalShipmentsNeeded: getField(params, "totalShipmentsNeeded", false),
    shipmentFees: getField(params, "shipmentFees", false),
    otherFees: getField(params, "otherFees", false),
  };

  // 🌐 WebSocket connect effect
  useEffect(() => {
    if (cartInfo_WS_Connected) return;

    SetReoute(CustomerInfoSchema.projectProxyRoute);

    ConnectToWS(setWSMessageCart, setCartInfoWS_Connected)
      .then(() => console.log("🔌 Cart WebSocket connected"))
      .catch((e) => console.error("❌ Cart WebSocket error", e));
  }, [cartInfo_WS_Connected]);

  // ✅ Callback to update reducer
  const cartCallbackReducerUpdate = async (cartInfo_ws_updatedRows) => {
    console.log(cartInfo_ws_updatedRows, "cartInfo_ws_updatedRows");

    setCartInfo(cartInfo_ws_updatedRows.rows[0]);
  };

  // 📨 WebSocket message handler
  useEffect(() => {
    if (!_wsMessageCart) return;

    const handlerCartWSMessage = new WSMessageHandler({
      _WSsetMessage: _wsMessageCart,
      fieldsType: cartInfoFieldsType,
      rows: [cartInfo],
      totalCount: 0,
      callbackReducerUpdate: cartCallbackReducerUpdate,
    });
    handlerCartWSMessage.process();
  }, [_wsMessageCart]);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const getValue = (field) => {
    if (field.parameterField) {
      return cartInfo?.[field.parameterField];
    }
    return 0;
  };

  const isPositive = (value) => (value > 0 ? true : false);
  console.log(cartInfo, cartInfoFieldsType);
  useEffect(() => {
    setRow({ ...row, ...cartInfo });
  }, [cartInfo]);
  return (
    <View className="mt-1 mb-6 border border-accent rounded-xl p-2">
      {/* Expandable Section */}
      {expanded && (
        <View className="space-y-1 mt-2 p-4">
          {/* Total Amount */}
          {cartInfoFieldsType.totalAmount && (
            <SummaryLine
              label={cartInfoFieldsType.totalAmount.parameterTitel}
              value={getValue(cartInfoFieldsType.totalAmount)}
            />
          )}
          <View className="border-b border-gray-300 my-2" />

          {/* Discounts */}
          {cartInfoFieldsType.totalDiscountAmount &&
            isPositive(getValue(cartInfoFieldsType.totalDiscountAmount)) && (
              <View>
                <Text className="font-bold text-base mb-1">
                  {localization.Hum_screens.cart.paymentSummary.discounts}:
                </Text>
                {getValue(cartInfoFieldsType.invoiceDiscountAmount) >= 0 && (
                  <SummaryLine
                    label={
                      cartInfoFieldsType.invoiceDiscountAmount.parameterTitel
                    }
                    setDash={true}
                    value={getValue(cartInfoFieldsType.invoiceDiscountAmount)}
                  />
                )}
                {getValue(cartInfoFieldsType.invoiceItemsDiscountAmount) >=
                  0 && (
                  <SummaryLine
                    label={
                      cartInfoFieldsType.invoiceItemsDiscountAmount
                        .parameterTitel
                    }
                    setDash={true}
                    value={getValue(
                      cartInfoFieldsType.invoiceItemsDiscountAmount
                    )}
                  />
                )}
                <View className="flex-row justify-between py-2">
                  <Text className="font-bold">
                    ➤ {cartInfoFieldsType.totalDiscountAmount.parameterTitel}
                  </Text>
                  <Text className="font-bold" style={{ color: "#16a34a" }}>
                    {localization.menu.currency}{" "}
                    {getValue(cartInfoFieldsType.totalDiscountAmount)}
                  </Text>
                </View>
                <View className="border-b border-gray-300 my-2" />
              </View>
            )}
          {/* totalTaxAmount */}
          {cartInfoFieldsType.totalTaxAmount &&
            isPositive(getValue(cartInfoFieldsType.totalTaxAmount)) && (
              <View>
                <Text className="font-bold text-base mb-1">
                  {localization.Hum_screens.cart.paymentSummary.taxes}:
                </Text>
                {getValue(cartInfoFieldsType.invoiceTaxAmount) >= 0 && (
                  <SummaryLine
                    label={cartInfoFieldsType.invoiceTaxAmount.parameterTitel}
                    setDash={true}
                    value={getValue(cartInfoFieldsType.invoiceTaxAmount)}
                  />
                )}
                {getValue(cartInfoFieldsType.invoiceItemsTaxAmount) >= 0 && (
                  <SummaryLine
                    label={
                      cartInfoFieldsType.invoiceItemsTaxAmount.parameterTitel
                    }
                    setDash={true}
                    value={getValue(cartInfoFieldsType.invoiceItemsTaxAmount)}
                  />
                )}
                <View className="flex-row justify-between py-2">
                  <Text className="font-bold">
                    ➤ {cartInfoFieldsType.totalTaxAmount.parameterTitel}
                  </Text>
                  <Text className="font-bold" style={{ color: "#dc2626" }}>
                    {localization.menu.currency}{" "}
                    {getValue(cartInfoFieldsType.totalTaxAmount)}
                  </Text>
                </View>
                <View className="border-b border-gray-300 my-2" />
              </View>
            )}
          {/* totalFeesAmount */}
          {cartInfoFieldsType.totalFeesAmount &&
            isPositive(getValue(cartInfoFieldsType.totalFeesAmount)) && (
              <View>
                <Text className="font-bold text-base mb-1">
                  {localization.Hum_screens.cart.paymentSummary.fees}:
                </Text>
                {getValue(cartInfoFieldsType.feesAmount) >= 0 && (
                  <SummaryLine
                    label={cartInfoFieldsType.feesAmount.parameterTitel}
                    setDash={true}
                    value={getValue(cartInfoFieldsType.feesAmount)}
                  />
                )}
                {getValue(cartInfoFieldsType.shipmentFees) >= 0 && (
                  <SummaryLine
                    label={cartInfoFieldsType.shipmentFees.parameterTitel}
                    setDash={true}
                    value={getValue(cartInfoFieldsType.shipmentFees)}
                  />
                )}
                <View className="flex-row justify-between py-2">
                  <Text className="font-bold">
                    ➤ {cartInfoFieldsType.totalFeesAmount.parameterTitel}
                  </Text>
                  <Text className="font-bold">
                    {localization.menu.currency}{" "}
                    {getValue(cartInfoFieldsType.totalFeesAmount)}
                  </Text>
                </View>
                <View className="border-b border-gray-300 my-2" />
              </View>
            )}
          {/* Final Total */}
          {/* <View className="flex-row justify-between items-center bg-yellow-100 py-3 px-2 border !border-yellow-400 mt-2">
            <Text className="font-bold text-lg">
              🟧 {cartInfoFieldsType.netAmount.parameterTitel}:
            </Text>
            <Text className="font-bold text-lg">
              {localization.menu.currency}{" "}
              {getValue(cartInfoFieldsType.netAmount)}
            </Text>
          </View> */}
        </View>
      )}
      <TouchableOpacity
        onPress={toggleExpanded}
        activeOpacity={0.7}
        className="mt-1 mb-2 rounded-xl p-2 !bg-accent flex-row justify-between items-center"
      >
        <Text className="text-lg font-bold text-body">
          {CustomerInfoSchema.dashboardFormSchemaInfoDTOView.schemaHeader}
        </Text>
        <Text
          className="text-lg font-bold text-body"
          key={`${cartInfoFieldsType.netAmount.parameterField}-${getValue(cartInfoFieldsType.netAmount)}`}
        >
          {localization.menu.currency}{" "}
          {Number(getValue(cartInfoFieldsType.netAmount)).toFixed(2) || "0.00"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const SummaryLine = ({ label, value, setDash = false }) => {
  const localization = useSelector((state) => state.localization.localization);
  const dash = setDash && "-";
  return (
    <View className="flex-row justify-between py-2">
      <Text className="text-base">
        {dash}
        {label}:
      </Text>
      <Text className="text-base">
        {localization.menu.currency} {value}
      </Text>
    </View>
  );
};
