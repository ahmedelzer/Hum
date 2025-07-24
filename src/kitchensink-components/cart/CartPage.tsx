import { useNavigation } from "@react-navigation/native";
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
// import { LocalizationContext } from "../../../context/LocalizationContext";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import { useWS } from "../../../context/WSProvider";
import { GetProjectUrl, SetReoute } from "../../../request";
import CartSchema from "../../Schemas/MenuSchema/CartSchema.json";
import CartSchemaActions from "../../Schemas/MenuSchema/CartSchemaActions.json";
import { createRowCache } from "../../components/Pagination/createRowCache";
import { initialState } from "../../components/Pagination/initialState";
import reducer from "../../components/Pagination/reducer";
import GoBackHeader from "../../components/header/GoBackHeader";
import { ConnectToWS } from "../../utils/WS/ConnectToWS";
import { WSMessageHandler } from "../../utils/WS/handleWSMessage";
import AddressLocationCollapsible from "../../utils/component/AddressLocationCollapsible";
import PrivacyCheckbox from "../../utils/component/PrivacyCheckbox";
import SuggestCardContainer from "../../utils/component/SuggestCardContainer";
import { getField } from "../../utils/operation/getField";
import { isRTL } from "../../utils/operation/isRTL";
import { prepareLoad } from "../../utils/operation/loadHelpers";
import CardCartItem from "./CardCartItem";
import Checkout from "./Checkout";
import InvoiceSummary from "./InvoiceSummary";
import OldCartButton from "./OldCartButton";
import PaymentMethods from "./PaymentMethods";
import PaymentOptions from "./PaymentOptions";
import CartInfoSchemaAction from "../../Schemas/MenuSchema/CartInfoSchemaAction.json";
import { useNetwork } from "../../../context/NetworkContext";
import RecommendedSchemaActions from "../../Schemas/MenuSchema/RecommendedSchemaActions.json";
import { useCart } from "../../../context/CartProvider";
const ITEM_HEIGHT = 330;
const CartPage = () => {
  const [shownNodeMenuItemIDs, setShownNodeMenuItemIDs] = useState([]);
  const { cartState, cartReducerDispatch, cartFieldsType } = useCart();

  //const [_wsMessageCart, setWSMessageCart] = useState();
  const navigation = useNavigation();
  const localization = useSelector((state) => state.localization.localization);
  const [row, setRow] = useState({});
  const [checkoutFiring, setCheckoutFiring] = useState(false);
  // Get schema parameters
  ////cart
  const {
    rows: cartRows,
    totalCount: cartTotalCount,
    loading: cartLoading,
  } = cartState;
  // const [cart_WS_Connected, setCartWS_Connected] = useState(false);

  // const parameters = CartSchema?.dashboardFormSchemaParameters ?? [];

  // const cartFieldsType = {
  //   imageView: getField(parameters, "menuItemImage"),
  //   text: getField(parameters, "menuItemName"),
  //   description: getField(parameters, "menuItemDescription"),
  //   price: getField(parameters, "price"),
  //   rate: getField(parameters, "rate"),
  //   likes: getField(parameters, "likes"),
  //   dislikes: getField(parameters, "dislikes"),
  //   orders: getField(parameters, "orders"),
  //   reviews: getField(parameters, "reviews"),
  //   isAvailable: getField(parameters, "isAvailable"),
  //   nodeMenuItemID: getField(parameters, "nodeMenuItemID"),
  //   menuCategoryID: getField(parameters, "menuCategoryID"),
  //   idField: CartSchema.idField,
  //   dataSourceName: CartSchema.dataSourceName,
  //   cardAction: getField(parameters, "cardAction"),
  //   discount: getField(parameters, "discount"),
  //   priceAfterDiscount: getField(parameters, "priceAfterDiscount"),
  //   note: getField(parameters, "note"),
  //   proxyRoute: CartSchema.projectProxyRoute,
  // };

  // // 🌐 WebSocket connect effect
  // useEffect(() => {
  //   if (cart_WS_Connected) return;

  //   SetReoute(CartSchema.projectProxyRoute);
  //   let cleanup;
  //   ConnectToWS(setWSMessageCart, setCartWS_Connected)
  //     .then(() => console.log("🔌 Cart WebSocket connected"))
  //     .catch((e) => console.error("❌ Cart WebSocket error", e));
  //   return () => {
  //     if (cleanup) cleanup(); // Clean up when component unmounts or deps change
  //     console.log("🧹 Cleaned up WebSocket handler");
  //   };
  // }, [cart_WS_Connected, isOnline]);

  // // ✅ Callback to update reducer
  // const cartCallbackReducerUpdate = async (cart_ws_updatedRows) => {
  //   await cartReducerDispatch({
  //     type: "WS_OPE_ROW",
  //     payload: {
  //       rows: cart_ws_updatedRows.rows,
  //       totalCount: cart_ws_updatedRows.totalCount,
  //     },
  //   });
  // };

  // // 📨 WebSocket message handler
  // useEffect(() => {
  //   console.log("cart ws");
  //   if (!_wsMessageCart) return;

  //   const handlerCartWSMessage = new WSMessageHandler({
  //     _WSsetMessage: _wsMessageCart, // match param name
  //     fieldsType: cartFieldsType,
  //     rows: cartRows,
  //     totalCount: cartTotalCount,
  //     callbackReducerUpdate: cartCallbackReducerUpdate,
  //   });
  //   handlerCartWSMessage.process();
  // }, [_wsMessageCart, cartState.rows]);

  // const cartDataSourceAPI = (query, skip, take) => {
  //   SetReoute(CartSchema.projectProxyRoute);
  //   return buildApiUrl(query, {
  //     pageIndex: skip + 1,
  //     pageSize: take,
  //     // ...row,
  //   });
  // };
  // const getCustomerCartAction =
  //   CartSchemaActions &&
  //   CartSchemaActions.find(
  //     (action) => action.dashboardFormActionMethodType === "Get"
  //   );
  // const reduxSelectedLocation = useSelector(
  //   (state: any) => state.location?.selectedLocation
  // );
  // const reduxSelectedNode = useSelector(
  //   (state: any) => state.location?.selectedNode
  // );

  // const [selectedLocation, setSelectedLocation] = useState(
  //   reduxSelectedLocation || null
  // );
  // const [selectedNode, setSelectedNode] = useState(reduxSelectedNode || null);
  // const loadData = useCallback(() => {
  //   prepareLoad({
  //     state: cartState,
  //     dataSourceAPI: cartDataSourceAPI,
  //     getAction: getCustomerCartAction,
  //     cache: createRowCache(4000),
  //     reducerDispatch: cartReducerDispatch,
  //     abortController: false,
  //     reRequest: true,
  //   });
  // }, [
  //   cartDataSourceAPI,
  //   getCustomerCartAction,
  //   cartReducerDispatch,
  //   cartState,
  //   selectedNode,
  // ]);
  // useEffect(() => {
  //   if (isOnline) {
  //     resetAndReload(); // Reload only when back online
  //   }
  // }, [isOnline]);

  // const resetAndReload = useCallback(() => {
  //   cartReducerDispatch({
  //     type: "RESET_QUERY",
  //     payload: { lastQuery: "" },
  //   });
  //   setTimeout(() => {
  //     loadData();
  //   }, 0);
  // }, [loadData]);
  //////////!end
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
  const postCheckoutAction =
    CartInfoSchemaAction &&
    CartInfoSchemaAction.find(
      (action) => action.dashboardFormActionMethodType === "Post"
    );
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
          onPress={() => setCheckoutFiring(true)}
        >
          <Text
            className={`text-center ${
              cartRows.length < 1 ? "text-text" : "text-body"
            }`}
          >
            {localization.Hum_screens.cart.checkoutButton}
          </Text>
        </TouchableOpacity>
        {checkoutFiring && (
          <Checkout
            postAction={postCheckoutAction}
            setCheckoutFiring={setCheckoutFiring}
            proxyRoute={cartFieldsType.proxyRoute}
            row={row}
          />
        )}
      </View>
    );
  };
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const visibleHeight = event.nativeEvent.layoutMeasurement.height;

    const startIndex = Math.floor(offsetY / ITEM_HEIGHT);
    const endIndex = Math.min(
      cartRows.length - 1,
      Math.floor((offsetY + visibleHeight) / ITEM_HEIGHT)
    );

    const currentlyVisible = cartRows.slice(startIndex, endIndex + 1);
    console.log(
      currentlyVisible.map((item) => item[cartFieldsType.nodeMenuItemID]),
      "setShownNodeMenuItemIDs"
    );

    setShownNodeMenuItemIDs(
      currentlyVisible.map((item) => item[cartFieldsType.nodeMenuItemID])
    );
  };
  useEffect(() => {
    if (shownNodeMenuItemIDs.length === 0 && cartRows.length > 0) {
      setShownNodeMenuItemIDs([cartRows[0][cartFieldsType.nodeMenuItemID]]);
    }
  }, [shownNodeMenuItemIDs, cartRows]);
  console.log("rootRow", row);

  return (
    <View className="flex-1 bg-body">
      <GoBackHeader
        title={localization.Hum_screens.cart.header.title}
        subTitle={localization.Hum_screens.cart.header.subTitle}
        rightComponent={<OldCartButton projectUrl={GetProjectUrl()} />}
      />

      {/* Main layout

      <GoBackHeader
        title={localization.Hum_screens.cart.header.title}
        subTitle={localization.Hum_screens.cart.header.subTitle}
        rightComponent={<OldCartButton projectUrl={GetProjectUrl()} />}
      />
      */}
      <ScrollView className="flex-1 py-2 px-2">
        <View className="w-full flex flex-col md:!flex-row gap-4">
          {/* LEFT COLUMN - CART + SUGGESTIONS */}

          {/* RIGHT COLUMN - PAYMENT */}
          <View className="flex-1 md:!order-5">
            <ScrollView
              showsVerticalScrollIndicator={false}
              onScroll={handleScroll}
            >
              <View className="overflow-y-auto" style={{ maxHeight: 690 }}>
                {cartRows.length > 0 ? (
                  cartRows.map((item, index) => {
                    return (
                      <View className="mb-2" key={item[cartFieldsType.idField]}>
                        <CardCartItem
                          schemaActions={CartSchemaActions}
                          fieldsType={cartFieldsType}
                          item={item}
                        />
                      </View>
                    );
                  })
                ) : (
                  <View className="items-center justify-center py-10">
                    <Text className="font-semibold text-lg text-accent">
                      {localization.Hum_screens.cart.emptyCart}
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>

            {/* Suggestions */}
            <View>
              <Text
                className="text-lg font-bold mt-6 mb-2"
                style={{ direction: isRTL() ? "rtl" : "ltr" }}
              >
                {localization.Hum_screens.cart.suggests}
              </Text>

              <SuggestCardContainer
                suggestContainerType={0}
                schemaActions={RecommendedSchemaActions}
                shownNodeMenuItemIDs={shownNodeMenuItemIDs}
              />
            </View>
          </View>
          <View className="md:!w-[40%] lg:!w-[30%] md:!order-1">
            <View>
              <AddressLocationCollapsible />
            </View>
            <PaymentMethods
              row={row}
              setRow={setRow}
              paymentMethods={[
                { id: "1", name: "Credit Card" },
                { id: "2", name: "PayPal" },
                { id: "3", name: "Cash on Delivery" },
              ]}
              selected={""}
              onSelect={(id) => {}}
              onAddPaymentMethod={() => {}}
            />

            {/* <ShippingOptions /> */}
            <PaymentOptions rootRow={row} setRootRow={setRow} />
            <View className="my-2">
              <PrivacyCheckbox row={row} setRow={setRow} />
            </View>

            <InvoiceSummary row={row} setRow={setRow} />
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
