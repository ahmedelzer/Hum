import React from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { theme } from "../../Theme";
import { AddItemToCart } from "../../kitchensink-components/cart/AddItemToCart";

const deleteActionStyles = StyleSheet.create({
  actionButton: {
    backgroundColor: theme.error,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: "100%",
  },
});

export const RenderDeleteAction = (progress, dragX, deleteItem) => {
  const trans = dragX.interpolate({
    inputRange: [0, 50, 100, 101],
    outputRange: [0, 0, 0, 1],
  });

  return (
    <View style={deleteActionStyles.actionButton}>
      <Animated.View
      // style={{ transform: [{ translateX: trans }] }}
      >
        <TouchableOpacity
          onPress={deleteItem}
          className={"px-2 text-body  rounded-full py-2"}
        >
          <AntDesign name="delete" size={18} className="!text-body" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
