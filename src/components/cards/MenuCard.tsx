import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { I18nManager, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import {
  Box,
  Button,
  ButtonText,
  HStack,
  Image,
  Text,
  VStack,
} from "../../../components/ui";
import { AddToCartPrimaryButton } from "../../kitchensink-components/cart/AddToCartButton";
import { LocalizationContext } from "../../../context/LocalizationContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import GetIconMenuItem from "../../utils/GetIconMenuItem";
import { theme } from "../../Theme";
import { GetMediaUrl } from "../../utils/GetMediaUrl";
import ImageRoute from "../../utils/ImageRoute";
export const MenuCard = ({
  item,
  discountedPrice,
  fieldsType,
  schemaActions,
}) => {
  const { localization } = useContext(LocalizationContext);
  return (
    <View className={`relative flex flex-row `}>
      {item.discount && (
        <View className="absolute top-0 left-0 bg-red-500 px-2 py-1 rounded-tr-lg rounded-bl-lg">
          <Text className="text-body font-bold text-sm">
            {item.discount} OFF
          </Text>
        </View>
      )}

      <View className="w-1/2 flex justify-center items-center">
        {item[fieldsType.imageView] && (
          <Box
            className="rounded-2xl overflow-hidden"
            style={{ width: scale(128), height: scale(128) }}
          >
            <ImageRoute route={item[fieldsType.imageView]} />
          </Box>
        )}
        <HStack space="lg" className="items-center mt-2 flex-wrap">
          <GetIconMenuItem
            count={item[fieldsType.orders]}
            iconName={"orders"}
            size={18}
            style={{ marginHorizontal: scale(1), color: theme.accent }}
          />
          <GetIconMenuItem
            count={item[fieldsType.rate]}
            iconName={"rate"}
            size={18}
            style={{ marginHorizontal: scale(1), color: theme.accent }}
          />

          <GetIconMenuItem
            count={item[fieldsType.likes]}
            iconName={"likes"}
            size={18}
            style={{ marginHorizontal: scale(1), color: theme.accent }}
          />
          <GetIconMenuItem
            count={item[fieldsType.dislikes]}
            iconName={"dislikes"}
            size={18}
            style={{ marginHorizontal: scale(1), color: theme.accent }}
          />
        </HStack>
      </View>

      <View className="w-1/2 px-1">
        <VStack>
          <View
            className={
              I18nManager.isRTL ? "items-start" : "items-start" + " min-h-28"
            }
          >
            {item[fieldsType.text] && (
              <Text bold size="lg" className="!text-accent font-bold text-xl">
                {item[fieldsType.text]}
              </Text>
            )}
            {item[fieldsType.description] && (
              <Text className="text-primary-custom text-lg" numberOfLines={6}>
                {item[fieldsType.description]}
              </Text>
            )}
          </View>

          <View className="flex flex-col justify-end items-end mt-2 space-x-2">
            {item.discount && (
              <Text className="text-lg font-bold text-red-500 line-through">
                {localization.menu.currency} {item.price.toFixed(2)}
              </Text>
            )}
            {item[fieldsType.price] && (
              <Text className="text-xl font-bold">
                {localization.menu.currency} {discountedPrice.toFixed(2)}
              </Text>
            )}
          </View>
          {fieldsType.cardAction && (
            <AddToCartPrimaryButton
              item={item}
              // idField={fieldsType.idField}
              // field={fieldsType.cardAction}
              fieldsType={fieldsType}
              schemaActions={schemaActions}
            />
          )}
        </VStack>
      </View>
    </View>
  );
};
