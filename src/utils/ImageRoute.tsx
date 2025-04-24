import { View, Text } from "react-native";
import React from "react";
import { Image } from "../../components/ui";
import { GetMediaUrl } from "./GetMediaUrl";

export default function ImageRoute({ route }) {
  console.log(route);

  return (
    <View>
      <Image
        resizeMode="cover"
        className="w-full h-full"
        source={{
          uri: GetMediaUrl(route, "publicImage"),
        }}
        alt="food"
      />
    </View>
  );
}
