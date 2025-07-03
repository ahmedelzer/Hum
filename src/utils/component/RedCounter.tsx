import React from "react";
import { I18nManager, Platform, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { isRTL } from "../operation/isRTL";

const RedCounter = ({ count }) => {
  const className =
    Platform.OS === "web"
      ? "-end-2 -top-2"
      : `${isRTL() ? `left-0` : `right-0`}`;
  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: "red",
        width: moderateScale(18),
        height: moderateScale(18),
        borderRadius: moderateScale(9),
        justifyContent: "center",
        alignItems: "center",
      }}
      className={className}
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
