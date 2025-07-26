import { FontAwesome } from "@expo/vector-icons";
import { default as React, useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  HStack,
} from "../../../components/ui";
import { SetReoute } from "../../../request";
import { createRowCache } from "../../components/Pagination/createRowCache";
import { initialState } from "../../components/Pagination/initialState";
import reducer from "../../components/Pagination/reducer";
import DynamicTable from "../../components/table/DynamicTable";
import CustomerSaleInvoicesActions from "../../Schemas/Profile/CustomerSaleInvoicesActions.json";
import SaleInvoiceSchema from "../../Schemas/Profile/SaleInvoiceSchema.json";
import { prepareLoad } from "../../utils/operation/loadHelpers";
import { FlatList } from "react-native-gesture-handler";
import CardSchema from "../../components/cards/CardSchema";
const VIRTUAL_PAGE_SIZE = 4;

// Example data
const orders = [
  {
    totalAmount: 1980.0,
    invoiceItemsTaxAmount: 0.0,
    invoiceTaxAmount: 0.0,
    totalTaxAmount: 0.0,
    feesAmount: 1375.0,
    saleInvoiceID: "0",
    invoiceItemsDiscountAmount: 198.0,
    invoiceDiscountAmount: 0.0,
    totalDiscountAmount: 198.0,
    netAmount: 3157.0,
  },
  {
    totalAmount: 500.0,
    invoiceItemsTaxAmount: 0.0,
    invoiceTaxAmount: 0.0,
    totalTaxAmount: 0.0,
    saleInvoiceID: "1",

    feesAmount: 1375.0,
    invoiceItemsDiscountAmount: 0.0,
    invoiceDiscountAmount: 0.0,
    totalDiscountAmount: 0.0,
    netAmount: 1875.0,
  },
  {
    totalAmount: 2480.0,
    invoiceItemsTaxAmount: 0.0,
    invoiceTaxAmount: 0.0,
    totalTaxAmount: 0.0,
    feesAmount: 1375.0,
    saleInvoiceID: "2",

    invoiceItemsDiscountAmount: 198.0,
    invoiceDiscountAmount: 0.0,
    totalDiscountAmount: 198.0,
    netAmount: 3657.0,
  },
];

const OrderCollapse = ({ schemas = SaleInvoiceSchema }) => {
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

  const localization = useSelector((state) => state.localization.localization);
  const voucherLocale = localization.Hum_screens.profile.collapses.find(
    (collapse) => collapse.type === "vouchers"
  ).childrenText;

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
            <Text className="font-bold text-base text-text">
              {schemas[0].dashboardFormSchemaInfoDTOView.schemaHeader}
            </Text>
          </HStack>
        </AccordionHeader>
        <AccordionContent>
          {/* <DynamicTable schemas={schemas} data={orders} /> */}
          <FlatList
            data={orders}
            keyExtractor={(item) => item[schemas[0].idField]}
            renderItem={({ item }) => (
              <CardSchema schemas={schemas} row={item} />
            )}
            contentContainerStyle={{ padding: 16 }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default OrderCollapse;
