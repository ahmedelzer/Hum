import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
export const GetIconByName = (name, size = 24, style = "") => {
  switch (name) {
    case "like":
    case "likes":
      return <AntDesign name="like1" size={size} style={style} />;
    case "dislike":
    case "dislikes":
      return <AntDesign name="dislike1" size={size} style={style} />;
    case "like2":
    case "likes2":
      return <AntDesign name="like2" size={size} style={style} />;
    case "dislike2":
    case "dislikes2":
      return <AntDesign name="dislike2" size={size} style={style} />;
    case "normal":
      return (
        <MaterialIcons name="sentiment-satisfied" size={24} style={style} />
      );
    case "happy":
      return (
        <MaterialIcons name="sentiment-satisfied-alt" size={24} style={style} />
      );
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
export default function GetIconMenuItem({
  count,
  iconName,
  size,
  style,
  // onPress = () => {}, // extract it
  ...props
}) {
  return (
    <View className="flex-1 justify-center">
      {count >= 0 && (
        <View className="flex-row items-center">
          {GetIconByName(iconName, size, style)}
          <Text
            className="font-lg text-text mx-1"
            style={{ fontSize: moderateScale(15), ...style }}
          >
            {count}
          </Text>
        </View>
      )}
    </View>
  );
}
