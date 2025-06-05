// components/SkeletonLayout.js
import React from "react";
import { View } from "react-native";
import { theme } from "../../Theme";

const SkeletonLayout = ({
  itemCount = 1,
  width = "100%",
  height = 100,
  borderRadius = 10,
  spacing = 10,
  layout = "vertical", // or 'horizontal'
}) => {
  const isHorizontal = layout === "horizontal";

  return (
    <View
      style={{
        flexDirection: isHorizontal ? "row" : "column",
        justifyContent: "flex-start",
        alignItems: isHorizontal ? "center" : "stretch",
      }}
    >
      {[...Array(itemCount)].map((_, index) => (
        <View
          key={index}
          style={{
            width,
            height,
            borderRadius,
            marginBottom: isHorizontal ? 0 : spacing,
            marginRight: isHorizontal ? spacing : 0,
            backgroundColor: theme.card, // expo-skeleton-loading overrides this
          }}
        />
      ))}
    </View>
  );
};

export default SkeletonLayout;
