import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { default as React, useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { Box, Button, ButtonText, HStack, Image } from "../../../components/ui";
import { LocalizationContext } from "../../../context/LocalizationContext";
import { AddToCartPrimaryButton } from "../../kitchensink-components/cart/AddToCartButton";
import { useDispatch, useSelector } from "react-redux";
import { updateFavoriteItems } from "../../reducers/MenuItemReducer";

export const MenuCardWeb = ({ item, discountedPrice, fieldsType }) => {
  const { localization } = useContext(LocalizationContext);
  const favoriteItems = useSelector((state) => state.menuItem.favoriteItems);
  const isFavorite = favoriteItems.some((favItem) => favItem.id === item.id);
  const dispatch = useDispatch();

  function handleFavoritePress() {
    if (isFavorite) {
      dispatch(updateFavoriteItems({ items: [item], ope: "delete" }));
    } else {
      dispatch(updateFavoriteItems({ items: [item], ope: "add" }));
    }
  }
  return (
    <div className="relative flex flex-col md:flex-row overflow-hidden">
      {/* Discount Tag */}
      {item.discount && (
        <div className="absolute top-2 left-2 bg-red-500 text-body text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg z-50">
          {item.discount} OFF
        </div>
      )}
      <TouchableOpacity
        className="absolute top-2 right-2 py-1 z-50"
        onPress={handleFavoritePress}
      >
        {/* Favorite Icon */}
        <FontAwesome
          name={isFavorite ? "heart" : "heart-o"}
          size={24}
          color={isFavorite ? "red" : "gray"}
          className="cursor-pointer"
        />
      </TouchableOpacity>

      {/* Image Section */}
      <View className="md:w-1/2 flex justify-center items-center">
        <Box className="rounded-2xl overflow-hidden md:size-40 w-full h-56">
          <Image
            resizeMode="cover"
            className="w-full h-full"
            source={item.image}
            alt="food"
          />
        </Box>
        <HStack space="lg" className="items-center mt-2">
          <Button variant="link">
            <ButtonText
              className="font-medium text-typography-900"
              style={{ fontSize: moderateScale(12) }}
            >
              10
            </ButtonText>
            <Feather
              name="user"
              size={16}
              color="green"
              style={{ marginHorizontal: scale(1) }}
            />
          </Button>

          <Button variant="link">
            <ButtonText
              className="font-medium text-typography-900"
              style={{ fontSize: moderateScale(12) }}
            >
              5
            </ButtonText>
            <FontAwesome
              name="star"
              size={16}
              color="gold"
              style={{ marginHorizontal: scale(1) }}
            />
          </Button>

          <Button variant="link">
            <ButtonText
              className="font-medium text-typography-900"
              style={{ fontSize: moderateScale(12) }}
            >
              8
            </ButtonText>
            <MaterialIcons
              name="settings"
              size={16}
              color="purple"
              style={{ marginHorizontal: scale(1) }}
            />
          </Button>
        </HStack>
      </View>

      {/* Content Section */}
      <div className="w-full md:w-1/2 px-4 flex flex-col justify-between">
        <div>
          {/* Name & Description */}
          <h3 className="text-xl font-bold text-accent">{item.name}</h3>
          <p className="text-primary-custom text-sm mt-1">{item.description}</p>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-3 flex flex-col items-end">
          {item.discount && (
            <p className="text-lg font-bold text-red-500 line-through">
              {localization.menu.currency} {item.price.toFixed(2)}
            </p>
          )}
          <p className="text-xl font-bold">
            {localization.menu.currency} {discountedPrice.toFixed(2)}
          </p>

          <AddToCartPrimaryButton item={item} />
        </div>
      </div>
    </div>
  );
};
