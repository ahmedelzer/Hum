import React, { useRef } from "react";
import { Image, View, Platform } from "react-native";
import { GetMediaUrl } from "../operation/GetMediaUrl";
import { useSelector } from "react-redux";

export default function ImageRoute({ item }) {
  const fieldsType = useSelector((state) => state.menuItem.fieldsType);
  const route = item[fieldsType.imageView];

  // Cache the image URL using useRef so it's computed only once per render cycle
  const imageUrlRef = useRef(GetMediaUrl(route, "publicImage"));

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {Platform.OS === "web" ? (
        <img
          src={imageUrlRef.current}
          alt={item[fieldsType.text]}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <Image
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
          source={{ uri: imageUrlRef.current }}
        />
      )}
    </View>
  );
}
