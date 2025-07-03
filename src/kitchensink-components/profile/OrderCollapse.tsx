import { FontAwesome } from "@expo/vector-icons";
import { default as React, useEffect, useReducer, useState } from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  Box,
  HStack,
} from "../../../components/ui";
import { SetReoute } from "../../../request";
import { createRowCache } from "../../components/Pagination/createRowCache";
import { initialState } from "../../components/Pagination/initialState";
import reducer from "../../components/Pagination/reducer";
import ScratchVoucherCard from "../../Schemas/MenuSchema/NodeMenuItemsSchema.json";
import CustomerSaleInvoicesActions from "../../Schemas/Profile/CustomerSaleInvoicesActions.json";
import { prepareLoad } from "../../utils/operation/loadHelpers";
const VIRTUAL_PAGE_SIZE = 4;

// Example data
const orders = [
  { id: "ORD001", date: "2025-06-09", status: "Shipped", total: "$120.00" },
  { id: "ORD002", date: "2025-06-07", status: "Processing", total: "$95.50" },
  { id: "ORD003", date: "2025-06-05", status: "Delivered", total: "$40.75" },
];

const OrderGridRow = ({ order }) => (
  <HStack className="border-b border-gray-200 py-2 px-2">
    <Text className="flex-1 text-xs">{order.id}</Text>
    <Text className="flex-1 text-xs">{order.date}</Text>
    <Text className="flex-1 text-xs">{order.status}</Text>
    <Text className="flex-1 text-xs">{order.total}</Text>
  </HStack>
);

const OrderCollapse = () => {
  const [state, reducerDispatch] = useReducer(
    reducer,
    initialState(VIRTUAL_PAGE_SIZE, ScratchVoucherCard.idField)
  );
  const localization = useSelector((state) => state.localization.localization);
  const voucherLocale = localization.Hum_screens.profile.collapses.find(
    (collapse) => collapse.type === "vouchers"
  ).childrenText;

  const [currentSkip, setCurrentSkip] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const dataSourceAPI = (query, skip, take) => {
    SetReoute(ScratchVoucherCard.projectProxyRoute);
    return buildApiUrl(query, {
      pageIndex: skip + currentPage,
      pageSize: take,
    });
  };
  const cache = createRowCache(VIRTUAL_PAGE_SIZE);
  const getAction =
    CustomerSaleInvoicesActions &&
    CustomerSaleInvoicesActions.find(
      (action) => action.dashboardFormActionMethodType === "Get"
    );

  const { rows, skip, totalCount, loading } = state;
  const totalPages = Math.ceil(totalCount / (VIRTUAL_PAGE_SIZE * 2));

  useEffect(() => {
    prepareLoad({
      state,
      dataSourceAPI,
      getAction,
      cache,
      reducerDispatch,
    });
    // Call LoadData with the controller
  }, [currentPage]);
  return (
    <Accordion defaultValue="orders" isCollapsible isMultiple>
      <AccordionItem value="orders">
        <AccordionHeader>
          <HStack space="sm" alignItems="center">
            <FontAwesome name="shopping-bag" size={16} color="#0f172a" />
            <Text className="font-bold text-base text-text">My Orders</Text>
          </HStack>
        </AccordionHeader>
        <AccordionContent>
          <Box className="p-2 bg-white rounded-lg">
            <HStack className="border-b border-gray-300 py-2 px-2 bg-gray-100">
              <Text className="flex-1 text-xs font-bold">Order ID</Text>
              <Text className="flex-1 text-xs font-bold">Date</Text>
              <Text className="flex-1 text-xs font-bold">Status</Text>
              <Text className="flex-1 text-xs font-bold">Total</Text>
            </HStack>
            <FlatList
              data={orders}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <OrderGridRow order={item} />}
            />
          </Box>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default OrderCollapse;
