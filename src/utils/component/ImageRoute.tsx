import React from "react";
import { Image, View, Platform } from "react-native";
import { GetMediaUrl } from "../operation/GetMediaUrl";
import { useSelector } from "react-redux";

export default function ImageRoute({ item }) {
  const fieldsType = useSelector((state) => state.menuItem.fieldsType);
  const route = item[fieldsType.imageView];
  const imageUrl = GetMediaUrl(route, "publicImage");

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {Platform.OS === "web" ? (
        <img
          src={imageUrl}
          alt={item[fieldsType.text]}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <Image
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
          source={{ uri: imageUrl }}
        />
      )}
    </View>
  );
}
