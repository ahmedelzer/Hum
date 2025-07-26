import {
  default as React,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ScrollView, View } from "react-native";
import { scale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { useNetwork } from "../../../context/NetworkContext";
import { useWS } from "../../../context/WSProvider";
import { theme } from "../../Theme";
import SuggestCard from "../../components/cards/SuggestCard";
// import { LocalizationContext } from "../../../context/LocalizationContext";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import { useCart } from "../../../context/CartProvider";
import { SetReoute } from "../../../request";
import NodeMenuItemsSchema from "../../Schemas/MenuSchema/NodeMenuItemsSchema.json";
import SuggestCardSchema from "../../Schemas/MenuSchema/SuggestCardSchema.json";
import { createRowCache } from "../../components/Pagination/createRowCache";
import { initialState } from "../../components/Pagination/initialState";
import reducer from "../../components/Pagination/reducer";
import { getItemPackage } from "../../components/menu-components/getItemPackage";
import { prepareLoad } from "../../utils/operation/loadHelpers";

export function renderSuggestCards(suggestContainerType, items, schemaActions) {
  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };
  const fieldsType = useSelector((state: any) => state.menuItem.fieldsType);
  const { cartState, cartReducerDispatch, cartFieldsType } = useCart();

  const chunkedItems = chunkArray(items, 4); // Creates groups of 4 items each
  const BOX_high = scale(300);
  const BOX_width = scale(300);
  switch (suggestContainerType) {
    case 0:
      return (
        <>
          {items.map((item) => (
            <SuggestCard
              key={item[fieldsType.idField]}
              schemaActions={schemaActions}
              item={getItemPackage(
                item,
                cartState.rows,
                NodeMenuItemsSchema,
                fieldsType
              )}
            />
          ))}
        </>
      );

    case 1:
      return (
        <>
          {chunkedItems.map((group, groupIndex) => (
            <View
              key={`group-${groupIndex}`}
              style={{
                width: BOX_width,
                height: BOX_high,
                backgroundColor: theme.body,
                borderRadius: scale(8),
                padding: scale(8),
                marginRight:
                  groupIndex < chunkedItems.length - 1 ? scale(8) : 0,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignContent: "flex-start",
              }}
            >
              {group.map((item, index) => (
                <View
                  key={index}
                  style={{
                    width: "48%",
                    height: "50%", // two columns per row with small gap
                    marginBottom: scale(8),
                  }}
                >
                  <SuggestCard
                    item={item}
                    boxScale={BOX_high}
                    imageStyle={{
                      width: scale(110),
                      height: scale(90),
                    }}
                    schemaActions={schemaActions}
                    showPrice={false}
                  />
                </View>
              ))}
            </View>
          ))}
        </>
      );

    default:
      return null;
  }
}

export default function SuggestCardContainer({
  schema,
  schemaActions,
  suggestContainerType = 1,
  shownNodeMenuItemIDs,
}) {
  const { status, isOnline } = useNetwork();

  const { _wsMessageMenuItem, setWSMessageMenuItem } = useWS();
  //const [_wsMessageCart, setWSMessageCart] = useState();
  // Get schema parameters
  ////cart
  const [suggestState, suggestReducerDispatch] = useReducer(
    reducer,
    initialState(4000, SuggestCardSchema.idField)
  );
  const {
    rows: suggestRows,
    totalCount: suggestTotalCount,
    loading: suggestLoading,
  } = suggestState;
  const [suggest_WS_Connected, setsuggestWS_Connected] = useState(false);

  const parameters = SuggestCardSchema?.dashboardFormSchemaParameters ?? [];

  // 🌐 WebSocket connect effect
  // useEffect(() => {
  //   if (suggest_WS_Connected) return;

  //   SetReoute(suggestSchema.projectProxyRoute);
  //   let cleanup;
  //   ConnectToWS(setWSMessageCart, setCartWS_Connected)
  //     .then(() => console.log("🔌 Cart WebSocket connected"))
  //     .catch((e) => console.error("❌ Cart WebSocket error", e));
  //   return () => {
  //     if (cleanup) cleanup(); // Clean up when component unmounts or deps change
  //     console.log("🧹 Cleaned up WebSocket handler");
  //   };
  // }, [cart_WS_Connected, isOnline]);

  // ✅ Callback to update reducer
  // const cartCallbackReducerUpdate = async (cart_ws_updatedRows) => {
  //   await cartReducerDispatch({
  //     type: "WS_OPE_ROW",
  //     payload: {
  //       rows: cart_ws_updatedRows.rows,
  //       totalCount: cart_ws_updatedRows.totalCount,
  //     },
  //   });
  // };

  // 📨 WebSocket message handler
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

  const suggestDataSourceAPI = (query, skip, take) => {
    SetReoute(SuggestCardSchema.projectProxyRoute);
    return buildApiUrl(query, {
      pageIndex: skip + 1,
      pageSize: take,
      shownNodeMenuItemIDs: shownNodeMenuItemIDs.join(","),
    });
  };
  const getSuggestAction =
    schemaActions &&
    schemaActions.find(
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
  const loadData = useCallback(() => {
    prepareLoad({
      state: suggestState,
      dataSourceAPI: suggestDataSourceAPI,
      getAction: getSuggestAction,
      cache: createRowCache(4000),
      reducerDispatch: suggestReducerDispatch,
      abortController: false,
      reRequest: true,
    });
  }, [
    suggestDataSourceAPI,
    getSuggestAction,
    suggestReducerDispatch,
    suggestState,
    selectedNode,
    ,
  ]);
  useEffect(() => {
    if (isOnline) {
      resetAndReload(); // Reload only when back online
    }
  }, [isOnline, shownNodeMenuItemIDs]);

  const resetAndReload = useCallback(() => {
    suggestReducerDispatch({
      type: "RESET_SERVICE_LIST",
      payload: { lastQuery: "" },
    });
    setTimeout(() => {
      loadData();
    }, 0);
  }, [loadData]);

  return (
    <ScrollView
      horizontal
      className="mt-2"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 12,
        paddingHorizontal: 12,
        alignItems: "flex-start",
      }}
    >
      {renderSuggestCards(suggestContainerType, suggestRows, schemaActions)}
    </ScrollView>
  );
}
