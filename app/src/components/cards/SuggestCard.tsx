import { View, Text } from "react-native";
import React from "react";
import { Image } from "../../../components/ui";
import { moderateScale, scale } from "react-native-size-matters";
import { TouchableOpacity } from "react-native";

export default function SuggestCard({ image, name, price }) {
  return (
    <View className="bg-card rounded-lg items-center p-2 mr-4">
      <Image
        source={{ uri: image }}
        className="w-20 h-20 rounded-md"
        style={{
          width: scale(70),
          height: scale(70),
          borderRadius: moderateScale(10),
        }}
        alt=""
      />
      <Text
        style={{
          maxWidth: scale(90),
        }}
        className="text-sm mt-2"
      >
        {name}
      </Text>
      <Text className="text-xs text-primary-custom">{price}</Text>
      <TouchableOpacity className="mt-2 bg-accent px-4 py-1 rounded-md">
        <Text className="text-body text-sm">+</Text>
      </TouchableOpacity>
    </View>
  );
}
