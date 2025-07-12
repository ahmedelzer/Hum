import { FontAwesome } from "@expo/vector-icons";
import { default as React, useEffect, useReducer, useState } from "react";
import { FlatList, Platform, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  Box,
  Button,
  ButtonText,
  HStack,
} from "../../../components/ui";
import { SetReoute } from "../../../request";
import { createRowCache } from "../../components/Pagination/createRowCache";
import { initialState } from "../../components/Pagination/initialState";
import reducer from "../../components/Pagination/reducer";
import ScratchVoucherCard from "../../Schemas/MenuSchema/NodeMenuItemsSchema.json";
import CustomerSaleInvoicesActions from "../../Schemas/Profile/CustomerSaleInvoicesActions.json";
import ShopSaleInvoiceItemSchema from "../../Schemas/Profile/ShopSaleInvoiceItemSchema.json";
import SaleInvoiceSchema from "../../Schemas/Profile/SaleInvoiceSchema.json";
import { prepareLoad } from "../../utils/operation/loadHelpers";
import DynamicTable from "../../components/table/DynamicTable";
import PopupModal from "../../utils/component/PopupModal";
import { useForm } from "react-hook-form";
import SelectForm from "../../utils/component/SelectForm";
import { OpeningInPopup } from "../../utils/operation/OpeningInPopup";
const VIRTUAL_PAGE_SIZE = 4;
const orders = [
  {
    costAmount: 300,
    totalCostAmount: 300,
    porfitAmount: 200,
    totalPorfitAmount: 200,
    weight: 0,
    width: 0,
    height: 0,
    length: 0,
    saleInvoiceItemID: "7fd90267-fea9-4fd6-8880-0429ce46a38d",
    saleInvoiceID: "bc25d239-3b0c-456a-9a5c-911fd824f40a",
    nodeMenuItemID: "91ed7c26-b372-4dac-8b6d-98d1d8ccb53e",
    quantity: 1,
    priceAmount: 500,
    totalPriceAmount: 500,
    taxAmount: 0,
    taxRate: 0,
    totalTaxAmount: 0,
    discountAmount: 0,
    discount: 0,
    totalDiscountAmount: 0,
    requestedReturnedQuantity: 0,
    returnedQuantity: 0,
    netRefundAmount: 0,
    remainingReturnableQuantity: 1,
    isReturnable: true,
    netAmount: 500,
    totalNetAmount: 500,
    preparingTimeAmountPerMinute: 10,
    totalPreparingTimeForItems: 10,
    itemState: 0,
    note: "",
    price: 500,
  },
  {
    costAmount: 550,
    totalCostAmount: 1650,
    porfitAmount: 44,
    totalPorfitAmount: 132,
    weight: 0,
    width: 0,
    height: 0,
    length: 0,
    saleInvoiceItemID: "18f05913-4ec9-4f66-811a-082c8ec3614f",
    saleInvoiceID: "bc25d239-3b0c-456a-9a5c-911fd824f40a",
    nodeMenuItemID: "084d8807-32b2-440f-a586-a3defe7f1b95",
    quantity: 3,
    priceAmount: 660,
    totalPriceAmount: 1980,
    taxAmount: 0,
    taxRate: 0,
    totalTaxAmount: 0,
    discountAmount: 66,
    discount: 10,
    totalDiscountAmount: 198,
    requestedReturnedQuantity: 0,
    returnedQuantity: 0,
    netRefundAmount: 0,
    remainingReturnableQuantity: 3,
    isReturnable: true,
    netAmount: 594,
    totalNetAmount: 1782,
    preparingTimeAmountPerMinute: 10,
    totalPreparingTimeForItems: 30,
    itemState: 0,
    note: "",
    price: 660,
  },
];
export default function DisplayDetilsItems({
  col,
  schemas = SaleInvoiceSchema,
}) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  console.log("isModalVisible", isModalVisible);
  const subSchema = schemas.find(
    (schema) => schema?.dashboardFormSchemaID === col?.lookupID
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const { openInPopup, splitSchemaType } = OpeningInPopup(subSchema);

  const [state, reducerDispatch] = useReducer(
    reducer,
    initialState(VIRTUAL_PAGE_SIZE, ScratchVoucherCard.idField)
  );
  const [reqError, setReqError] = useState(null);
  const [disable, setDisable] = useState(null);
  const [row, setRow] = useState(null);
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
    <View>
      {openInPopup ? (
        <PopupModal
          isOpen={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
            // Platform.OS !== "web" && reset();
          }}
          footer={
            <Button
              isDisabled={disable}
              variant="outline"
              action="secondary"
              //   onPress={onClose}
            >
              <ButtonText>{localization.formSteps.popup.cancel}</ButtonText>
            </Button>
          }
          isFormModal={false}
          headerTitle={subSchema.dashboardFormSchemaInfoDTOView.addingHeader}
          haveFooter={true}
        >
          <SelectForm
            data={orders}
            row={row}
            schemaID={col.lookupID}
            schemas={schemas}
            control={control}
            errorResult={errors}
          />
        </PopupModal>
      ) : (
        <View>
          <SelectForm
            data={orders}
            row={row}
            schemaID={col.lookupID}
            schemas={schemas}
            control={control}
            errorResult={errors}
          />
        </View>
      )}
    </View>
  );
}
