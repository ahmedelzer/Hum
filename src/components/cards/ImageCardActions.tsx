import React from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";
import { Box } from "../../../components/ui";
import { theme } from "../../Theme";
import ImageRoute from "../../utils/component/ImageRoute";
import CardInteraction from "./CardInteraction";
import FaovertCardIcon from "./FaovertCardIcon";
import { Text } from "react-native";

export default function ImageCardActions({
  item,
  fieldsType,
  style = {},
  showFaovertIcon = true,
  children,
}) {
  return (
    <View className="w-full">
      {item[fieldsType.imageView] && (
        <Box
          key={`${fieldsType.imageView}-${item[fieldsType.imageView]}`}
          style={{
            width: scale(135),
            height: scale(135),
            borderRadius: scale(16),
            overflow: "hidden",
            backgroundColor: theme.body || "#fff",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
            position: "relative",
            ...style,
          }}
        >
          <ImageRoute route={item[fieldsType.imageView]} />

          {/* Floating Heart Icon */}
          {showFaovertIcon && (
            <FaovertCardIcon fieldsType={fieldsType} item={item} />
          )}
          {item[fieldsType.discount] && (
            <View className="absolute top-0 right-0 bg-red-500 px-2 py-1 rounded-tr-lg rounded-bl-lg">
              <Text className="text-body font-bold text-sm">
                {item[fieldsType.discount]}% OFF
              </Text>
            </View>
          )}

          {/* Top overlay for interaction */}
          {children && children}
        </Box>
      )}
    </View>
  );
}
