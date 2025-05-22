import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Box, Image } from "../../../components/ui";
import { moderateScale, scale } from "react-native-size-matters";
import { TouchableOpacity } from "react-native";
import SuggestCardSchema from "../../Schemas/MenuSchema/SuggestCardSchema.json";
import { useSelector } from "react-redux";
import { AddToCartPrimaryButton } from "../../kitchensink-components/cart/AddToCartButton";
import ImageRoute from "../../utils/component/ImageRoute";
import { GetMediaUrl } from "../../utils/operation/GetMediaUrl";
import { LocalizationContext } from "../../../context/LocalizationContext";
import { theme } from "../../Theme";
import FaovertCardIcon from "./FaovertCardIcon";
import { getField } from "../../utils/operation/getField";
import CardPriceDiscount from "../../utils/component/CardPriceDiscount";
import ImageCardActions from "./ImageCardActions";

export default function SuggestCard({
  item,
  imageStyle = { width: scale(120), height: scale(120) },
}) {
  const schemaActions = useSelector((state) => state.menuItem.schemaActions);
  const parameters = SuggestCardSchema?.dashboardFormSchemaParameters ?? [];
  const { localization } = useContext(LocalizationContext);
  const fieldsType = useSelector((state) => state.menuItem.fieldsType);
  return (
    <View className="bg-card rounded-lg flex flex-col justify-center items-center p-2">
      <View className="items-center relative">
        {/* Image with relative wrapper */}
        <ImageCardActions
          fieldsType={fieldsType}
          item={item}
          style={imageStyle}
        />

        {/* Label half inside and half outside image */}
        {item[fieldsType.text] && (
          <View
            style={{
              position: "absolute",
              bottom: scale(-20), // Push half outside the image
              alignItems: "center",
            }}
            className="mb-4 !size-full"
          >
            <View
              style={{
                backgroundColor: theme.accent, // or use theme or class like "bg-accent"
                borderRadius: scale(12),
                paddingHorizontal: scale(8),
                paddingVertical: scale(4),
              }}
              className="!size-full"
            >
              <Text className="text-body" numberOfLines={1}>
                {item[fieldsType.text]}
              </Text>
            </View>
          </View>
        )}
      </View>

      <CardPriceDiscount
        colorOfPriceAfterDiscount={theme.dark_card}
        item={item}
        fieldsType={fieldsType}
      />

      {item[fieldsType.imageView] && (
        <AddToCartPrimaryButton item={item} fieldsType={fieldsType} isSuggest />
      )}
    </View>
  );
}
