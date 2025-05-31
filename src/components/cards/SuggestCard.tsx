import React from "react";
import { Text, View } from "react-native";
import { scale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { AddToCartPrimaryButton } from "../../kitchensink-components/cart/AddToCartButton";
import SuggestCardSchema from "../../Schemas/MenuSchema/SuggestCardSchema.json";
import { theme } from "../../Theme";
import CardPriceDiscount from "../../utils/component/CardPriceDiscount";
import ImageCardActions from "./ImageCardActions";

export default function SuggestCard({
  item,
  imageStyle = { width: scale(120), height: scale(120) },
  boxScale = 400,
  showPrice = true,
}) {
  const dynamicScale = boxScale / 100;
  const schemaActions = useSelector((state) => state.menuItem.schemaActions);
  const parameters = SuggestCardSchema?.dashboardFormSchemaParameters ?? [];
  const localization = useSelector((state) => state.localization.localization);
  const fieldsType = useSelector((state) => state.menuItem.fieldsType);
  return (
    <View
      className="bg-card rounded-lg items-center"
      style={{
        padding: 3 * dynamicScale,
        borderRadius: 5 * dynamicScale,
      }}
    >
      {/* Inner content with fixed layout */}
      <View className="items-center relative">
        <ImageCardActions
          fieldsType={fieldsType}
          item={item}
          style={imageStyle} // ⬅️ leave this fixed
        />

        {item[fieldsType.text] && (
          <View
            style={{
              position: "absolute",
              bottom: -10, // ⬅️ fixed
              alignSelf: "center",
            }}
          >
            <View
              className="px-2 py-1 rounded-md"
              style={{ backgroundColor: theme.accent }}
            >
              <Text className="text-body text-xs" numberOfLines={1}>
                {item[fieldsType.text]}
              </Text>
            </View>
          </View>
        )}
      </View>
      {showPrice && (
        <View className="mt-5 w-full items-center">
          <CardPriceDiscount
            colorOfPriceAfterDiscount={theme.dark_card}
            item={item}
            fieldsType={fieldsType}
            style={{ fontSize: 14 }}
          />
        </View>
      )}

      {item[fieldsType.imageView] && (
        <View className="w-full mt-2">
          <AddToCartPrimaryButton
            item={item}
            fieldsType={fieldsType}
            isSuggest
          />
        </View>
      )}
    </View>
  );
}
