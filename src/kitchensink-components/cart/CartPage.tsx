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
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
// import { LocalizationContext } from "../../../context/LocalizationContext";
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
import ShippingOptions from "./ShippingOptions";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "../../../components/ui";
import { AntDesign } from "@expo/vector-icons";
import PrivacyCheckbox from "../../utils/component/PrivacyCheckbox";

const CartPage = () => {
  const [reRequest, setReRequest] = useState(false);
  const [_WSsetMessage, setWSsetMessage] = useState("{}");
  const [WS_Connected, setWS_Connected] = useState(false);
  const navigation = useNavigation();
  const localization = useSelector((state) => state.localization.localization);

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
    if (Platform.OS === "web") {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else {
      navigation.navigate("Home");
    }
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
  const BottomButtons = () => {
    return (
      <View className="flex-row items-center justify-between bg-body py-4 border-t border-card px-2">
        <TouchableOpacity
          className="flex-1 bg-card py-3 me-2 rounded-lg"
          onPress={pressHandler}
        >
          <Text className="text-center text-text">
            {localization.Hum_screens.cart.addItemsButton}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${
            cartRows.length < 1 ? "bg-card" : "bg-accent"
          } flex-1 py-3 rounded-lg`}
          disabled={cartRows.length < 1}
          onPress={() => navigation.navigate("CheckoutScreen")}
        >
          <Text
            className={`text-center ${
              cartRows.length < 1 ? "text-text" : "text-body"
            }`}
          >
            {localization.Hum_screens.cart.checkoutButton}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View className="flex-1 bg-body">
      <GoBackHeader
        title={localization.Hum_screens.cart.header.title}
        subTitle={localization.Hum_screens.cart.header.subTitle}
        rightComponent={<OldCartButton projectUrl={GetProjectUrl()} />}
      />

      {/* Main layout */}
      <ScrollView className="flex-1 py-2 px-2">
        <View className="w-full flex flex-col md:!flex-row gap-4">
          {/* LEFT COLUMN - CART + SUGGESTIONS */}

          {/* RIGHT COLUMN - PAYMENT */}
          <View className="flex-1 h-fit md:!order-5">
            {cartRows.length > 0 ? (
              cartRows.map((item) => (
                <View className="mb-2" key={item[cartFieldsType.idField]}>
                  <CardCartItem
                    schemaActions={CartSchemaActions}
                    fieldsType={cartFieldsType}
                    item={item}
                  />
                </View>
              ))
            ) : (
              <View className="items-center justify-center py-10">
                <Text className="font-semibold text-lg text-accent">
                  {localization.Hum_screens.cart.emptyCart}
                </Text>
              </View>
            )}

            {/* Suggestions */}
            <Text className="text-lg font-bold mt-6 mb-2">
              {localization.Hum_screens.cart.suggests}
            </Text>
            <SuggestCardContainer suggestContainerType={0} />
          </View>
          <View className="md:!w-[40%] lg:!w-[30%] md:!order-1">
            <PaymentMethods
              paymentMethods={[
                { id: "1", name: "Credit Card" },
                { id: "2", name: "PayPal" },
                { id: "3", name: "Cash on Delivery" },
              ]}
              selected={""}
              onSelect={(id) => {
                console.log("Payment method selected:", id);
              }}
              onAddPaymentMethod={() => {
                console.log("Add payment method");
              }}
            />

            {/* <ShippingOptions /> */}
            <PaymentOptions
              onApply={(options) => {
                console.log("User Payment Options:", options);
              }}
            />
            <View className="my-2">
              <PrivacyCheckbox />
            </View>

            <InvoiceSummary />
            <View className="md:flex hidden">
              <BottomButtons />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View className="md:hidden flex">
        <BottomButtons />
      </View>
    </View>
  );
};

export default CartPage;
