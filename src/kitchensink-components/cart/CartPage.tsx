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
import { GetProjectUrl } from "../../../request";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CustomerCartInfo from "./CustomerCartInfo";
import CartSchema from "../../Schemas/MenuSchema/CartSchema.json";
import CartSchemaActions from "../../Schemas/MenuSchema/CartSchemaActions.json";
import { handleWSMessage } from "../../utils/WS/handleWSMessage";
import { ConnectToWS } from "../../utils/WS/ConnectToWS";
import InputWithAction from "../../utils/component/InputWithAction";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.cart);
  const fieldsType = useSelector((state) => state.menuItem.fieldsType);
  const total = useSelector((state) => state.cart.totalAmount);
  const [reRequest, setReRequest] = useState(false);
  const [_WSsetMessage, setWSsetMessage] = useState("{}");
  const cartLength = cart.length;
  const navigation = useNavigation();
  const { localization } = useContext(LocalizationContext);
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
    console.log(ws_updatedRows);

    // await reducerDispatch({
    //   type: "WS_OPE_ROW",
    //   payload: {
    //     rows: ws_updatedRows.rows,
    //     totalCount: ws_updatedRows.totalCount,
    //   },
    // });
  };
  useEffect(() => {
    ConnectToWS(setWSsetMessage)
      .then(() => console.log("🔌 WebSocket setup done"))
      .catch((e) => console.error("❌ WebSocket setup error", e));
  }, []);
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
      <ScrollView className="flex-1  py-2">
        {cart.map((item) => (
          <CardCartItem
            schema={CartSchema}
            item={item}
            key={item[fieldsType.idField]}
            schemaActions={CartSchemaActions}
          />
        ))}
        <CardCartItem
          schemaActions={CartSchemaActions}
          schema={CartSchema}
          item={{
            canReturn: false,
            indexOflike: 0,

            cartItemID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            isActive: true,
            isAvailable: true,
            itemImage:
              "MenuItemImages\\34a706bf-8bf2-4c45-b660-c247ed177d84.jpg?v5/18/2025 12:09:21 PM?v5/18/2025 12:09:21 PM",
            keywords: "string,test",
            menuCategoryID: "b7d65f7f-f87a-4fa6-beaa-d799ba77b9ce",
            menuCategoryName: "Foods",
            menuItemDescription: "string",
            menuItemID: "00f6d641-84db-4937-9143-10667ac33442",
            menuItemName: "test",
            nodeAddress: null,
            nodeID: "2421d86a-0043-441b-988a-e7cfad6273a7",
            nodeMenuItemID: "5583d18b-7bff-4d91-aef8-2390a80972ae",
            node_Name: "MainNode",
            numberOfDislikes: 0,
            numberOfLikes: 8,
            numberOfOrders: 0,
            numberOfReviews: 0,
            preparingTimeAmountPerMinute: 0,
            price: 50,
            rate: 5,
            size: 0,
            sku: "",
            taxAmount: 0,
            taxTypeID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          }}
        />

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
        <ScrollView horizontal className="mt-2">
          {/* {suggestions.map((item) => ( */}
          <SuggestCard
            item={{
              canReturn: false,
              indexOflike: 0,
              isActive: true,
              isAvailable: true,
              itemImage:
                "MenuItemImages\\34a706bf-8bf2-4c45-b660-c247ed177d84.jpg?v5/18/2025 12:09:21 PM?v5/18/2025 12:09:21 PM",
              keywords: "string,test",
              menuCategoryID: "b7d65f7f-f87a-4fa6-beaa-d799ba77b9ce",
              menuCategoryName: "Foods",
              menuItemDescription: "string",
              menuItemID: "00f6d641-84db-4937-9143-10667ac33442",
              menuItemName: "test",
              nodeAddress: null,
              nodeID: "2421d86a-0043-441b-988a-e7cfad6273a7",
              nodeMenuItemID: "5583d18b-7bff-4d91-aef8-2390a80972ae",
              node_Name: "MainNode",
              numberOfDislikes: 0,
              numberOfLikes: 8,
              numberOfOrders: 0,
              numberOfReviews: 0,
              preparingTimeAmountPerMinute: 0,
              price: 50,
              rate: 5,
              size: 0,
              sku: "",
              taxAmount: 0,
              taxTypeID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            }}
          />
          {/* ))} */}
        </ScrollView>

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
