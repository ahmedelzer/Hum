import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
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
import { handleWSMessage } from "../../utils/WS/handleWSMessage";
import { ConnectToWS } from "../../utils/WS/ConnectToWS";
import InputWithAction from "../../utils/component/InputWithAction";
import { getField } from "../../utils/operation/getField";
import SuggestCardContainer from "../../utils/component/SuggestCardContainer";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.totalAmount);
  const [reRequest, setReRequest] = useState(false);
  const [_WSsetMessage, setWSsetMessage] = useState("{}");
  const [WS_Connected, setWS_Connected] = useState(false);
  const cartLength = cart.length;
  const navigation = useNavigation();
  const { localization } = useContext(LocalizationContext);
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
  // SetReoute(NodeMenuItemsSchema.projectProxyRoute);
  const {
    data: GetOldCustomerCart,
    error,
    isLoading,
  } = useFetch("/ShopNode/GetOldCustomerCart", GetProjectUrl());
  const suggestions = [
    {
      id: 1,
      name: "Ketchup Packets Ketchup Packets",
      price: "EGP 1.00",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Bun",
      price: "EGP 5.00",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "Pepsi",
      price: "EGP 32.00",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      name: "Diet Pepsi",
      price: "EGP 32.00",
      image: "https://via.placeholder.com/50",
    },
  ];
  const pressHandler = () => {
    navigation.navigate("Home");
  };
  const oldCartCount = GetOldCustomerCart?.count ?? 0;
  const callbackReducerUpdate = async (ws_updatedRows) => {
    console.log(ws_updatedRows, "callbackReducerUpdate form cart");

    // await reducerDispatch({
    //   type: "WS_OPE_ROW",
    //   payload: {
    //     rows: ws_updatedRows.rows,
    //     totalCount: ws_updatedRows.totalCount,
    //   },
    // });
  };
  useEffect(() => {
    if (WS_Connected) return;
    SetReoute(CartSchema.projectProxyRoute);
    ConnectToWS(setWSsetMessage, setWS_Connected)
      .then(() => console.log("🔌 WebSocket setup done"))
      .catch((e) => console.error("❌ WebSocket setup error", e));
  }, [WS_Connected]);
  useEffect(() => {
    handleWSMessage({
      _WSsetMessage,
      fieldsType,
      cart,
      cartLength,
      callbackReducerUpdate,
    });
  }, [_WSsetMessage]);
  const oldCartButton = (
    <TouchableOpacity
      // onPress={() => navigation.navigate("OldCustomerCartScreen")}
      className="p-1"
    >
      <View className="relative">
        <MaterialCommunityIcons
          name="clipboard-clock-outline"
          size={28}
          color="black"
        />
        {oldCartCount > 0 && (
          <View
            className={
              "absolute -top-1 -right-1 bg-red-500 rounded-full h-4 w-4 items-center justify-center " +
              `${I18nManager.isRTL ? "-left-1" : "-right-1"}`
            }
          >
            <Text className="text-white text-[10px] font-bold">
              {oldCartCount}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
  return (
    <View className="flex-1 bg-body">
      {/* Header */}
      <GoBackHeader
        subTitle={localization.Hum_screens.cart.header.subTitle}
        title={localization.Hum_screens.cart.header.title}
        rightComponent={oldCartButton}
      />

      {/* Scrollable Content */}
      <ScrollView className=" flex-1  py-2">
        <View>
          <CardCartItem
            schemaActions={CartSchemaActions}
            fieldsType={fieldsType}
            item={{
              canReturn: true,
              quantity: 2,
              discount: 15,
              heightCm: 0,
              indexOflike: 0,
              isActive: true,
              isAvailable: true,
              itemImage:
                "MenuItemImages\\34a706bf-8bf2-4c45-b660-c247ed177d99.jpg?v5/22/2025 12:12:13 PM?v5/22/2025 12:12:13 PM",
              keywords: "wee,apples12",
              lengthCm: 0,
              menuCategoryID: "b7d65f7f-f87a-4fa6-beaa-d799ba77b9ce",
              menuCategoryName: "طعام",
              menuItemDescription: "rtr",
              menuItemID: "f348161f-905a-4d78-af2f-068bd35599b5",
              menuItemName: "apples12",
              nodeAddress: null,
              nodeID: "2421d86a-0043-441b-988a-e7cfad6273a7",
              nodeMenuItemID: "b30ca2db-6662-4c70-9858-ab7d6bcae6e8",
              node_Name: "MainNode",
              numberOfDislikes: 0,
              numberOfLikes: 47,
              numberOfOrders: 0,
              numberOfReviews: 0,
              packageDegree: 0,
              preparingTimeAmountPerMinute: 0,
              price: 5,
              priceAfterDiscount: 4,
              rate: 5,
              size: 0,
              sku: "",
              taxAmount: 0,
              taxTypeID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              volume: 0,
              weightKg: 0,
              widthCm: 0,
            }}
          />
        </View>

        {cartLength < 1 && (
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
        <SuggestCardContainer />

        {/* Special Request */}
        <View className="mt-4">
          <View className="items-start">
            <Text className="text-lg font-bold items-start">
              {localization.Hum_screens.cart.specialRequest}
            </Text>
          </View>
          <TextInput
            placeholder={localization.Hum_screens.cart.specialRequest + "?"}
            className={
              "mt-2 bg-card p-3 items-end rounded-lg text-sm border border-body " +
              `${I18nManager.isRTL ? "text-right" : "text-left"}`
            }
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
        {/* total price */}
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
            cartLength < 1 && "bg-card "
          } flex-1 bg-accent py-3 rounded-lg`}
          disabled={cartLength < 1 ? true : false}
          onPress={() => navigation.navigate("CheckoutScreen")}
        >
          <Text className="text-center text-body">
            {localization.Hum_screens.cart.checkoutButton}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartPage;
