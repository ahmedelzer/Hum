import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { theme } from "../../Theme";

export default function CardPriceDiscount({
  item,
  fieldsType,
  colorOfPriceAfterDiscount = theme.body,
  style,
}) {
  const localization = useSelector((state) => state.localization.localization);

  const price = item?.[fieldsType.price];
  const priceAfterDiscount = item?.[fieldsType.priceAfterDiscount];
  const hasDiscount = item?.[fieldsType.discount] > 0;

  // Compose final style
  const finalStyle = [
    styles.discountedPrice,
    { color: colorOfPriceAfterDiscount },
    style,
  ];

  return (
    <View style={styles.container}>
      {priceAfterDiscount >= 0 && (
        <Text style={finalStyle}>
          {localization.menu.currency} {priceAfterDiscount.toFixed(2)}
        </Text>
      )}
      {hasDiscount && (
        <Text style={styles.originalPrice}>
          {localization.menu.currency} {price.toFixed(2)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 8,
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8, // spacing between prices when discount exists
    textAlign: "center",
  },
  originalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    textDecorationLine: "line-through",
    textAlign: "center",
  },
});
