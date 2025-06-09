import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { ScrollView, View } from "react-native";

import { initialState } from "../Pagination/initialState";
import reducer from "../Pagination/reducer";
import MenuCardView from "./MenuCardView";
// import { createRowCache } from "@devexpress/dx-react-grid";
import { useNavigation } from "@react-navigation/native";
import ActionBar from "../cards/ActionBar";
import HeaderParent from "../header/HeaderParent";
// import { createRowCache } from "../Pagination/createRowCache";
import { Chase } from "react-native-animated-spinkit";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import LoadData from "../../../components/hooks/APIsFunctions/LoadData";
import { SetReoute } from "../../../request";
import CartSchemaActions from "../../Schemas/MenuSchema/CartSchemaActions.json";
import NodeMenuItemsSchema from "../../Schemas/MenuSchema/NodeMenuItemsSchema.json";
import NodeMenuItemsSchemaActions from "../../Schemas/MenuSchema/NodeMenuItemsSchemaActions.json";
import { createRowCache } from "../Pagination/createRowCache";
import { getRemoteRows } from "../Pagination/getRemoteRows";
import SuggestCardContainer from "../../utils/component/SuggestCardContainer";
import { ActivityIndicator } from "react-native";
import { prepareLoad } from "../../utils/operation/loadHelpers";
import { useSelector } from "react-redux";
import { WSMessageHandler } from "../../utils/WS/handleWSMessage";
import { ConnectToWS } from "../../utils/WS/ConnectToWS";
import CartSchema from "../../Schemas/MenuSchema/CartSchema.json";
import { getField } from "../../utils/operation/getField";
import { getItemPackage } from "./getItemPackage";
import SkeletonWrapper from "../../utils/component/SkeletonLoading";
import SkeletonLayout from "../cards/SkeletonLayout";
import StarRatingInput from "../../utils/component/StarRatingInput";
import { Text } from "react-native";
import AnimatedStarRatingInput from "../../utils/component/StarRatingInput";
const VIRTUAL_PAGE_SIZE = 4;

