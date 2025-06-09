import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { theme } from "../../Theme";
import { Text } from "react-native";
export default function CardPriceDiscount({
  item,
  fieldsType,
  colorOfPriceAfterDiscount = theme.body,
  style, // don't set default here because it depends on colorOfPriceAfterDiscount
}) {
  const localization = useSelector((state) => state.localization.localization);

  // Compose final style merging the passed style and colorOfPriceAfterDiscount
  const finalStyle = [
    { fontSize: 18, fontWeight: "bold", color: colorOfPriceAfterDiscount },
    style,
  ];

  return (
    <View
      className={
        item[fieldsType.discount]
          ? "justify-between flex-row flex-wrap items-center mt-2 space-x-2"
          : "justify-center flex-row flex-wrap items-center mt-2 space-x-2"
      }
      // If you don't use nativewind, convert these to style object
    >
      {item[fieldsType.priceAfterDiscount] >= 0 && (
        <Text style={finalStyle}>
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
