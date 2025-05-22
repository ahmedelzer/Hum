import React, { useContext } from "react";
import { View } from "react-native";
import { Text } from "../../../components/ui";
import { LocalizationContext } from "../../../context/LocalizationContext";
export default function CardPriceDiscount({ item, fieldsType }) {
  const { localization } = useContext(LocalizationContext);

  return (
    <View
      className={`${item[fieldsType.discount] ? "justify-between" : "justify-center"} flex flex-row flex-wrap items-center mt-2 space-x-2`}
    >
      {item[fieldsType.priceAfterDiscount] >= 0 && (
        <Text className="text-xl text-body font-bold">
          {localization.menu.currency}{" "}
          {item[fieldsType.priceAfterDiscount].toFixed(2)}
        </Text>
      )}
      {item[fieldsType.discount] && (
        <Text className="text-lg font-bold text-red-500 line-through">
          {localization.menu.currency} {item[fieldsType.price].toFixed(2)}
        </Text>
      )}
    </View>
  );
}
