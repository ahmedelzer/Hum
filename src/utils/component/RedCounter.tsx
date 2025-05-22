import React from "react";
import { I18nManager, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

const RedCounter = ({ count }) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        backgroundColor: "red",
        width: moderateScale(18),
        height: moderateScale(18),
        borderRadius: 9,
        justifyContent: "center",
        alignItems: "center",
      }}
      className={`${I18nManager.isRTL ? "left-0" : "right-0"}`}
    >
      <Text
        style={{
          fontSize: moderateScale(10),
          fontWeight: "bold",
        }}
        className="text-body"
      >
        {count}
      </Text>
    </View>
  );
};

export default RedCounter;
