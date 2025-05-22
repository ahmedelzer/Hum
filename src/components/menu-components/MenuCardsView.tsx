import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text, VStack } from "../../../components/ui";
import { LocalizationContext } from "../../../context/LocalizationContext";
import { getAllMenuItems } from "../../reducers/MenuItemReducer";
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
import LoadingScreen from "../../kitchensink-components/loading/LoadingScreen";
import CartSchemaActions from "../../Schemas/MenuSchema/CartSchemaActions.json";
import NodeMenuItemsSchema from "../../Schemas/MenuSchema/NodeMenuItemsSchema.json";
import NodeMenuItemsSchemaActions from "../../Schemas/MenuSchema/NodeMenuItemsSchemaActions.json";
import { ConnectToWS } from "../../utils/WS/ConnectToWS";
import { WSOperation } from "../../utils/WS/WSOperation";
import { createRowCache } from "../Pagination/createRowCache";
import { getRemoteRows } from "../Pagination/getRemoteRows";
import { updateRows } from "../Pagination/updateRows";
import SuggestCard from "../cards/SuggestCard";
import { handleWSMessage } from "../../utils/WS/handleWSMessage";
import { selectSelectedNode } from "../../reducers/LocationReducer";
const VIRTUAL_PAGE_SIZE = 4;

const MenuCardsView = ({ row, isRefreshed }: any) => {
  const products = useSelector((state) => state.menuItem.menuItem);
  const cart = useSelector((state) => state.cart.cart);
  const customerCartInfo = useSelector((state) => state.cart.customerCartInfo);
  const { localization } = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [reRequest, setReRequest] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [_WSsetMessage, setWSsetMessage] = useState("{}");
  const [WS_Connected, setWS_Connected] = useState(false);
  const activeTab = useSelector((state) => state.menuItem.currentCategory);
  const previousRowRef = useRef({});
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

    LoadData(
      state,
      dataSourceAPI,
      getAction,
      cache,
      updateRows(reducerDispatch, cache, state),
      reducerDispatch,
      previousControllerRef,
      reRequest
    );
    setReRequest(false);
    previousControllerRef.current = controller;
    // Call LoadData with the controller
  });

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
  const fieldsType = useSelector((state) => state.menuItem.fieldsType);
  useEffect(() => {
    if (WS_Connected) return;
    SetReoute(NodeMenuItemsSchema.projectProxyRoute);
    ConnectToWS(setWSsetMessage, setWS_Connected)
      .then(() => console.log("🔌 WebSocket setup done"))
      .catch((e) => console.error("❌ WebSocket setup error", e));
  }, [WS_Connected]);
  const callbackReducerUpdate = async (ws_updatedRows) => {
    await reducerDispatch({
      type: "WS_OPE_ROW",
      payload: {
        rows: ws_updatedRows.rows,
        totalCount: ws_updatedRows.totalCount,
      },
    });
  };
  useEffect(() => {
    if (rows.length > 0) {
      handleWSMessage({
        _WSsetMessage,
        fieldsType,
        rows,
        totalCount,
        callbackReducerUpdate,
      });
    }
  }, [_WSsetMessage]); // Add other dependencies if needed (rows, totalCount, etc.)
  // const staticRows = [
  //   {
  //     nodeMenuItemID: "2",
  //     menuItemName: "test",
  //     menuItemDescription: "test",
  //     rate: 3.5,
  //     numberOfLikes: 10,
  //     numberOfDislikes: 10,
  //     numberOfOrders: 10,
  //     numberOfReviews: 10,
  //     itemImage: image,
  //     price: "70",
  //     isAvailable: true,
  //     indexOflike: 1,
  //   },
  // ];

  //[token, isOnline, languageID,nodeID]
  // useEffect(() => {
  //   setWSsetMessage("{}");
  // }, [isRefreshed]);
  return (
    <ScrollView showsVerticalScrollIndicator={false} onScroll={handleScroll}>
      {rows?.map((item: any, index: number) => (
        <React.Fragment key={item[NodeMenuItemsSchema.idField]}>
          <MenuCardView
            itemPackage={item}
            schemaActions={CartSchemaActions}
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
          />

          {/* Insert component after every 2 items */}
          {(index + 1) % 2 === 0 && (
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

                price: 50,
              }}
              key={`custom-${index}`}
            />
          )}
        </React.Fragment>
      ))}
      {loading && <LoadingScreen LoadingComponent={<Chase size={40} />} />}
    </ScrollView>
  );
};

// const schemaActions =

export default MenuCardsView;
