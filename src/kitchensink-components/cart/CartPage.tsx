import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useLayoutEffect, useReducer, useState } from "react";
import {
  I18nManager,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { LocalizationContext } from "../../../context/LocalizationContext";
import SuggestCard from "../../components/cards/SuggestCard";
import GoBackHeader from "../../components/header/GoBackHeader";
import CardCartItem from "./CardCartItem";
import useFetch from "../../../components/hooks/APIsFunctions/useFetch";
import { GetProjectUrl, SetReoute } from "../../../request";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CustomerCartInfo from "./CustomerCartInfo";
import CartSchema from "../../Schemas/MenuSchema/CartSchema.json";
import CartSchemaActions from "../../Schemas/MenuSchema/CartSchemaActions.json";
import { WSMessageHandler } from "../../utils/WS/handleWSMessage";
import { ConnectToWS } from "../../utils/WS/ConnectToWS";
import InputWithAction from "../../utils/component/InputWithAction";
import { getField } from "../../utils/operation/getField";
import SuggestCardContainer from "../../utils/component/SuggestCardContainer";
import reducer from "../../components/Pagination/reducer";
import { initialState } from "../../components/Pagination/initialState";
import LoadData from "../../../components/hooks/APIsFunctions/LoadData";
import { updateRows } from "../../components/Pagination/updateRows";
import OldCartButton from "./OldCartButton";
import useWebSocketHandler from "../../utils/WS/useWebSocketHandler";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.totalAmount);
  const [reRequest, setReRequest] = useState(false);
  const [_WSsetMessage, setWSsetMessage] = useState("{}");
  const [WS_Connected, setWS_Connected] = useState(false);
  const cartLength = cart.length;
  const navigation = useNavigation();
  const { localization } = useContext(LocalizationContext);
  
  // Get schema parameters
  const parameters = CartSchema?.dashboardFormSchemaParameters ?? [];
  const fieldsType = {
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

  // Fetch old customer cart
  const { data: GetOldCustomerCart, isLoading } = useFetch("/ShopNode/GetOldCustomerCart", GetProjectUrl());
  const oldCartCount = GetOldCustomerCart?.count ?? 0;

  // Initialize reducer state
  const [state, reducerDispatch] = useReducer(
    reducer,
    initialState(10, CartSchema.idField)
  );

  // WebSocket setup


  // Load cart data
  useEffect(() => {
    const loadCartData = async () => {
      await LoadData(
        state,
        CartSchema.dataSourceName,
        CartSchemaActions,
        false, // cache flag
        updateRows(reducerDispatch, false, state),
        reducerDispatch,
        null, // no controller
        reRequest
      );
      setReRequest(false);
    };

    loadCartData();
  }, [reRequest]);

   useWebSocketHandler({
  WS_Connected,
  setWS_Connected,
  setWSsetMessage,
  _WSsetMessage,
  SetReoute,
  projectProxyRoute: CartSchema.projectProxyRoute,
  rows: state.rows,                // explicitly named param for clarity
  totalCount:total,
  fieldsType,
  reducerDispatch,
  dispatchType: "WS_OPE_ROW",
});

  const pressHandler = () => {
    navigation.navigate("Home");
  };

  // const oldCartButton = (
  //   <TouchableOpacity className="p-1">
  //     <View className="relative">
  //       <MaterialCommunityIcons
  //         name="clipboard-clock-outline"
  //         size={28}
  //         color="black"
  //       />
  //       {oldCartCount > 0 && (
  //         <View className={`absolute -top-1 -right-1 bg-red-500 rounded-full h-4 w-4 items-center justify-center ${
  //           I18nManager.isRTL ? "-left-1" : "-right-1"
  //         }`}>
  //           <Text className="text-white text-[10px] font-bold">
  //             {oldCartCount}
  //           </Text>
  //         </View>
  //       )}
  //     </View>
  //   </TouchableOpacity>
  // );

  return (
    <View className="flex-1 bg-body">
      {/* Header */}
      <GoBackHeader
        subTitle={localization.Hum_screens.cart.header.subTitle}
        title={localization.Hum_screens.cart.header.title}
        rightComponent={<OldCartButton
            projectUrl={GetProjectUrl()} 
            //onPress={() => navigation.navigate("OldCustomerCartScreen")} 
          />}
      />

      {/* Scrollable Content */}
      <ScrollView className="flex-1 py-2">
        {/* Cart Items */}
        {state.rows.length > 0 ? (
          state.rows.map((item) => (
            <View key={item[fieldsType.idField]}>
              <CardCartItem
                schemaActions={CartSchemaActions}
                fieldsType={fieldsType}
                item={item}
              />
            </View>
          ))
        ) : (
          <View className="flex-1 bg-body justify-center items-center">
            <Text className="font-semibold text-lg text-accent">
              {localization.Hum_screens.cart.emptyCart}
            </Text>
          </View>
        )}

        {/* Suggestions */}
        <View className="flex flex-row">
          <Text className="text-lg font-bold mt-6 items-start">
            {localization.Hum_screens.cart.suggests}
          </Text>
        </View>
        <SuggestCardContainer suggestContainerType={0} />

        {/* Special Request */}
        <View className="mt-4">
          <View className="items-start">
            <Text className="text-lg font-bold items-start">
              {localization.Hum_screens.cart.specialRequest}
            </Text>
          </View>
          <TextInput
            placeholder={localization.Hum_screens.cart.specialRequest + "?"}
            className={`mt-2 bg-card p-3 items-end rounded-lg text-sm border border-body ${
              I18nManager.isRTL ? "text-right" : "text-left"
            }`}
          />
        </View>

        {/* Voucher */}
        <View className="mt-4">
          <View className="items-start">
            <Text className="text-lg font-bold">
              {localization.Hum_screens.cart.saveOrder}
            </Text>
          </View>
          <InputWithAction
            placeholder={localization.Hum_screens.cart.saveOrderPlaceholder}
            submitButtonText={localization.Hum_screens.cart.submitButton}
          />
        </View>

        {/* Total price */}
        <View className="mt-4 mb-6">
          <View className="items-start">
            <Text className="text-lg font-bold">
              {localization.Hum_screens.cart.paymentSummary.title}
            </Text>
          </View>
          <CustomerCartInfo />
        </View>
      </ScrollView>

      {/* Footer (Static Buttons) */}
      <View className="flex-row items-center justify-between bg-body py-4 border-t border-card">
        <TouchableOpacity
          className="flex-1 bg-card py-3 mr-2 rounded-lg"
          onPress={pressHandler}
        >
          <Text className="text-center text-text">
            {localization.Hum_screens.cart.addItemsButton}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${
            cartLength < 1 ? "bg-card" : "bg-accent"
          } flex-1 py-3 rounded-lg`}
          disabled={cartLength < 1}
          onPress={() => navigation.navigate("CheckoutScreen")}
        >
          <Text className={`text-center ${
            cartLength < 1 ? "text-text" : "text-body"
          }`}>
            {localization.Hum_screens.cart.checkoutButton}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartPage;
