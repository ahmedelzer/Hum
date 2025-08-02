import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import StepHeader from "../../components/splash/StepHeader";
import { getField } from "../../utils/operation/getField";
import { RenderCell } from "../table/RenderCell";
import DisplayDetilsItems from "../../kitchensink-components/profile/DisplayDetilsItems";
import WarningPop from "../../utils/component/WarningPop";
import { Swipeable } from "react-native-gesture-handler";
import { RenderDeleteAction } from "../../utils/component/renderDeleteAction";
import { isRTL } from "../../utils/operation/isRTL";
import { theme } from "../../Theme";

//!localization
// {
//     "saleInvoiceID": "a7ed0866-1972-4e25-b29b-cc75b7a919e6",
//     "invoiceNumber": "133928486",
//     "requestedDatetime": "2025-08-02T13:39:28.4863904",
//     "shiftID": "607643ea-5230-45c3-aaad-37a7d3ee0d65",
//     "orderStateTypeID": "00000000-0000-0000-0000-000000000000",
//     "totalAmount": 550.00,
//     "invoiceItemsTaxAmount": 0.00,
//     "invoiceTaxAmount": 0.00,
//     "totalTaxAmount": 0.00,
//     "feesAmount": 0.00,
//     "invoiceItemsDiscountAmount": 0.00,
//     "invoiceDiscountAmount": 0.00,
//     "totalDiscountAmount": 0.00,
//     "netAmount": 550.00,
//     "customerName": null,
//     "customerContact": null,
//     "otherCustomerContact": null,
//     "orderState": null,
//     "orderType": null,
//     "orderTypeIndex": 0,
//     "orderStateIndex": 0,
//     "customerID": "303c1fd6-8036-4ae1-b2a0-fa08d76f4ce7",
//     "customerContactID": "0626d7aa-a295-4f16-b069-dc64548ab36a",
//     "otherCustomerContactID": null,
//     "note": null,
//     "isPaid": false
// }
export default function OrderCard({ order, schemas }) {
  const localization = useSelector((state) => state.localization.localization);
  const subSchemas = schemas.filter((schema, index) => index !== 0);
  const parameters = schemas[0].dashboardFormSchemaParameters;
  const [child, setChild] = useState(null);
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const ordersFieldsType = {
    orderType: getField(parameters, "orderType"),
    orderState: getField(parameters, "orderState"),
    details: getField(parameters, "detailsCell", false),
    invoiceNumber: getField(parameters, "invoiceNumber"),
    idField: schemas[0].idField,
    dataSourceName: schemas[0].dataSourceName,
  };
  // Get the correct step labels based on orderType
  const getStepLabels = (orderType) => {
    const pickupSteps = localization.Hum_screens.orders.pickupSteps;
    const deliverySteps = localization.Hum_screens.orders.deliverySteps;
    return orderType === 0 ? pickupSteps : deliverySteps;
  };
  const labels = getStepLabels(order[ordersFieldsType.orderType]);
  return (
    <View
      className="rounded-xl overflow-hidden !bg-error mb-4 shadow-md mx-1 !h-fit"
      style={{ backgroundColor: theme.error }}
    >
      <Swipeable
        renderRightActions={
          !isRTL()
            ? (progress, dragX) =>
                RenderDeleteAction(progress, dragX, () => setIsOpenAlert(true))
            : null
        }
        renderLeftActions={
          isRTL()
            ? (progress, dragX) =>
                RenderDeleteAction(progress, dragX, () => setIsOpenAlert(true))
            : null
        }
      >
        <View
          // key={order[ordersFieldsType.idField]}
          className="bg-body p-4 rounded-xl"
        >
          <Text className="text-lg font-semibold mb-2">
            {localization.Hum_screens.orders.order} #
            {order[ordersFieldsType.invoiceNumber]}
          </Text>

          <StepHeader
            currentPosition={order[ordersFieldsType.orderState]}
            labels={labels}
            customKey={`${order[ordersFieldsType.idField]}-${ordersFieldsType.orderState}-${order[ordersFieldsType.orderState]}`}
          />
          <View className=" justify-center items-center flex-row">
            <TouchableOpacity
              onPress={() =>
                setChild(
                  child ? null : (
                    <DisplayDetilsItems
                      col={ordersFieldsType.details}
                      schemas={subSchemas}
                      // setIsModalVisible={setIsModalVisible}
                    />
                  )
                )
              }
              className="mt-3 bg-accentHover px-4 py-2 rounded-lg self-start"
            >
              <Text className="text-body font-medium">
                {localization.Hum_screens.orders.showDetails}
              </Text>
            </TouchableOpacity>
          </View>
          {child && child}
          <WarningPop
            bodyText={localization.Hum_screens.orders.cancelConfirmationMessage}
            confirmText={localization.Hum_screens.orders.yes}
            handleClose={() => setIsOpenAlert(false)}
            handleConfirm={() => setIsOpenAlert(true)}
            headingText={
              localization.Hum_screens.orders.cancelConfirmationTitle
            }
            cancelText={localization.Hum_screens.orders.no}
            isOpen={isOpenAlert}
          />
        </View>
      </Swipeable>
    </View>
  );
}
