import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { HStack, VStack } from "../../../components/ui";
import CreditsSchema from "../../Schemas/Profile/CreditsSchema.json";
import { theme } from "../../Theme";
import { formatCount } from "../../utils/operation/formatCount";
import { getField } from "../../utils/operation/getField";
import InvoiceSummary from "./InvoiceSummary";
import AddressLocationSchema from "../../Schemas/AddressLocation/AddressLocation.json";
import PopupModal from "../../utils/component/PopupModal";

export default function Invoice({ cartRows, row }) {
  const localization = useSelector((state) => state.localization.localization);
  const fieldsType = useSelector((state) => state.menuItem.fieldsType);
  const selectedTab = useSelector((state) => state.location.selectedTab);
  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation
  );
  const [selectedMethod, setSelectedMethod] = useState("card");

  const creditField = getField(
    CreditsSchema.dashboardFormSchemaParameters,
    "credit",
    false
  );

  const pointsField = getField(
    CreditsSchema.dashboardFormSchemaParameters,
    "points",
    false
  );
  const displayLookupParam =
    AddressLocationSchema.dashboardFormSchemaParameters.find(
      (pram) => pram.parameterType == "displayLookup"
    );
  // Helper: Get formatted address
  const getAddress = () => {
    if (selectedTab === 0)
      return localization.Hum_screens.orders.pickup || "Pickup";
    if (!selectedLocation) return "No address selected";
    console.log(selectedLocation);

    return `${selectedLocation[displayLookupParam.lookupDisplayField]}`;
  };

  return (
    <PopupModal
      isOpen={true}
      haveFooter={false}
      onClose={() => {}}
      onSubmit={() => {}}
      control={{}}
      isFormModal={false}
      haderTitle="Invoice Summary"
    >
      <View className="bg-body p-4 rounded-2xl shadow-md w-full max-w-md">
        {/* 🧾 Order Items */}
        <Text className="text-base font-semibold mb-2">Order Items</Text>
        <FlatList
          data={cartRows}
          keyExtractor={(item) => item[fieldsType.idField]}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center mb-3">
              <View className="flex-1 pr-2">
                <Text className="font-medium">{item[fieldsType.text]}</Text>
                <Text className="text-sm text-primary-custom">
                  {item[fieldsType.description]}
                </Text>
                <Text className="text-sm">
                  Qty: {item[fieldsType.cardAction]}
                </Text>
              </View>
              <View className="items-end">
                {item[fieldsType.discount] > 0 && (
                  <Text className="text-sm line-through text-red-400">
                    {localization.menu.currency}{" "}
                    {item[fieldsType.price].toFixed(2)}
                  </Text>
                )}
                {item[fieldsType.priceAfterDiscount] >= 0 && (
                  <Text className="text-base font-semibold text-green-600">
                    {localization.menu.currency}{" "}
                    {item[fieldsType.priceAfterDiscount].toFixed(2)}
                  </Text>
                )}
              </View>
            </View>
          )}
        />
        e{/* 🧮 Summary */}
        <Text className="text-base font-semibold mt-5 mb-2">Summary</Text>
        {/* <InvoiceSummary row={row} setRow={() => {}} /> */}
        {/* 💳 Payment Method */}
        <Text className="text-base font-semibold mt-5 mb-2">
          Payment Method
        </Text>
        <VStack>
          <HStack space="xs" className="items-center">
            <FontAwesome
              name="credit-card"
              size={14}
              color={theme.accentHover}
            />
            <Text className="text-primary-custom text-sm">
              {creditField.parameterTitel}:{" "}
              {formatCount(row[creditField.lookupDisplayField])}
            </Text>
          </HStack>
          <HStack space="xs" className="items-center mt-1">
            <FontAwesome name="star" size={14} color="#facc15" />
            <Text className="text-primary-custom text-sm">
              {pointsField.parameterTitel}:{" "}
              {formatCount(row[pointsField.lookupDisplayField])}
            </Text>
          </HStack>
        </VStack>
        {/* 🏠 Address */}
        <Text className="text-base font-semibold mt-5 mb-2">Address</Text>
        <Text className="text-sm text-primary-custom">{getAddress()}</Text>
        {/* 🧾 Debug Info (Optional) */}
        {/* <Text>isFastWay: {row.isFastWay?.toString()}</Text> */}
        {/* <Text>Selected Tab: {selectedTab}</Text> */}
        {/* ✅ Confirm Button */}
        <TouchableOpacity className="bg-green-600 mt-5 py-3 rounded-xl">
          <Text className="text-body text-center font-semibold">
            Confirm & Pay
          </Text>
        </TouchableOpacity>
      </View>
    </PopupModal>
  );
}
