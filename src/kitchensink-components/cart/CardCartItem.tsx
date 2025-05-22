import React, { useContext, useRef, useState } from "react";
import { I18nManager, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationContext } from "../../../context/LocalizationContext";
import CartSchemaActions from "../../Schemas/MenuSchema/CartSchemaActions.json";
import ImageRoute from "../../utils/component/ImageRoute";
import { AddToCartSecondaryButton } from "./AddToCartButton";
import FaovertCardIcon from "../../components/cards/FaovertCardIcon";
import { AntDesign } from "@expo/vector-icons";
import ImageCardActions from "../../components/cards/ImageCardActions";
import { getField } from "../../utils/operation/getField";
import { AddItemToCart } from "./AddItemToCart";
import { Swipeable } from "react-native-gesture-handler";
import { RenderDeleteAction } from "../../utils/component/renderDeleteAction";
import { getPaddedText } from "../../utils/operation/getPaddedText";
import InputWithAction from "../../utils/component/InputWithAction";
import { updateNotes } from "../../reducers/CartReducer";
import { handleSubmitWithCallback } from "../../utils/operation/handleSubmitWithCallback";

export default function CardCartItem({ schema, schemaActions, item }) {
  const { localization } = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);
  const parameters = schema?.dashboardFormSchemaParameters ?? [];
  const fieldsType = {
    imageView: getField(parameters, "menuItemImage"),
    text: getField(parameters, "menuItemName"),
    description: getField(parameters, "menuItemDescription"),
    price: getField(parameters, "price"),
    rate: getField(parameters, "rate"),
    likes: getField(parameters, "likes"),
    dislikes: getField(parameters, "dislikes"),
    orders: getField(parameters, "orders"),
    reviews: getField(parameters, "reviews"),
    isAvailable: getField(parameters, "isAvailable"),
    menuCategoryID: getField(parameters, "menuCategoryID"),
    idField: schema.idField,
    dataSourceName: schema.dataSourceName,
    cardAction: getField(parameters, "cardAction"),
    note: getField(parameters, "note"),
  };
  const onSubmitFun = (value) => {
    const putAction =
      schemaActions &&
      schemaActions.find(
        (action) => action.dashboardFormActionMethodType === "Post"
      );
    // dispatch(updateNotes({type:'add',value:value}))
    handleSubmitWithCallback({
      data: {
        [fieldsType.note]: value,
        [fieldsType.idField]: item[fieldsType.idField],
      },
      setDisable,
      action: putAction,
      proxyRoute: schema.proxyRoute,
      setReq: () => {},
      onSuccess: () => {},
    });
  };
  return (
    <Swipeable
      renderRightActions={
        !I18nManager.isRTL
          ? (progress, dragX) =>
              RenderDeleteAction(
                progress,
                dragX,
                item,
                fieldsType,
                schemaActions
              )
          : null
      }
      renderLeftActions={
        I18nManager.isRTL
          ? (progress, dragX) =>
              RenderDeleteAction(
                progress,
                dragX,
                item,
                fieldsType,
                schemaActions
              )
          : null
      }
    >
      <View className=" shadow-md mb-5">
        <View
          key={item[fieldsType.idField]}
          className="flex-row items-start relative !bg-card rounded-xl p-3"
        >
          {/* Card Content */}
          <View className="p-2 py-1">
            <ImageCardActions
              fieldsType={fieldsType}
              item={item}
              style={{
                width: scale(90),
                height: scale(90),
                borderRadius: moderateScale(20),
              }}
              showFaovertIcon={false}
            />
          </View>

          <View className="ml-4 flex-1 items-start">
            {item[fieldsType.text] && (
              <Text className="font-semibold text-lg text-surface">
                {item[fieldsType.text]}
              </Text>
            )}

            {item[fieldsType.description] && (
              <Text className="text-sm text-primary-custom">
                {getPaddedText(item[fieldsType.description], 3)}
              </Text>
            )}
            <View className="flex flex-row justify-between w-full">
              <AddToCartSecondaryButton item={item} fieldsType={fieldsType} />
            </View>
          </View>

          <View className="items-center flex flex-row">
            {item[fieldsType.price] && (
              <Text className="text-xl font-semibold text-body">
                {localization.menu.currency} {item[fieldsType.price]}
              </Text>
            )}
          </View>
        </View>
        <View>
          <InputWithAction
            placeholder={localization.Hum_screens.cart.saveOrderPlaceholder}
            submitButtonText={localization.Hum_screens.cart.submitButton}
            onSubmitFun={onSubmitFun}
          />
        </View>
        <View className="flex flex-row justify-center items-center gap-2 mt-2">
          {["note1", "note2", "note3"].map((item) => (
            <Text className="p-2 bg-primary-custom text-text rounded-full ">
              {item}
            </Text>
          ))}
        </View>
      </View>
    </Swipeable>
  );
}
