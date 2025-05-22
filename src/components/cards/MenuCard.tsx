import React, { useContext } from "react";
import { I18nManager, View } from "react-native";
import { scale } from "react-native-size-matters";
import { Box, Text, VStack } from "../../../components/ui";
import { LocalizationContext } from "../../../context/LocalizationContext";
import { theme } from "../../Theme";
import GetIconMenuItem from "../../utils/component/GetIconMenuItem";
import ImageRoute from "../../utils/component/ImageRoute";
import StarsIcons from "../../utils/component/StarsIcons";
import CardInteraction from "./CardInteraction";
import FaovertCardIcon from "./FaovertCardIcon";
import { AddToCartPrimaryButton } from "../../kitchensink-components/cart/AddToCartButton";
import ImageCardActions from "./ImageCardActions";
import { getPaddedText } from "../../utils/operation/getPaddedText";
import CardPriceDiscount from "../../utils/component/CardPriceDiscount";
export const MenuCard = ({ item, fieldsType, schemaActions }) => {
  const { localization } = useContext(LocalizationContext);

  console.log(
    item[fieldsType.priceAfterDiscount],
    "item[fieldsType.priceAfterDiscount]"
  );
  return (
    <View>
      <View className={`relative flex flex-row`}>
        <View className="w-1/2 justify-center items-end px-1">
          <ImageCardActions fieldsType={fieldsType} item={item}>
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

          {/* Rating + Orders Row */}
          <View
            className="flex-row justify-between items-center mt-1"
            style={{ width: "100%", paddingHorizontal: scale(10) }}
          >
            {item[fieldsType.rate] && (
              <View className="flex-row items-center px-2">
                <StarsIcons value={parseFloat(item[fieldsType.rate])} />
              </View>
            )}
            <GetIconMenuItem
              count={item[fieldsType.orders]}
              iconName={"orders"}
              size={18}
              style={{ marginHorizontal: scale(1), color: theme.accent }}
            />
          </View>
        </View>

        <View className="w-1/2 px-1">
          <VStack>
            <View
              className={
                I18nManager.isRTL ? "items-start" : "items-start" + " min-h-28"
              }
            >
              {item[fieldsType.text] && (
                <Text
                  bold
                  size="lg"
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
                  //key={`${item[fieldsType.description]}-${randomID}`}
                >
                  {getPaddedText(`${item[fieldsType.description]}`)}
                </Text>
              )}
            </View>
            <CardPriceDiscount fieldsType={fieldsType} item={item} />

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
      {/* !make that section like in social media */}
    </View>
  );
};
