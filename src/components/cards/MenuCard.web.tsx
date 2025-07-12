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

export const MenuCardWeb = ({ item, fieldsType, schemaActions }) => {
  const { userGust } = useAuth();
  return (
    <View className="size-full grid grid-rows-[75%_25%] md:!flex">
      {/* <View className="size-full flex"> */}
      <View className="relative grid grid-cols-2 overflow-hidden w-full">
        {/* Image Section */}
        <View
          className="size-full flex-1 flex flex-col justify-between pe-0"
          style={{ flex: 8 }}
        >
          <Box className="rounded-2xl flex justify-center overflow-hidden w-full">
            <ImageCardActions
              fieldsType={fieldsType}
              item={item}
              className="!size-[115px] sm:!size-48 md:!size-40 !items-center"
            >
              <View
                pointerEvents="box-none"
                key={`${fieldsType.imageView}-${item[fieldsType.imageView]}`}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(0,0,0,0.25)",
                  zIndex: 100,
                  // zIndex: 0,
                }}
              >
                <CardInteraction fieldsType={fieldsType} item={item} />
              </View>
            </ImageCardActions>
          </Box>
          <View className="flex-col items-center">
            <View className="flex-row justify-between items-center mt-1 space-x-2">
              {item[fieldsType.rate] && (
                <View
                  className="flex-row"
                  key={`${item[fieldsType.idField]}-${fieldsType.rate}-${item[fieldsType.rate]}`}
                >
                  <StarsIcons value={parseFloat(item[fieldsType.rate])} />
                </View>
              )}
              <GetIconMenuItem
                count={formatCount(item[fieldsType.orders])}
                iconName={"orders"}
                size={18}
                style={{ marginHorizontal: scale(1), color: theme.accent }}
              />
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View className="w-full flex flex-col justify-between">
          <VStack>
            <View
              className={isRTL() ? "items-start" : "items-start" + " min-h-28"}
            >
              {item[fieldsType.text] && (
                <Text
                  bold
                  size="lg"
                  key={`${item[fieldsType.idField]}-${fieldsType.text}-${item[fieldsType.text]}`}
                  // key={`${item[fieldsType.text]}-${randomID}`}
                  className="!text-accent font-bold text-xl"
                >
                  {item[fieldsType.text]}
                </Text>
              )}
              {item[fieldsType.description] && (
                <Text
                  className="text-primary-custom text-lg"
                  numberOfLines={6}
                  key={`${item[fieldsType.idField]}-${fieldsType.description}-${item[fieldsType.description]}`}
                  //key={`${item[fieldsType.description]}-${randomID}`}
                >
                  {getPaddedText(`${item[fieldsType.description]}`, 3)}
                </Text>
              )}
            </View>
          </VStack>
          <CardPriceDiscount fieldsType={fieldsType} item={item} />
        </View>
      </View>
      <View className="flex flex-row justify-between items-center px-2">
        {/* Points */}
        <View className="relative w-6 h-6 justify-center items-center">
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

        {/* Add to Cart Button */}
        <View className="w-1/2">
          {fieldsType.cardAction && fieldsType.isAvailable && !userGust && (
            <AddToCartPrimaryButton
              itemPackage={item}
              fieldsType={fieldsType}
              schemaActions={schemaActions}
            />
          )}
        </View>
      </View>
      {/* {item[fieldsType.rewardPoints] && ( */}
      {/* <View
        style={{
          position: "absolute",
          bottom: 0,
          zIndex: 10,
        }}
        className="start-0"
      >
        <View className="relative w-6 h-6 justify-center items-center">
          <MaterialCommunityIcons
            name="gift-outline"
            size={24}
            color={theme.accent}
          />
          <View className="absolute -top-1 -end-2 bg-green-600 rounded-full px-1">
            <Text className="text-xs text-white font-bold">
              {item[fieldsType.rewardPoints]}10
            </Text>
          </View>
        </View>
      </View> */}
      {/* )} */}
    </View>
  );
};
