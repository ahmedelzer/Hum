import React from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";
import { Box } from "../../../components/ui";
import { theme } from "../../Theme";
import ImageRoute from "../../utils/component/ImageRoute";
import CardInteraction from "./CardInteraction";
import FaovertCardIcon from "./FaovertCardIcon";
import { Text } from "react-native";
import { useSelector } from "react-redux";

export default function ImageCardActions({
  item,
  fieldsType,
  style = { width: scale(135) },
  showFaovertIcon = true,
  children,
  className = "",
}) {
  const localization = useSelector((state) => state.localization.localization);
  const discountWidth = (style?.width / 100) * 55;
  return (
    <View className="size-full items-center">
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
          className={className}
        >
          <ImageRoute item={item} />

          {/* Floating Heart Icon */}
          {showFaovertIcon && (
            <FaovertCardIcon fieldsType={fieldsType} item={item} />
          )}
          {item[fieldsType.discount] > 0 && (
            <View className="absolute top-0 right-0 bg-red-500 px-2 py-1 rounded-tr-lg rounded-bl-lg w-1/2">
              <Text className="text-body font-bold text-sm">
                {item[fieldsType.discount]}% {localization.menu.off}
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
