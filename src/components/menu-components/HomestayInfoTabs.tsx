import React, { useEffect, useReducer, useState } from "react";
import { I18nManager } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Box, HStack, Pressable, Text } from "../../../components/ui";
import {
  getAllMenuItems,
  updateCategory,
  updateMenuItemType,
} from "../../reducers/MenuItemReducer";
import { initialState } from "../Pagination/initialState";
import reducer from "../Pagination/reducer";
import { menuItemType } from "./tabsData";
// import { createRowCache } from "@devexpress/dx-react-grid";
// import { createRowCache } from "../Pagination/createRowCache";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { Flow } from "react-native-animated-spinkit";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import LoadData from "../../../components/hooks/APIsFunctions/LoadData";
import { SetReoute } from "../../../request";
import LoadingScreen from "../../kitchensink-components/loading/LoadingScreen";
import NodeMenuCatSchema from "../../Schemas/MenuSchema/NodeMenuCatSchema.json";
import NodeMenuCatSchemaActions from "../../Schemas/MenuSchema/NodeMenuCatSchemaActions.json";
import { createRowCache } from "../Pagination/createRowCache";
import { getRemoteRows } from "../Pagination/getRemoteRows";
import { updateRows } from "../Pagination/updateRows";
import { ScrollView } from "react-native-gesture-handler";
import { isRTL } from "../../utils/operation/isRTL";
const VIRTUAL_PAGE_SIZE = 4;
export const HomestayInfoTabs = ({ tabs, row, setRow }: any) => {
  // Shop/GetMenuCategories?PageSize=11&PageNumber=1
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.menuItem.currentCategory);
  const activeMenuType = useSelector((state) => state.menuItem.currentItemType);
  const menuItems = useSelector((state) => state.menuItem.menuItem);
  const idField = NodeMenuCatSchema.idField;
  const display = NodeMenuCatSchema.dashboardFormSchemaParameters.find(
    (pram) => pram.parameterType === "tabDisplay"
  ).parameterField;
  const [state, reducerDispatch] = useReducer(
    reducer,
    initialState(10, NodeMenuCatSchema.idField)
  );
  const [currentSkip, setCurrentSkip] = useState(1);
  const dataSourceAPI = (query, skip, take) => {
    SetReoute(NodeMenuCatSchema.projectProxyRoute);
    return buildApiUrl(query, {
      pageIndex: skip + 1,
      pageSize: take,
      ...row,
    });
  };
  const cache = createRowCache(VIRTUAL_PAGE_SIZE);
  const getAction =
    NodeMenuCatSchemaActions &&
    NodeMenuCatSchemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Get"
    );

  const { rows, skip, totalCount, loading } = state;

  useEffect(() => {
    LoadData(
      state,
      dataSourceAPI,
      getAction,
      cache,
      updateRows(reducerDispatch, cache, state),
      reducerDispatch
    );
  });
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isScrolledToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isScrolledToBottom && rows.length < totalCount && !loading) {
      getRemoteRows(currentSkip, VIRTUAL_PAGE_SIZE * 2, reducerDispatch); //todo change dispatch by reducerDispatch
      setCurrentSkip(currentSkip + 1);
    }
  };
  //todo make sure when menu items change that depend on categoryId and filter and search by API and make caching
  //todo by in case offline make it with out api
  return (
    <Box className="border-b border-outline-50 md:border-b-0 md:border-transparent">
      <Box className="flex flex-row justify-between flex-wrap gap-5">
        <ScrollView
          onScroll={handleScroll}
          horizontal
          showsHorizontalScrollIndicator={false}
          inverted={isRTL()} // <-- makes horizontal scrolling work in RTL
          contentContainerStyle={{
            flexDirection: "row", // Always row; inversion handles RTL
          }}
        >
          <HStack
            space="lg"
            className={`mx-0.5 xl:gap-5 2xl:gap-6 flex ${
              isRTL() ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {rows.map((tab: any) => (
              <Pressable
                key={tab[idField]}
                className={`my-0.5 py-1 ${
                  activeTab === tab[idField] ? "border-b-[3px]" : "border-b-0"
                } !border-border hover:border-b-[3px] ${
                  activeTab === tab[idField]
                    ? "hover:border-accent"
                    : "hover:border-accent-hover"
                }`}
                onPress={() => {
                  setRow({
                    ...row,
                    [idField]: tab[idField],
                    [display]: tab[display],
                  });
                  dispatch(updateCategory(tab[idField]));
                }}
              >
                <Text
                  size="sm"
                  className={`${
                    activeTab === tab[idField]
                      ? "text-accent"
                      : "!text-dark_card"
                  } font-medium ${isRTL() ? "text-right" : "text-left"}`}
                >
                  {tab[display]}
                </Text>
              </Pressable>
            ))}
            {loading && <LoadingScreen LoadingComponent={<Flow size={40} />} />}
          </HStack>
        </ScrollView>

        {/* Icons Section */}
        <Box className="flex flex-row items-center gap-x-5">
          {menuItemType.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => {
                const data = menuItems.filter(
                  (data) => data.type === item.name
                );
                const fetchProducts = () => {
                  if (item.name === activeMenuType) {
                    dispatch(getAllMenuItems(menuItems));
                    dispatch(updateMenuItemType(""));
                  } else {
                    dispatch(getAllMenuItems(data));
                    dispatch(updateMenuItemType(item.name));
                  }
                };
                fetchProducts();
              }}
            >
              {item.name === "menuItem" ? (
                <Feather
                  name="list"
                  size={20}
                  className={`p-2 rounded-lg ${
                    activeMenuType === "menuItem"
                      ? "bg-accent !text-body"
                      : "text-text"
                  }`}
                />
              ) : (
                <FontAwesome5
                  name="layer-group"
                  size={20}
                  className={`p-2 rounded-lg ${
                    activeMenuType === "menuItemsGroup"
                      ? "bg-accent !text-body"
                      : "text-text"
                  }`}
                />
              )}
            </Pressable>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
