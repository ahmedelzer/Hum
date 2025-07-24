import { default as React } from "react";
import { Text, View } from "react-native";
import { scale } from "react-native-size-matters";
import { Box, VStack } from "../../../components/ui";
import { AddToCartPrimaryButton } from "../../kitchensink-components/cart/AddToCartButton";
import { theme } from "../../Theme";
import CardPriceDiscount from "../../utils/component/CardPriceDiscount";
import GetIconMenuItem from "../../utils/component/GetIconMenuItem";
import StarsIcons from "../../utils/component/StarsIcons";
import { getPaddedText } from "../../utils/operation/getPaddedText";
import { isRTL } from "../../utils/operation/isRTL";
import CardInteraction from "./CardInteraction";
import ImageCardActions from "./ImageCardActions";
import { useAuth } from "../../../context/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { formatCount } from "../../utils/operation/formatCount";
import { getResponsiveImageSize } from "../../utils/component/getResponsiveImageSize";
import { useSelector } from "react-redux";

export const MenuCardWeb = ({ item, fieldsType, schemaActions }) => {
  const imageSize = getResponsiveImageSize(0.3, { min: 80, max: 100 });
  const localization = useSelector((state) => state.localization.localization);

  const { userGust } = useAuth();
  return (
    <View className="size-full grid grid-rows-[75%_25%] md:!flex">
      {/* <View className="size-full flex"> */}
      <View className="relative grid grid-cols-2 overflow-hidden w-full">
        {/* Image Section */}
        <View className="w-full flex flex-col">
          {/* Row 1: Image */}
          <Box className="w-full flex justify-center items-center overflow-hidden rounded-2xl">
            <ImageCardActions
              fieldsType={fieldsType}
              item={item}
              style={{ width: imageSize, height: imageSize }}
              className="size-[80%] md:!size-40"
            >
              <View
                pointerEvents="box-none"
                key={`${item[fieldsType.idField]}-${fieldsType.imageView}-${item[fieldsType.imageView]}`}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(0,0,0,0.25)",
                  zIndex: 100,
                }}
              >
                <CardInteraction fieldsType={fieldsType} item={item} />
              </View>
            </ImageCardActions>
          </Box>

          {/* Row 2: Rating and Orders */}
          <View
            className="flex-row items-center justify-center space-x-4 mt-2 w-full"
            style={{ flexWrap: "wrap" }} // allows wrap on small screens
          >
            {/* Column 1 - Stars (only shown if rating exists) */}
            {fieldsType.rate && item[fieldsType.rate] && (
              <View
                className="flex-row items-center"
                key={`${item[fieldsType.idField]}-${fieldsType.rate}-${item[fieldsType.rate]}`}
              >
                <StarsIcons value={parseFloat(item[fieldsType.rate])} />
              </View>
            )}

            {/* Column 2 - Orders */}
            {fieldsType.orders && item[fieldsType.orders] && (
              <View
                className="flex-row items-center"
                key={`${item[fieldsType.idField]}-${fieldsType.orders}-${item[fieldsType.orders]}`}
              >
                <GetIconMenuItem
                  count={formatCount(item[fieldsType.orders])}
                  iconName={"orders"}
                  size={18}
                  style={{ marginHorizontal: scale(1), color: theme.accent }}
                />
              </View>
            )}
          </View>
        </View>

        {/* Content Section */}
        <View className="w-full flex flex-col justify-between">
          <VStack>
            <View
              className={isRTL() ? "items-start" : "items-start" + " min-h-28"}
            >
              {fieldsType.text && item[fieldsType.text] && (
                <Text
                  numberOfLines={2}
                  bold
                  size="lg"
                  key={`${item[fieldsType.idField]}-${fieldsType.text}-${item[fieldsType.text]}`}
                  // key={`${item[fieldsType.text]}-${randomID}`}
                  className="!text-accent font-bold text-xl"
                >
                  {item[fieldsType.text]}
                </Text>
              )}
              {fieldsType.description && item[fieldsType.description] && (
                <Text
                  className="text-primary-custom text-lg"
                  numberOfLines={6}
                  key={`${item[fieldsType.idField]}-${fieldsType.description}-${item[fieldsType.description]}`}
                  //key={`${item[fieldsType.description]}-${randomID}`}
                >
                  {getPaddedText(`${item[fieldsType.description]}`, 2)}
                </Text>
              )}
            </View>
          </VStack>
          <CardPriceDiscount fieldsType={fieldsType} item={item} />
        </View>
      </View>
      <View className="flex flex-row justify-between items-center px-2">
        {/* Points */}
        {fieldsType.rewardPoints && item[fieldsType.rewardPoints] && (
          <View
            className="relative w-6 h-6 justify-center items-center"
            key={`${item[fieldsType.idField]}-${fieldsType.rewardPoints}-${item[fieldsType.rewardPoints]}`}
          >
            <MaterialCommunityIcons
              name="gift-outline"
              size={24}
              color={theme.accent}
            />
            <View className="absolute -top-1 -end-2 bg-green-600 rounded-full px-1">
              <Text className="text-xs text-white font-bold">
                {item[fieldsType.rewardPoints] ?? 0}
              </Text>
            </View>
          </View>
        )}

        {/* Add to Cart Button */}
        <View
          key={`${item[fieldsType.idField]}-${fieldsType.isAvailable}-${item[fieldsType.isAvailable]}`}
          className="w-1/2"
        >
          {fieldsType.cardAction &&
            fieldsType.isAvailable &&
            item[fieldsType.isAvailable] &&
            !userGust && (
              <AddToCartPrimaryButton
                itemPackage={item}
                fieldsType={fieldsType}
                schemaActions={schemaActions}
              />
            )}
        </View>
      </View>
      {fieldsType.isAvailable && !item[fieldsType.isAvailable] && (
        <View
          key={`${item[fieldsType.idField]}-${fieldsType.isAvailable}-${item[fieldsType.isAvailable]}`}
          style={{
            backgroundColor: theme.error,
            paddingHorizontal: 30,
            paddingVertical: 4,
            zIndex: 200,
            overflow: "hidden",
          }}
          className={`${isRTL() ? "-left-[50px] -rotate-45" : "-right-[50px] rotate-45"} absolute`}
        >
          <Text style={{ color: theme.body, fontWeight: "bold", fontSize: 12 }}>
            {localization.Hum_screens.menu.outOfStock}
          </Text>
        </View>
      )}
    </View>
  );
};
