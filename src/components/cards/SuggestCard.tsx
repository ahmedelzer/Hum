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

export default function SuggestCard({ item }) {
  const schemaActions = useSelector((state) => state.menuItem.schemaActions);
  const parameters = SuggestCardSchema?.dashboardFormSchemaParameters ?? [];
  const { localization } = useContext(LocalizationContext);

  const fieldsType = {
    imageView: getField(parameters, "menuItemImage"),
    text: getField(parameters, "menuItemName"),
    price: getField(parameters, "price"),
    isAvailable: getField(parameters, "isAvailable"),
    idField: SuggestCardSchema.idField,
    dataSourceName: SuggestCardSchema.dataSourceName,
    cardAction: getField(parameters, "cardAction"),
  };
  return (
    <View className="bg-surface rounded-lg items-center p-2 mr-4">
      {item[fieldsType.text] && (
        <Text
          style={{
            maxWidth: scale(90),
          }}
          className="text-lg text-text mt-1"
        >
          {item[fieldsType.text]}
        </Text>
      )}
      <ImageCardActions
        fieldsType={fieldsType}
        item={item}
        style={{ width: scale(120), height: scale(120) }}
      ></ImageCardActions>

      <CardPriceDiscount item={item} fieldsType={fieldsType} />

      {item[fieldsType.imageView] && (
        <AddToCartPrimaryButton item={item} fieldsType={fieldsType} isSuggest />
      )}
    </View>
  );
}
