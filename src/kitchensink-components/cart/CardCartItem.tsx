import React, { useContext, useRef, useState } from "react";
import { I18nManager, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationContext } from "../../../context/LocalizationContext";
import CartSchemaActions from "../../Schemas/MenuSchema/CartSchemaActions.json";
import ImageRoute from "../../utils/component/ImageRoute";
import { AddToCartSecondaryButton } from "./AddToCartButton";
import FaovertCardIcon from "../../components/cards/FaovertCardIcon";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import ImageCardActions from "../../components/cards/ImageCardActions";
import { getField } from "../../utils/operation/getField";
import { AddItemToCart } from "./AddItemToCart";
import { Swipeable } from "react-native-gesture-handler";
import { RenderDeleteAction } from "../../utils/component/renderDeleteAction";
import { getPaddedText } from "../../utils/operation/getPaddedText";
import InputWithAction from "../../utils/component/InputWithAction";
import { updateNotes } from "../../reducers/CartReducer";
import { handleSubmitWithCallback } from "../../utils/operation/handleSubmitWithCallback";
import CardPriceDiscount from "../../utils/component/CardPriceDiscount";
import PopupModal from "../../utils/component/PopupModal";
// import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
export default function CardCartItem({ fieldsType, schemaActions, item }) {
  const { localization } = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
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
      proxyRoute: fieldsType.proxyRoute,
      setReq: () => {},
      onSuccess: () => {},
    });
  };
  const totalItemPrice =
    item[fieldsType.priceAfterDiscount] * item[fieldsType.cardAction];
  const [isSwiped, setIsSwiped] = useState(false);
  return (
    <View className="!bg-error ">
      <Swipeable
        onSwipeableOpen={() => setIsSwiped(true)}
        onSwipeableClose={() => setIsSwiped(false)}
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
        <View>
          <View
            key={item[fieldsType.idField]}
            className="flex flex-row flex-1 items-center justify-between relative !bg-dark_card rounded-xl p-3"
          >
            {/* Image Column */}
            <View className="p-2 py-1">
              <ImageCardActions
                fieldsType={fieldsType}
                item={item}
                style={{
                  width: scale(100),
                  height: scale(100),
                  borderRadius: moderateScale(20),
                }}
                showFaovertIcon={false}
              />
            </View>

            {/* Content Column */}
            <View className="ml-4 flex-1 items-start justify-between">
              <View className=" flex-row w-full items-center justify-between">
                {item[fieldsType.text] && (
                  <Text className="font-semibold text-lg text-surface">
                    {item[fieldsType.text]}
                  </Text>
                )}
                {item[fieldsType.priceAfterDiscount] && (
                  <View className="items-center flex flex-row mt-2">
                    <Text className="text-xl font-semibold text-body">
                      {localization.menu.currency} {totalItemPrice.toFixed(2)}
                    </Text>
                  </View>
                )}
              </View>

              {item[fieldsType.description] && (
                <Text className="text-sm text-primary-custom">
                  {getPaddedText(item[fieldsType.description], 2)}
                </Text>
              )}
              <View className="flex flex-row justify-center items-center w-full">
                <CardPriceDiscount fieldsType={fieldsType} item={item} />
              </View>

              {item[fieldsType.cardAction] && (
                <View className="flex flex-row justify-between w-full">
                  <AddToCartSecondaryButton
                    item={item}
                    fieldsType={fieldsType}
                  />
                </View>
              )}
            </View>

            {/* Edit Icon in bottom-right */}
            <View className="absolute bottom-3 right-3">
              <TouchableOpacity
                className="bg-accentHover p-1 rounded-lg"
                onPress={setModalOpen}
              >
                <FontAwesome
                  name="edit"
                  size={18}
                  className="!text-body ms-2"
                />
              </TouchableOpacity>
            </View>
          </View>

          <PopupModal
            isOpen={modalOpen}
            onSubmit={onSubmitFun}
            onClose={() => setModalOpen(false)}
            headerTitle="set notes"
            isFormModal={false}
          >
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
          </PopupModal>
        </View>
      </Swipeable>
    </View>
  );
}
