import React from "react";
import { Image, View } from "react-native";
import { GetMediaUrl } from "../operation/GetMediaUrl";
export default function ImageRoute({ route }) {
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
