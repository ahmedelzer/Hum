import React, { useState } from "react";
import { View, Text, Pressable, I18nManager } from "react-native";
import { CollapsibleSection } from "../../utils/component/Collapsible";
import { isRTL } from "../../utils/operation/isRTL";

export default function ShippingOptions() {
  const [shippingMethod, setShippingMethod] = useState("standard");

  const options = [
    {
      value: "standard",
      title: "Standard Shipping",
      description: "Delivery in 5-7 business days",
      price: "$5.00",
    },
    {
      value: "express",
      title: "Express Shipping",
      description: "Delivery in 1-3 business days",
      price: "$15.00",
    },
    {
      value: "overnight",
      title: "Overnight Shipping",
      description: "Next day delivery",
      price: "$25.00",
    },
  ];

  return (
    <View className="mt-6 border border-accent rounded-xl p-4">
      <CollapsibleSection title="Shipping Options" icon={null} setheader={true}>
        <View className="bg-body rounded-xl shadow-md p-4 mb-6">
          <Text className="text-lg font-semibold mb-4">Shipping Options</Text>

          {options.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => setShippingMethod(option.value)}
              className={`flex-row items-center p-3 border rounded-lg mb-3 ${
                shippingMethod === option.value
                  ? "bg-gray-100 border-gray-400"
                  : "border-gray-300"
              }`}
              style={{
                flexDirection: isRTL() ? "row-reverse" : "row",
              }}
            >
              <View className="h-5 w-5 rounded-full me-3 border-2 border-gray-600 items-center justify-center">
                {shippingMethod === option.value && (
                  <View className="h-2.5 w-2.5 rounded-full bg-gray-600" />
                )}
              </View>

              <View className="flex-1">
                <Text className="font-medium text-base">{option.title}</Text>
                <Text className="text-sm text-gray-500">
                  {option.description}
                </Text>
              </View>

              <Text className="font-medium ms-auto">{option.price}</Text>
            </Pressable>
          ))}
        </View>
      </CollapsibleSection>
    </View>
  );
}
