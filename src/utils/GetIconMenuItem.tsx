import { View, Text } from "react-native";
import React from "react";
import { Button, ButtonText } from "../../components/ui";
import { moderateScale } from "react-native-size-matters";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export const GetIconByName = (name, size = 24, style = "") => {
  switch (name) {
    case "like":
    case "likes":
      return <AntDesign name="like1" size={size} style={style} />;
    case "dislike":
    case "dislikes":
      return <AntDesign name="dislike1" size={size} style={style} />;
    case "rate":
      return <FontAwesome name="star" size={size} style={style} />;
    case "order":
    case "orders":
      return <FontAwesome5 name="shopping-cart" size={size} style={style} />;
    case "review":
    case "reviews":
      return <MaterialIcons name="rate-review" size={size} style={style} />;
    default:
      return null; // Return null for unknown names to avoid rendering issues
  }
};
export default function GetIconMenuItem({ count, iconName, size, style }) {
  return (
    <View>
      {count >= 0 && (
        <Button variant="link">
          <ButtonText
            className="font-medium text-text"
            style={{ fontSize: moderateScale(12) }}
          >
            {count}
          </ButtonText>
          {GetIconByName(iconName, size, style)}
        </Button>
      )}
    </View>
  );
}
