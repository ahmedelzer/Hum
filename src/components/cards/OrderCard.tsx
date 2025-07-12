import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import StepHeader from "../../components/splash/StepHeader";
import { getField } from "../../utils/operation/getField";
import { RenderCell } from "../table/RenderCell";
import DisplayDetilsItems from "../../kitchensink-components/profile/DisplayDetilsItems";
//!localization
export default function OrderCard({ order, schemas }) {
  const localization = useSelector((state) => state.localization.localization);
  const subSchemas = schemas.filter((schema, index) => index !== 0);
  const parameters = schemas[0].dashboardFormSchemaParameters;
  const [child, setChild] = useState(null);

  const ordersFieldsType = {
    orderType: getField(parameters, "orderType"),
    orderState: getField(parameters, "orderState"),
    details: getField(parameters, "detailsCell", false),
    invoiceNumber: getField(parameters, "text"),
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
      key={order[ordersFieldsType.idField]}
      className="bg-body p-4 rounded-xl mb-4 shadow-md mx-1"
    >
      <Text className="text-lg font-semibold mb-2">
        {localization.Hum_screens.orders.order} #
        {order[ordersFieldsType.invoiceNumber]}
      </Text>

      <StepHeader
        currentPosition={order[ordersFieldsType.orderState]}
        labels={labels}
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
    </View>
  );
}
