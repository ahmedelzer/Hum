import React from "react";
import { I18nManager, View } from "react-native";
import { scale } from "react-native-size-matters";
import { Text, VStack } from "../../../components/ui";
import { AddToCartPrimaryButton } from "../../kitchensink-components/cart/AddToCartButton";
import { theme } from "../../Theme";
import CardPriceDiscount from "../../utils/component/CardPriceDiscount";
import GetIconMenuItem from "../../utils/component/GetIconMenuItem";
import StarsIcons from "../../utils/component/StarsIcons";
import { getPaddedText } from "../../utils/operation/getPaddedText";
import CardInteraction from "./CardInteraction";
import ImageCardActions from "./ImageCardActions";
export const MenuCard = ({ item, fieldsType, schemaActions }) => {
  return (
    <View>
      <View className={`relative flex flex-row`}>
        <View className="w-1/2 justify-center items-end px-1">
          {/* <ImageCardActions fieldsType={fieldsType} item={item}>
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
          </ImageCardActions> */}

          {/* Rating + Orders Row */}
          {/* <View
            className="flex-row justify-between items-center mt-1"
            style={{ width: "100%", paddingHorizontal: scale(10) }}
          >
            {item[fieldsType.rate] && (
              <View
                className="flex-row items-center px-2"
                key={`${item[fieldsType.idField]}-${fieldsType.rate}-${item[fieldsType.rate]}`}
              >
                <StarsIcons value={parseFloat(item[fieldsType.rate])} />
              </View>
            )}
            <GetIconMenuItem
              count={item[fieldsType.orders]}
              iconName={"orders"}
              size={18}
              style={{ marginHorizontal: scale(1), color: theme.accent }}
            />
          </View> */}
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
                  {getPaddedText(`${item[fieldsType.description]}`)}
                </Text>
              )}
            </View>
            {/* <CardPriceDiscount fieldsType={fieldsType} item={item} /> */}

            {fieldsType.cardAction && fieldsType.isAvailable && (
              <AddToCartPrimaryButton
                itemPackage={item}
                fieldsType={fieldsType}
                schemaActions={schemaActions}
              />
            )}
          </VStack>
        </View>
      </View>
      {!false && (
        <View
          style={{
            position: "absolute",
            top: 1,
            right: -50, // push it out so it centers across top-right
            backgroundColor: theme.error,
            paddingHorizontal: 30,
            paddingVertical: 4,
            transform: [{ rotate: "45deg" }],
            zIndex: 200,
            overflow: "hidden",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>
            Out of Stock
          </Text>
        </View>
      )}
      {/* !make that section like in social media */}
    </View>
  );
};
