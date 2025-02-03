import { View, Text } from "react-native";
import React, { useContext } from "react";
import { moderateScale } from "react-native-size-matters";
import { LocalizationContext } from "../../context/LocalizationContext";

const RedCounter = ({ count }) => {
  const { isRTL } = useContext(LocalizationContext);

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
      className={`${isRTL ? "left-0" : "right-0"}`}
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
