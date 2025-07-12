import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import StepHeader from "../../components/splash/StepHeader";
import { useSelector } from "react-redux";
import OrdersSchema from "../../Schemas/OrdersSchema/OrdersSchema.json";
import reducer from "../../reducers/LocationReducer";
import { initialState } from "../../components/Pagination/initialState";
import { useForm } from "react-hook-form";
import { SetReoute } from "../../../request";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import { createRowCache } from "../../components/Pagination/createRowCache";
import { prepareLoad } from "../../utils/operation/loadHelpers";
import { VStack } from "../../../components/ui";
import OrderCard from "../../components/cards/OrderCard";
const VIRTUAL_PAGE_SIZE = 4;
const orders = [
  {
    saleInvoiceID: "270f513b-1788-4c01-879e-4526c990f899",
    invoiceNumber: 1375,
    orderType: 0, // Pickup
    orderState: 0,
  },
  {
    saleInvoiceID: "xxyyzz-789",
    invoiceNumber: 1376,
    orderType: 1, // Delivery
    orderState: 2,
  },
];
export default function OrdersScreen({ schemas = OrdersSchema }) {
  const [state, reducerDispatch] = useReducer(
    reducer,
    initialState(VIRTUAL_PAGE_SIZE, schemas[0].idField)
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [reqError, setReqError] = useState(null);
  const [disable, setDisable] = useState(null);
  const [row, setRow] = useState(null);
  const [col, setCol] = useState({});

  const [currentSkip, setCurrentSkip] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const dataSourceAPI = (query, skip, take) => {
    SetReoute(schemas[0].projectProxyRoute);
    return buildApiUrl(query, {
      pageIndex: skip + currentPage,
      pageSize: take,
    });
  };
  const cache = createRowCache(VIRTUAL_PAGE_SIZE);
  //   const getAction =
  //     CustomerSaleInvoicesActions &&
  //     CustomerSaleInvoicesActions.find(
  //       (action) => action.dashboardFormActionMethodType === "Get"
  //     );

  const { rows, skip, totalCount, loading } = state;
  const totalPages = Math.ceil(totalCount / (VIRTUAL_PAGE_SIZE * 2));

  //   useEffect(() => {
  //     prepareLoad({
  //       state,
  //       dataSourceAPI,
  //       getAction,
  //       cache,
  //       reducerDispatch,
  //     });
  //     // Call LoadData with the controller
  //   }, [currentPage]);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
        marginTop: 10,
      }}
    >
      <VStack className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:auto-rows-fr">
        {orders.map((order) => (
          <OrderCard order={order} schemas={schemas} />
        ))}
      </VStack>
    </ScrollView>
  );
}
