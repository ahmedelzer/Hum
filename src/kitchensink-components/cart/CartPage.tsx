import { useNavigation } from "@react-navigation/native";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";
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
import { prepareLoad } from "../../utils/operation/loadHelpers";
import { createRowCache } from "../../components/Pagination/createRowCache";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import InvoiceSummary from "./InvoiceSummary";
import PaymentMethods from "./PaymentMethods";
import PaymentOptions from "./PaymentOptions";
import { CollapsibleSection } from "../../utils/component/Collapsible";

const CartPage = () => {
  const [reRequest, setReRequest] = useState(false);
  const [_WSsetMessage, setWSsetMessage] = useState("{}");
  const [WS_Connected, setWS_Connected] = useState(false);
  const navigation = useNavigation();
  const { localization } = useContext(LocalizationContext);
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
  // useEffect(() => {
  //   if (!cartState.rows ) return;
  //   if (!_WSsetMessage) return;

  // const handlerCartWSMessage = new WSMessageHandler({
  //     _WSsetMessage, // match param name
  //     fieldsType: cartFieldsType,
  //     rows: cartRows,
  //     totalCount: cartTotalCount,
  //     callbackReducerUpdate: cartCallbackReducerUpdate,
  //   });
  //  handlerCartWSMessage.process();
  // }, [_WSsetMessage, cartState.rows]);

  const cartDataSourceAPI = (query, skip, take) => {
    SetReoute(CartSchema.projectProxyRoute);
    return buildApiUrl(query, {
      pageIndex: skip + 1,
      pageSize: take,
      // ...row,
    });
  };
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
  const [selectedNode, setSelectedNode] = useState(reduxSelectedNode || null);

  useEffect(() => {
    SetReoute(CartSchema.projectProxyRoute);
    prepareLoad({
      state: cartState,
      dataSourceAPI: cartDataSourceAPI,
      getAction: getCustomerCartAction,
      cache: createRowCache(4000),
      reducerDispatch: cartReducerDispatch,
    });
  }, [selectedLocation, selectedNode]);

  // Fetch old customer cart
  //const { data: GetOldCustomerCart, isLoading } = useFetch("/ShopNode/GetOldCustomerCart", GetProjectUrl());
  //const oldCartCount = GetOldCustomerCart?.count ?? 0;

  // Initialize reducer state
  // const [state, reducerDispatch] = useReducer(
  //   reducer,
  //   initialState(10, CartSchema.idField)
  // );

  // // WebSocket setup

  // // Load cart data
  // useEffect(() => {
  //   const loadCartData = async () => {
  //     await LoadData(
  //       state,
  //       CartSchema.dataSourceName,
  //       CartSchemaActions,
  //       false, // cache flag
  //       updateRows(reducerDispatch, false, state),
  //       reducerDispatch,
  //       null, // no controller
  //       reRequest
  //     );
  //     setReRequest(false);
  //   };

  //   loadCartData();
  // }, [reRequest]);

  const pressHandler = () => {
    console.log("back");
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
  const initRows = [
    {
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
    },
  ];
  return (
    <View className="flex-1 bg-body">
      {/* Header */}
      <GoBackHeader
        subTitle={localization.Hum_screens.cart.header.subTitle}
        title={localization.Hum_screens.cart.header.title}
        rightComponent={
          <OldCartButton
            projectUrl={GetProjectUrl()}
            //onPress={() => navigation.navigate("OldCustomerCartScreen")}
          />
        }
      />

      {/* Scrollable Content */}
      <ScrollView className="flex-1 py-2">
        {/* Cart Items */}
        {initRows.length > 0 ? (
          initRows.map((item) => (
            <View className="mb-1" key={item[cartFieldsType.idField]}>
              <CardCartItem
                schemaActions={CartSchemaActions}
                fieldsType={cartFieldsType}
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
      </ScrollView>
      <View>
        <PaymentMethods
          paymentMethods={[
            { id: "1", name: "Credit Card" },
            { id: "2", name: "PayPal" },
            { id: "3", name: "Cash on Delivery" },
          ]}
          selected={""}
          onSelect={(id) => {
            console.log("test");
          }}
          onAddPaymentMethod={() => {
            // Open another modal or form to add a method
          }}
        />
        <PaymentOptions
          onApply={(options) => {
            console.log("User Payment Options:", options);
            // Submit to API or apply to cart
          }}
        />
        <InvoiceSummary cartInfo={{}} title="test" />
      </View>

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
            cartState < 1 ? "bg-card" : "bg-accent"
          } flex-1 py-3 rounded-lg`}
          disabled={cartState < 1}
          onPress={() => navigation.navigate("CheckoutScreen")}
        >
          <Text
            className={`text-center ${
              cartState < 1 ? "text-text" : "text-body"
            }`}
          >
            {localization.Hum_screens.cart.checkoutButton}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartPage;
