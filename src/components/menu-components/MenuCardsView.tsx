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
import { SetResponsiveContainer } from "../../utils/component/SetResponsiveContainer";
import { VStack } from "../../../components/ui";
import { useWS } from "../../../context/WSProvider";
import { useSchemas } from "../../../context/SchemaProvider";
const VIRTUAL_PAGE_SIZE = 4;

const MenuCardsView = ({ row, isRefreshed }: any) => {
  const navigation = useNavigation();
  const [reRequest, setReRequest] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  // const [_WSMessageMenuItems, setWSMessageMenuItems] = useState("{}");
  const { _wsMessageMenuItem, setWSMessageMenuItem } = useWS();
  const { _wsMessageCart, setWSMessageCart } = useWS();
  const { menuItemsState, setMenuItemsState } = useSchemas();
  const [WSMenu_Connected, setWSMenu_Connected] = useState(false);
  const [cart_WS_Connected, setCartWS_Connected] = useState(false);
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
    if (WSMenu_Connected) return;

    SetReoute(NodeMenuItemsSchema.projectProxyRoute);

    ConnectToWS(setWSMessageMenuItem, setWSMenu_Connected)
      .then(() => console.log("🔌 WebSocket setup done"))
      .catch((e) => console.error("❌ WebSocket setup error", e));
  }, [WSMenu_Connected]);

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
    if (!_wsMessageMenuItem) return;
    const _handleWSMessage = new WSMessageHandler({
      _WSsetMessage: _wsMessageMenuItem,
      fieldsType,
      rows,
      totalCount,
      callbackReducerUpdate,
    });
    _handleWSMessage.process();
    setWSMessageMenuItem(null);
  }, [_wsMessageMenuItem]);

  ////cart
  const [cartState, cartReducerDispatch] = useReducer(
    reducer,
    initialState(4000, CartSchema.idField)
  );

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
    console.log(CartSchema, cart_WS_Connected);

    if (cart_WS_Connected) return;

    SetReoute(CartSchema.projectProxyRoute);

    ConnectToWS(setWSMessageCart, setCartWS_Connected)
      .then(() => console.log("🔌 Cart WebSocket connected"))
      .catch((e) => console.error("❌ Cart WebSocket error", e));
  }, [cart_WS_Connected]);

  // ✅ Callback to update reducer
  const cartCallbackReducerUpdate = async (cart_ws_updatedRows) => {
    console.log("cartCallbackReducerUpdate", cart_ws_updatedRows);
    await cartReducerDispatch({
      type: "WS_OPE_ROW",
      payload: {
        rows: cart_ws_updatedRows.rows,
        totalCount: cart_ws_updatedRows.totalCount,
      },
    });
  };

  // 📨 WebSocket message handler
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
    //console.log("cart.rows",cartState);
  }, [selectedLocation, selectedNode]);

  useEffect(() => {
    console.log("cartState.rows", cartState, _wsMessageCart);
    if (!_wsMessageCart) return;

    const handlerCartWSMessage = new WSMessageHandler({
      _WSsetMessage: _wsMessageCart, // match param name
      fieldsType: cartFieldsType,
      rows: cartState.rows,
      totalCount: cartState.totalCount,
      callbackReducerUpdate: cartCallbackReducerUpdate,
    });
    handlerCartWSMessage.process();
    console.log("after cartState.rows", cartState);
    //setWSMessageCart(null);
  }, [_wsMessageCart]);

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
          SetResponsiveContainer(<HeaderParent />, false)
        ),
    });
  }, [selectedItems, navigation]);
  const initRow = [
    {
      nodeMenuItemID: "b30ca2db-6662-4c70-9858-ab7d6bcae6e8",
      sku: "",
      price: 550.0,
      discount: 0.0,
      taxTypeID: "00000000-0000-0000-0000-000000000000",
      taxAmount: 0,
      size: 0,
      preparingTimeAmountPerMinute: 0,
      isActive: true,
      isAvailable: true,
      nodeID: "2421d86a-0043-441b-988a-e7cfad6273a7",
      node_Name: "MainNode",
      nodeAddress: null,
      priceAfterDiscount: 550.0,
      menuItemID: "f348161f-905a-4d78-af2f-068bd35599b5",
      rate: 5.0,
      numberOfOrders: 0,
      numberOfReviews: 0,
      numberOfLikes: 0,
      numberOfDislikes: 0,
      itemImage:
        "MenuItemImages\\34a706bf-8bf2-4c45-b660-c247ed177d99.jpg?v6/23/2025 12:30:39 PM?v6/23/2025 12:30:39 PM",
      menuCategoryName: "Foods",
      indexOflike: 0,
      menuCategoryID: "b7d65f7f-f87a-4fa6-beaa-d799ba77b9ce",
      menuItemName: "Sandwich chicken ",
      menuItemDescription: "rtr",
      canReturn: true,
      keywords: "wee,apples12",
      weightKg: 0,
      lengthCm: 0,
      widthCm: 0,
      heightCm: 0,
      packageDegree: 0,
      volume: 0,
    },
    {
      nodeMenuItemID: "5583d18b-7bff-4d91-aef8-2390a80972ae",
      sku: "",
      price: 20000.0,
      discount: 10.0,
      taxTypeID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      taxAmount: 0,
      size: 0,
      preparingTimeAmountPerMinute: 1,
      isActive: true,
      isAvailable: true,
      nodeID: "2421d86a-0043-441b-988a-e7cfad6273a7",
      node_Name: "MainNode",
      nodeAddress: null,
      priceAfterDiscount: 18000.0,
      menuItemID: "00f6d641-84db-4937-9143-10667ac33442",
      rate: 5.0,
      numberOfOrders: 0,
      numberOfReviews: 0,
      numberOfLikes: 0,
      numberOfDislikes: 0,
      itemImage:
        "MenuItemImages\\34a706bf-8bf2-4c45-b660-c247ed177d84.jpg?v6/23/2025 12:30:39 PM?v6/23/2025 12:30:39 PM",
      menuCategoryName: "Foods",
      indexOflike: 0,
      menuCategoryID: "b7d65f7f-f87a-4fa6-beaa-d799ba77b9ce",
      menuItemName: "test",
      menuItemDescription: "string",
      canReturn: false,
      keywords: "string,test",
      weightKg: 0,
      lengthCm: 0,
      widthCm: 0,
      heightCm: 0,
      packageDegree: 0,
      volume: 0,
    },
  ];
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <VStack className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:auto-rows-fr">
        {/*!for web*/}
        {rows?.map((item: any, index: number) => (
          <View
            key={`${item[NodeMenuItemsSchema.idField]}-${index}`}
            className="h-full"
          >
            <MenuCardView
              itemPackage={getItemPackage(
                item,
                cartState.rows,
                NodeMenuItemsSchema
              )}
              schemaActions={NodeMenuItemsSchemaActions}
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
      </VStack>

      {loading && (
        <View style={{ padding: 20 }}>
          <ActivityIndicator size="small" color="black" />
        </View>
      )}
    </ScrollView>
  );
};

// const schemaActions =

export default MenuCardsView;
