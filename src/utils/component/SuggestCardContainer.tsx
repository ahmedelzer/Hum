import { View, Text } from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import { ScrollView } from "react-native";
import SuggestCard from "../../components/cards/SuggestCard";
import { scale } from "react-native-size-matters";
import { theme } from "../../Theme";
import { useWS } from "../../../context/WSProvider";
import { useSelector } from "react-redux";
import { useSchemas } from "../../../context/SchemaProvider";
import reducer from "../../reducers/LocationReducer";
import { initialState } from "../../components/Pagination/initialState";
import { SetReoute } from "../../../request";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import { createRowCache } from "../../components/Pagination/createRowCache";
import { prepareLoad } from "../operation/loadHelpers";
import { ConnectToWS } from "../WS/ConnectToWS";
import { WSMessageHandler } from "../WS/handleWSMessage";
export function renderSuggestCards(suggestContainerType, items) {
  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const chunkedItems = chunkArray(items, 4); // Creates groups of 4 items each
  const BOX_high = scale(300);
  const BOX_width = scale(300);
  switch (suggestContainerType) {
    case 0:
      return (
        <>
          {items.map((item) => (
            <SuggestCard key={item.uniqueKey} item={item} />
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
const VIRTUAL_PAGE_SIZE = 4;

export default function SuggestCardContainer({
  Schema,
  suggestContainerType = 1,
}) {
  const [reRequest, setReRequest] = useState(false);
  const [WS_Connected, setWS_Connected] = useState(false);

  const { _wsMessageMenuItem, setWSMessageMenuItem } = useWS();
  const fieldsType = useSelector((state: any) => state.menuItem.fieldsType);

  const { menuItemsState, setMenuItemsState } = useSchemas();
  const [state, reducerDispatch] = useReducer(
    reducer,
    initialState(10, menuItemsState.schema.idField)
  );
  const [currentSkip, setCurrentSkip] = useState(1);
  const dataSourceAPI = (query, skip, take) => {
    SetReoute(menuItemsState.schema.projectProxyRoute);
    return buildApiUrl(query, {
      pageIndex: skip + 1,
      pageSize: take,
      // ...row,
    });
  };
  const cache = createRowCache(VIRTUAL_PAGE_SIZE);
  const getAction =
    menuItemsState.action &&
    menuItemsState.action.find(
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
    // Call LoadData with the controller
  });
  // 🌐 Setup WebSocket connection on mount or WS_Connected change
  useEffect(() => {
    if (WS_Connected) return;

    SetReoute(menuItemsState.schema.projectProxyRoute);

    ConnectToWS(setWSMessageMenuItem, setWS_Connected)
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
      {renderSuggestCards(suggestContainerType, state.rows)}
    </ScrollView>
  );
}
