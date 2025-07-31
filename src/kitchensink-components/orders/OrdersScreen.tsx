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
import OrdersSchemaActions from "../../Schemas/OrdersSchema/OrdersSchemaActions.json";
const VIRTUAL_PAGE_SIZE = 4;
const orders = [
  {
    saleInvoiceID: "2e46b91b-9133-4c89-8333-0336fb08fdd2",
    invoiceNumber: "135713982",
    requestedDatetime: "2025-07-22T13:57:13.9825097",
    shiftID: "91fed266-44f6-4a0f-9ac0-a49c04f618b6",
    orderStateTypeID: "00000000-0000-0000-0000-000000000000",
    totalAmount: 20550.0,
    invoiceItemsTaxAmount: 0.0,
    invoiceTaxAmount: 0.0,
    totalTaxAmount: 0.0,
    feesAmount: 0.0,
    invoiceItemsDiscountAmount: 2000.0,
    invoiceDiscountAmount: 0.0,
    totalDiscountAmount: 2000.0,
    netAmount: 18550.0,
    customerName: null,
    customerContact: null,
    otherCustomerContact: null,
    orderState: null,
    orderType: null,
    orderTypeIndex: 0,
    orderStateIndex: 0,
    customerID: "303c1fd6-8036-4ae1-b2a0-fa08d76f4ce7",
    customerContactID: "0626d7aa-a295-4f16-b069-dc64548ab36a",
    otherCustomerContactID: null,
    note: null,
    isPaid: false,
  },
  {
    saleInvoiceID: "156cde79-0080-49d4-a0de-0539d0aa9cf2",
    invoiceNumber: "54915507",
    requestedDatetime: "2025-07-19T05:49:15.5075132",
    shiftID: "a770bbc9-9e9f-4b7f-bd11-94bb07bd9d4b",
    orderStateTypeID: "00000000-0000-0000-0000-000000000000",
    totalAmount: 550.0,
    invoiceItemsTaxAmount: 0.0,
    invoiceTaxAmount: 0.0,
    totalTaxAmount: 0.0,
    feesAmount: 0.0,
    invoiceItemsDiscountAmount: 0.0,
    invoiceDiscountAmount: 0.0,
    totalDiscountAmount: 0.0,
    netAmount: 550.0,
    customerName: null,
    customerContact: null,
    otherCustomerContact: null,
    orderState: null,
    orderType: null,
    orderTypeIndex: 0,
    orderStateIndex: 0,
    customerID: "303c1fd6-8036-4ae1-b2a0-fa08d76f4ce7",
    customerContactID: "0626d7aa-a295-4f16-b069-dc64548ab36a",
    otherCustomerContactID: null,
    note: null,
    isPaid: false,
  },
  {
    saleInvoiceID: "14515abf-34dd-4ab4-9754-093ea5855b08",
    invoiceNumber: "135417250",
    requestedDatetime: "2025-07-22T13:54:17.2503582",
    shiftID: "34d84cf9-f34c-4dbd-9e2e-be33c86d9fbc",
    orderStateTypeID: "00000000-0000-0000-0000-000000000000",
    totalAmount: 40000.0,
    invoiceItemsTaxAmount: 0.0,
    invoiceTaxAmount: 0.0,
    totalTaxAmount: 0.0,
    feesAmount: 0.0,
    invoiceItemsDiscountAmount: 4000.0,
    invoiceDiscountAmount: 0.0,
    totalDiscountAmount: 4000.0,
    netAmount: 36000.0,
    customerName: null,
    customerContact: null,
    otherCustomerContact: null,
    orderState: null,
    orderType: null,
    orderTypeIndex: 0,
    orderStateIndex: 0,
    customerID: "303c1fd6-8036-4ae1-b2a0-fa08d76f4ce7",
    customerContactID: "0626d7aa-a295-4f16-b069-dc64548ab36a",
    otherCustomerContactID: null,
    note: null,
    isPaid: false,
  },
  {
    saleInvoiceID: "18df0de7-09c9-4000-a0fb-09e292fd758e",
    invoiceNumber: "151700768",
    requestedDatetime: "2025-07-15T15:17:00.7683322",
    shiftID: "3b441961-fb14-4efc-b5d7-1c79ee5e96a5",
    orderStateTypeID: "00000000-0000-0000-0000-000000000000",
    totalAmount: 21100.0,
    invoiceItemsTaxAmount: 0.0,
    invoiceTaxAmount: 0.0,
    totalTaxAmount: 0.0,
    feesAmount: 0.0,
    invoiceItemsDiscountAmount: 2000.0,
    invoiceDiscountAmount: 0.0,
    totalDiscountAmount: 2000.0,
    netAmount: 19100.0,
    customerName: null,
    customerContact: null,
    otherCustomerContact: null,
    orderState: null,
    orderType: null,
    orderTypeIndex: 0,
    orderStateIndex: 0,
    customerID: "303c1fd6-8036-4ae1-b2a0-fa08d76f4ce7",
    customerContactID: "0626d7aa-a295-4f16-b069-dc64548ab36a",
    otherCustomerContactID: null,
    note: null,
    isPaid: true,
  },
  {
    saleInvoiceID: "470efdd6-650c-498d-8db0-0b39be7afcaa",
    invoiceNumber: "60259465",
    requestedDatetime: "2025-07-19T06:02:59.4658318",
    shiftID: "a6403f09-21cc-4fe7-8d25-c1c1c20550ee",
    orderStateTypeID: "00000000-0000-0000-0000-000000000000",
    totalAmount: 20000.0,
    invoiceItemsTaxAmount: 0.0,
    invoiceTaxAmount: 0.0,
    totalTaxAmount: 0.0,
    feesAmount: 0.0,
    invoiceItemsDiscountAmount: 2000.0,
    invoiceDiscountAmount: 0.0,
    totalDiscountAmount: 2000.0,
    netAmount: 18000.0,
    customerName: null,
    customerContact: null,
    otherCustomerContact: null,
    orderState: null,
    orderType: null,
    orderTypeIndex: 0,
    orderStateIndex: 0,
    customerID: "303c1fd6-8036-4ae1-b2a0-fa08d76f4ce7",
    customerContactID: "0626d7aa-a295-4f16-b069-dc64548ab36a",
    otherCustomerContactID: null,
    note: null,
    isPaid: false,
  },
  {
    saleInvoiceID: "b4539a83-66c8-4269-a54b-0e20be52dcaf",
    invoiceNumber: "33957137",
    requestedDatetime: "2025-07-19T03:39:57.1375677",
    shiftID: "c3d91a48-189b-4408-84e5-cb79be19d22d",
    orderStateTypeID: "00000000-0000-0000-0000-000000000000",
    totalAmount: 550.0,
    invoiceItemsTaxAmount: 0.0,
    invoiceTaxAmount: 0.0,
    totalTaxAmount: 0.0,
    feesAmount: 0.0,
    invoiceItemsDiscountAmount: 0.0,
    invoiceDiscountAmount: 0.0,
    totalDiscountAmount: 0.0,
    netAmount: 550.0,
    customerName: null,
    customerContact: null,
    otherCustomerContact: null,
    orderState: null,
    orderType: null,
    orderTypeIndex: 0,
    orderStateIndex: 0,
    customerID: "303c1fd6-8036-4ae1-b2a0-fa08d76f4ce7",
    customerContactID: "0626d7aa-a295-4f16-b069-dc64548ab36a",
    otherCustomerContactID: null,
    note: null,
    isPaid: true,
  },
  {
    saleInvoiceID: "88580023-4c75-42f5-b0f9-0ffd670dd1c6",
    invoiceNumber: "173901257",
    requestedDatetime: "2025-07-15T17:39:01.2570132",
    shiftID: "93a9d5e9-3901-4a68-9417-7fc36f457886",
    orderStateTypeID: "00000000-0000-0000-0000-000000000000",
    totalAmount: 20550.0,
    invoiceItemsTaxAmount: 0.0,
    invoiceTaxAmount: 0.0,
    totalTaxAmount: 0.0,
    feesAmount: 0.0,
    invoiceItemsDiscountAmount: 2000.0,
    invoiceDiscountAmount: 0.0,
    totalDiscountAmount: 2000.0,
    netAmount: 18550.0,
    customerName: null,
    customerContact: null,
    otherCustomerContact: null,
    orderState: null,
    orderType: null,
    orderTypeIndex: 0,
    orderStateIndex: 0,
    customerID: "303c1fd6-8036-4ae1-b2a0-fa08d76f4ce7",
    customerContactID: "0626d7aa-a295-4f16-b069-dc64548ab36a",
    otherCustomerContactID: null,
    note: null,
    isPaid: true,
  },
  {
    saleInvoiceID: "de76bcc1-f880-465c-a397-13ae0c0d01f4",
    invoiceNumber: "173715537",
    requestedDatetime: "2025-07-15T17:37:15.5377772",
    shiftID: "2c21a169-7bcb-4742-9783-852f64c3f96b",
    orderStateTypeID: "00000000-0000-0000-0000-000000000000",
    totalAmount: 20550.0,
    invoiceItemsTaxAmount: 0.0,
    invoiceTaxAmount: 0.0,
    totalTaxAmount: 0.0,
    feesAmount: 0.0,
    invoiceItemsDiscountAmount: 2000.0,
    invoiceDiscountAmount: 0.0,
    totalDiscountAmount: 2000.0,
    netAmount: 18550.0,
    customerName: null,
    customerContact: null,
    otherCustomerContact: null,
    orderState: null,
    orderType: null,
    orderTypeIndex: 0,
    orderStateIndex: 0,
    customerID: "303c1fd6-8036-4ae1-b2a0-fa08d76f4ce7",
    customerContactID: "0626d7aa-a295-4f16-b069-dc64548ab36a",
    otherCustomerContactID: null,
    note: null,
    isPaid: true,
  },
  {
    saleInvoiceID: "3b2c8117-dd19-452a-b6c9-1489f28dc50f",
    invoiceNumber: "163913146",
    requestedDatetime: "2025-07-15T16:39:13.1462916",
    shiftID: "b69762f0-5ad9-46ae-a186-4d6fb7350c66",
    orderStateTypeID: "00000000-0000-0000-0000-000000000000",
    totalAmount: 20550.0,
    invoiceItemsTaxAmount: 0.0,
    invoiceTaxAmount: 0.0,
    totalTaxAmount: 0.0,
    feesAmount: 0.0,
    invoiceItemsDiscountAmount: 2000.0,
    invoiceDiscountAmount: 0.0,
    totalDiscountAmount: 2000.0,
    netAmount: 18550.0,
    customerName: null,
    customerContact: null,
    otherCustomerContact: null,
    orderState: null,
    orderType: null,
    orderTypeIndex: 0,
    orderStateIndex: 0,
    customerID: "303c1fd6-8036-4ae1-b2a0-fa08d76f4ce7",
    customerContactID: "0626d7aa-a295-4f16-b069-dc64548ab36a",
    otherCustomerContactID: null,
    note: null,
    isPaid: true,
  },
  {
    saleInvoiceID: "3a31870b-a085-499a-8712-1732ded5bcbb",
    invoiceNumber: "63308234",
    requestedDatetime: "2025-07-19T06:33:08.2345828",
    shiftID: "cb6da08e-d24a-4208-beee-f93869db180d",
    orderStateTypeID: "00000000-0000-0000-0000-000000000000",
    totalAmount: 550.0,
    invoiceItemsTaxAmount: 0.0,
    invoiceTaxAmount: 0.0,
    totalTaxAmount: 0.0,
    feesAmount: 0.0,
    invoiceItemsDiscountAmount: 0.0,
    invoiceDiscountAmount: 0.0,
    totalDiscountAmount: 0.0,
    netAmount: 550.0,
    customerName: null,
    customerContact: null,
    otherCustomerContact: null,
    orderState: null,
    orderType: null,
    orderTypeIndex: 0,
    orderStateIndex: 0,
    customerID: "303c1fd6-8036-4ae1-b2a0-fa08d76f4ce7",
    customerContactID: "0626d7aa-a295-4f16-b069-dc64548ab36a",
    otherCustomerContactID: null,
    note: null,
    isPaid: false,
  },
  {
    saleInvoiceID: "71d44702-a420-41aa-ba43-18546e83e412",
    invoiceNumber: "62755887",
    requestedDatetime: "2025-07-19T06:27:55.8876189",
    shiftID: "d9f25382-764a-4056-b857-79dcc7bcf65a",
    orderStateTypeID: "00000000-0000-0000-0000-000000000000",
    totalAmount: 550.0,
    invoiceItemsTaxAmount: 0.0,
    invoiceTaxAmount: 0.0,
    totalTaxAmount: 0.0,
    feesAmount: 0.0,
    invoiceItemsDiscountAmount: 0.0,
    invoiceDiscountAmount: 0.0,
    totalDiscountAmount: 0.0,
    netAmount: 550.0,
    customerName: null,
    customerContact: null,
    otherCustomerContact: null,
    orderState: null,
    orderType: null,
    orderTypeIndex: 0,
    orderStateIndex: 0,
    customerID: "303c1fd6-8036-4ae1-b2a0-fa08d76f4ce7",
    customerContactID: "0626d7aa-a295-4f16-b069-dc64548ab36a",
    otherCustomerContactID: null,
    note: null,
    isPaid: false,
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
  const getAction =
    OrdersSchemaActions &&
    OrdersSchemaActions.find(
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
  });

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
        marginTop: 10,
      }}
      className="!overflow-scroll"
      onScroll={() => console.log("scrolling")}
      scrollEventThrottle={16}
    >
      <VStack className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:auto-rows-fr">
        {rows.map((order) => (
          <OrderCard order={order} schemas={schemas} />
        ))}
      </VStack>
    </ScrollView>
  );
}
