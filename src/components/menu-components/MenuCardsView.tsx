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
import { Box, Text, VStack } from "../../../components/ui";
import { LocalizationContext } from "../../../context/LocalizationContext";
import { getAllMenuItems } from "../../reducers/MenuItemReducer";
import { initialState } from "../Pagination/initialState";
import reducer from "../Pagination/reducer";
import MenuCardView from "./MenuCardView";
import { tabsData } from "./tabsData";
// import { createRowCache } from "@devexpress/dx-react-grid";
import { useNavigation } from "@react-navigation/native";
import { SetResponsiveContainer } from "../../utils/SetResponsiveContainer";
import ActionBar from "../cards/ActionBar";
import HeaderParent from "../header/HeaderParent";
// import { createRowCache } from "../Pagination/createRowCache";
import { Chase } from "react-native-animated-spinkit";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import LoadData from "../../../components/hooks/APIsFunctions/LoadData";
import { SetReoute } from "../../../request";
import LoadingScreen from "../../kitchensink-components/loading/LoadingScreen";
import NodeMenuItemsSchema from "../../Schemas/MenuSchema/NodeMenuItemsSchema.json";
import NodeMenuItemsSchemaActions from "../../Schemas/MenuSchema/NodeMenuItemsSchemaActions.json";
import { useDeviceInfo } from "../../utils/useDeviceInfo";
import { createRowCache } from "../Pagination/createRowCache";
import { getRemoteRows } from "../Pagination/getRemoteRows";
import { updateRows } from "../Pagination/updateRows";
import { ConnectToWS } from "../../utils/ConnectToWS";
import { WSOperation } from "../../utils/WSOperation";
import CartSchemaActions from "../../Schemas/MenuSchema/CartSchemaActions.json";
const VIRTUAL_PAGE_SIZE = 4;

const MenuCardsView = ({ menuCardItem, row, setRow }: any) => {
  const products = useSelector((state) => state.menuItem.menuItem);
  const { localization } = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [reRequest, setReRequest] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [_WSsetMessage, setWSsetMessage] = useState("{}");
  const activeTab = useSelector((state) => state.menuItem.currentCategory);
  const previousRowRef = useRef({});
  // Add this ref:
  const previousControllerRef = useRef(null);
  useEffect(() => {
    // if (products.length > 0) return;
    //! set here the conditions of is have new products and online users
    const data = tabsData.filter((tab) => tab.categoryId === activeTab.id);

    const fetchProducts = () => {
      dispatch(getAllMenuItems(data));
    };
    fetchProducts();
  }, []);
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

  useEffect(() => {
    //todo:here when ws get messages like updates and delete
    //make that
    // if(WSOperation)
  }, []);
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
  const d = "ss";
  const fieldsType = useSelector((state) => state.menuItem.fieldsType);
  useEffect(() => {
    ConnectToWS(setWSsetMessage)
      .then(() => console.log("🔌 WebSocket setup done"))
      .catch((e) => console.error("❌ WebSocket setup error", e));
    WSOperation(
      _WSsetMessage,
      setReRequest,
      reducerDispatch,
      null,
      () => {},
      fieldsType.idField,
      fieldsType.dataSourceName,
      rows
    );
  }, [d, _WSsetMessage]);
  //[token, isOnline, languageID,nodeID]
  return (
    <ScrollView showsVerticalScrollIndicator={false} onScroll={handleScroll}>
      <VStack className="grid grid-cols-1 md:grid-cols-2 flex-wrap gap-x-4">
        {rows?.map((item: any) => {
          return (
            <MenuCardView
              key={item[NodeMenuItemsSchema.idField]}
              itemPackage={item}
              schemaActions={CartSchemaActions}
              setSelectedItems={setSelectedItems}
              selectedItems={selectedItems}
            />
          );
        })}
        {rows?.length === 0 && !loading && (
          <Text className="text-center justify-center items-center flex-1 mt-4">
            {localization.Hum_screens.menu.noItems}
          </Text>
        )}
      </VStack>
      {loading && <LoadingScreen LoadingComponent={<Chase size={40} />} />}
    </ScrollView>
  );
};

// const schemaActions =

export default MenuCardsView;
