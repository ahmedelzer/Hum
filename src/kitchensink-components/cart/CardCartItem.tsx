import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { LocalizationContext } from "../../../context/LocalizationContext";
import { moderateScale, scale } from "react-native-size-matters";
import SuggestCard from "../../components/cards/SuggestCard";
import { AddToCartSecondaryButton } from "./AddToCartButton";
import GoBackHeader from "../../components/header/GoBackHeader";
import { Image } from "../../../components/ui";
import { GetMediaUrl } from "../../utils/GetMediaUrl";
import ImageRoute from "../../utils/ImageRoute";

export default function CardCartItem({ item }) {
  const { isRTL, localization } = useContext(LocalizationContext);

  const fieldsType = useSelector((state) => state.menuItem.fieldsType);
  return (
    <View key={item[fieldsType.idField]} className="mb-5 flex-row items-start">
      {item[fieldsType.imageView] && (
        <View
          style={{
            width: scale(80),
            height: scale(80),
            borderRadius: moderateScale(10),
          }}
        >
          <ImageRoute route={item[fieldsType.imageView]} />
        </View>
      )}
      <View className="ml-4 flex-1 items-start">
        {item[fieldsType.text] && (
          <Text className="font-semibold text-lg text-accent">
            {item[fieldsType.text]}
          </Text>
        )}

        {item[fieldsType.description] && (
          <Text className="text-sm text-primary-custom">
            {item[fieldsType.description]}
          </Text>
        )}

        <AddToCartSecondaryButton item={item} fieldsType={fieldsType} />
      </View>
      {item[fieldsType.price] && (
        <Text className="text-lg font-semibold">
          {localization.menu.currency} {item[fieldsType.price]}
        </Text>
      )}
    </View>
  );
}
