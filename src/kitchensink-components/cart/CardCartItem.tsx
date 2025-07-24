import { FontAwesome } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { I18nManager, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { moderateScale, scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import ImageCardActions from "../../components/cards/ImageCardActions";
import CartSchemaActions from "../../Schemas/MenuSchema/CartSchemaActions.json";
import { theme } from "../../Theme";
import CardPriceDiscount from "../../utils/component/CardPriceDiscount";
import InputWithAction from "../../utils/component/InputWithAction";
import PopupModal from "../../utils/component/PopupModal";
import { RenderDeleteAction } from "../../utils/component/renderDeleteAction";
import DeleteItem from "../../utils/operation/DeleteItem";
import FieldAction from "../../utils/operation/FieldAction";
import { getPaddedText } from "../../utils/operation/getPaddedText";
import { AddToCartSecondaryButton } from "./AddToCartButton";
import { addToCart } from "../../reducers/CartReducer";
import { getResponsiveImageSize } from "../../utils/component/getResponsiveImageSize";
// import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
export default function CardCartItem({ fieldsType, schemaActions, item }) {
  console.log("item",item,fieldsType);
  const localization = useSelector((state) => state.localization.localization);

  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const imageSize = getResponsiveImageSize(0.3, { min: 80, max: 135 });
  const delAction =
    schemaActions &&
    schemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Delete"
    );
  const onSubmitFun = async ( value) => {
    const customerCartItemID=item[fieldsType.idField];
    const fieldName =fieldsType.note;
    const putAction =
      schemaActions &&
      schemaActions.find(
        (action) => action.dashboardFormActionMethodType === `${fieldName}:Put`
      );
     

    await FieldAction(
      customerCartItemID,
      value,
      putAction,
      fieldsType.proxyRoute
    );
    setModalOpen(false);
  };

  const [isSwiped, setIsSwiped] = useState(false);
  return (
  <View className="rounded-xl overflow-hidden !bg-dark_card" style={{ backgroundColor: theme.error }}>
  <Swipeable
    onSwipeableOpen={() => setIsSwiped(true)}
    onSwipeableClose={() => setIsSwiped(false)}
    renderRightActions={
      !I18nManager.isRTL
        ? (progress, dragX) => RenderDeleteAction(progress, dragX, () =>
            DeleteItem(item[fieldsType.idField], true, delAction, fieldsType.proxyRoute))
        : null
    }
    renderLeftActions={
      I18nManager.isRTL
        ? (progress, dragX) => RenderDeleteAction(progress, dragX, () =>
            DeleteItem(item[fieldsType.idField], true, delAction, fieldsType.proxyRoute))
        : null
    }
  >
    {/* Main Content Container */}
    <View>
      {/* Card Body */}
      <View key={item[fieldsType.idField]} className="flex flex-row flex-1 items-center justify-between relative !bg-dark_card rounded-xl p-3">
        
        {/* Image Section */}
        <View className="p-2 py-1">
          <ImageCardActions
            fieldsType={fieldsType}
            item={item}
            style={{
              width: imageSize,
              height: imageSize,
              borderRadius: moderateScale(20),
            }}
            showFaovertIcon={false}
          />
        </View>

        {/* Text Content Section */}
        <View className="ml-4 flex-1 items-start justify-between">
          {/* Title Row */}
          <View className="flex-row w-full items-center justify-between">
            {item[fieldsType.text] && (
              <Text 
                className="font-semibold text-lg text-surface"
                numberOfLines={2}
                key={`${item[fieldsType.idField]}-${fieldsType.text}-${item[fieldsType.text]}`}
              >
                {item[fieldsType.text]}
              </Text>
            )}
          </View>

          {/* Description Row */}
          <Text className="text-sm text-primary-custom">
            {getPaddedText(item[fieldsType.description] ?? "", 3)}
          </Text>

          {/* Price Row */}
          <View className="w-full flex flex-col justify-between items-start">
            <CardPriceDiscount fieldsType={fieldsType} item={item} />
          </View>

          {/* Action Buttons Row */}
          {item[fieldsType.cardAction] && (
            <View className="flex flex-row justify-between w-full">
              <AddToCartSecondaryButton
                itemPackage={item}
                fieldsType={fieldsType}
                schemaActions={CartSchemaActions}
              />
            </View>
          )}
        </View>

        
      </View>

     {/* Combined Note & Edit Button Row */}
<View className="items-center">
  <View className="flex-row items-center justify-between bg-note px-3 !bg-dark_card mt-2 w-[90%]">
    {/* Note Text - takes up available space */}
    <View className="flex-1 py-2">
      <Text className="text-text !bg-body text-lg rounded-md"
       key={`${item[fieldsType.idField]}-${fieldsType.note}-${item[fieldsType.note]}`}>
        {item[fieldsType.note]}
      </Text>
    </View>

    {/* Edit Button - fixed on right side */}
    <TouchableOpacity
      className="bg-accentHover p-2 rounded-lg ml-2"
      onPress={setModalOpen}
    >
      <FontAwesome name="edit" size={20} className="!text-body" />
    </TouchableOpacity>
  </View>
</View>

      {/* Edit Note Modal */}
      <PopupModal
        haveFooter={false}
        isOpen={modalOpen}
        onSubmit={async () => {
          console.log("onSubmit", item[fieldsType.idField], item[fieldsType.note], fieldsType.note)
        }}
        onClose={() => setModalOpen(false)}
        headerTitle="set notes"
        isFormModal={false}
      >
        <View>
          <InputWithAction
            placeholder={"Notes"}
            submitButtonText={localization.Hum_screens.cart.submitButton}
            onSubmitFun={onSubmitFun}
            fieldName={fieldsType.note}
            iD={item[fieldsType.idField]}
          />
        </View>
      </PopupModal>
    </View>
  </Swipeable>
</View>
  );
}