const MenuCardsView = ({ row, isRefreshed }: any) => {
  const navigation = useNavigation();
  const [reRequest, setReRequest] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [_WSsetMessage, setWSsetMessage] = useState("{}");
  const [WS_Connected, setWS_Connected] = useState(false);
  const previousRowRef = useRef({});
  const fieldsType = useSelector((state: any) => state.menuItem.fieldsType);
  // const selectedNode = selectSelectedNode(store.getState());
  // Add this ref:
  const previousControllerRef = useRef(null);
  // const WS_prams={
  //   dataSourceNames:[
  //     fieldsType.dataSourceName,
  //     CustomerInfoSchema.dataSourceName,
  //     CartSchema.dataSourceName,
  //   ],
  //   rows:
  // }
  const [state, reducerDispatch] = useReducer(
    reducer,
    initialState(10, NodeMenuItemsSchema.idField)
  );
  const [currentSkip, setCurrentSkip] = useState(1);
  const dataSourceAPI = (query, skip, take) => {
    SetReoute(NodeMenuItemsSchema.projectProxyRoute);
    return buildApiUrl(query, {
      pageIndex: skip + 1,
      pageSize: take,
      ...row,
    });
  };
  const cache = createRowCache(VIRTUAL_PAGE_SIZE);
  const getAction =
    NodeMenuItemsSchemaActions &&
    NodeMenuItemsSchemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Get"
    );

  const { rows, skip, totalCount, loading } = state;

  useEffect(() => {
    const controller = new AbortController();

    prepareLoad({
      state,
      dataSourceAPI,
      getAction,
      cache,
      reducerDispatch,
    });
    setReRequest(false);
    previousControllerRef.current = controller;
    // Call LoadData with the controller
  });
  // 🌐 Setup WebSocket connection on mount or WS_Connected change
  useEffect(() => {
    if (WS_Connected) return;

    SetReoute(NodeMenuItemsSchema.projectProxyRoute);

    ConnectToWS(setWSsetMessage, setWS_Connected)
      .then(() => console.log("🔌 WebSocket setup done"))
      .catch((e) => console.error("❌ WebSocket setup error", e));
  }, [WS_Connected]);

  // 🧠 Reducer callback to update rows
  const callbackReducerUpdate = async (ws_updatedRows) => {
    await reducerDispatch({
      type: "WS_OPE_ROW",
      payload: {
        rows: ws_updatedRows.rows,
        totalCount: ws_updatedRows.totalCount,
      },
    });
  };

  // 📨 React to WebSocket messages only when valid
  useEffect(() => {
    if (!rows) return;
    if (!_WSsetMessage) return;
    const _handleWSMessage = new WSMessageHandler({
      _WSsetMessage,
      fieldsType,
      rows,
      totalCount,
      callbackReducerUpdate,
    });
    _handleWSMessage.process();
  }, [_WSsetMessage]);

  ////cart
  const [cartState, cartReducerDispatch] = useReducer(
    reducer,
    initialState(10, CartSchema.idField)
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

  useEffect(() => {
    if (!row) return;

    const prevRow = previousRowRef.current || {};
    const changedProps = Object.keys(row).filter(
      (key) => row[key] !== prevRow[key]
    );

    const changedKey = changedProps.length === 1 ? changedProps[0] : null;

    // Abort previous request only if same key changed
    if (
      changedKey &&
      previousControllerRef.current &&
      Object.keys(previousRowRef.current).length > 0
    ) {
      previousControllerRef.current.abort();
    }

    // Save current row for next comparison
    previousRowRef.current = row;

    // Reset list and pagination
    reducerDispatch({ type: "RESET_SERVICE_LIST" });
    setCurrentSkip(1);
  }, [row]);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isScrolledToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isScrolledToBottom && rows.length < totalCount && !loading) {
      getRemoteRows(currentSkip, VIRTUAL_PAGE_SIZE * 2, reducerDispatch); //todo change dispatch by reducerDispatch
      setCurrentSkip(currentSkip + 1);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () =>
        selectedItems.length > 0 ? (
          <ActionBar
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        ) : (
          <HeaderParent />
        ),
    });
  }, [selectedItems, navigation]);
  const [rating, setRating] = useState(0);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {rows?.map((item: any, index: number) => (
        <View key={`${item[NodeMenuItemsSchema.idField]}-${index}`}>
          <MenuCardView
            itemPackage={getItemPackage(
              item,
              cartState.rows,
              NodeMenuItemsSchema
            )}
            schemaActions={CartSchemaActions}
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
          />

          {/* Insert suggestion every 2 items */}
          {(index + 1) % 2 === 0 && (
            <View style={{ marginVertical: 10 }}>
              <SuggestCardContainer suggestContainerType={0} />
            </View>
          )}
        </View>
      ))}

      {loading && (
        // <View style={{ padding: 20 }}>
        //   <ActivityIndicator size="small" color="black" />
        // </View>
        <MenuItemSkeltonLoading loading={loading} />
      )}

      <View style={{ flex: 1, justifyContent: "center" }}>
        <AnimatedStarRatingInput rating={rating} onChange={setRating} />
        <Text style={{ textAlign: "center" }}>Rating: {rating}</Text>
      </View>
    </ScrollView>
  );
};
const MenuItemSkeltonLoading = ({ loading }) => {
  // const Layout=()=>{
  //   return <View>
  //     <SkeletonLayout height={120} width="120" />
  //   </View>
  // }
  return (
    <SkeletonWrapper
      isLoading={loading}
      SkeletonComponent={SkeletonLayout}
      skeletonProps={{
        itemCount: 3,
        width: "100%",
        height: 200,
        borderRadius: 10,
        spacing: 10,
        layout: "vertical",
      }}
    >
      <View></View>
    </SkeletonWrapper>
  );
};

// const schemaActions =

export default MenuCardsView;
