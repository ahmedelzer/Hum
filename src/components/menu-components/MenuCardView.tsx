import React, { useContext, useState } from "react";
import { I18nManager, Pressable, TouchableOpacity, View } from "react-native";
import { scale, moderateScale } from "react-native-size-matters";
import {
  Box,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
  Card,
  Button,
  ButtonText,
} from "../../../components/ui";
import {
  StarIcon,
  User2Icon,
  CogIcon,
  Container,
  Plus,
  Minus,
} from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQty,
  incrementQty,
} from "../../reducers/CartReducer";
import { updateQuantity } from "../../reducers/MenuItemReducer";
import { useNavigation } from "@react-navigation/native";
import { AddToCartPrimaryButton } from "../../kitchensink-components/cart/AddToCartButton";
import { LocalizationContext } from "../../../context/LocalizationContext";

const MenuCardView = ({
  imageView,
  description,
  numberOfIndividuals,
  rate,
  likes,
  dislikes,
  orders,
  reviews,
  text,
  item,
}) => {
  const dispatch = useDispatch();
  const { localization } = useContext(LocalizationContext);

  const cart = useSelector((state) => state.cart.cart);
  const product = useSelector((state) => state.menuItem.menuItem);
  const addItemToCart = (item) => {
    // console.log("====================================");
    dispatch(addToCart(item)); // cart array being used
    dispatch(updateQuantity(item)); // product array being used
  };
  const navigation = useNavigation();

  // console.log("====================================");
  // console.log(cart, 12333, product);
  // console.log("====================================");
  //!localization
  return (
    <Pressable
      onPress={() => {
        console.log("log");
        navigation.navigate("DetailsProductScreen", item);
      }}
    >
      <Card className="flex flex-row items-cente rounded-xl p-2 my-4 bg-card shadow-md">
        {/* Left side: Image */}
        <View className="w-1/2 flex justify-center items-center">
          {/* {imageView && ( */}
          <Box
            className="rounded-2xl overflow-hidden"
            style={{
              width: scale(128),
              height: scale(128),
            }}
          >
            <Image
              resizeMode="cover"
              className="w-full h-full"
              source={item.image}
              alt="food"
            />
          </Box>
          <HStack space="lg" className="items-center mt-2">
            {/* {numberOfIndividuals && ( */}
            <Button variant="link">
              <ButtonText
                className="font-medium text-typography-900"
                style={{ fontSize: moderateScale(12) }}
              >
                10
              </ButtonText>
              <Icon
                as={User2Icon}
                className="mx-1"
                style={{ width: scale(10), height: scale(10) }}
                color="green"
              />
            </Button>
            {/* )} */}

            {/* {reviews && ( */}
            <Button variant="link">
              <ButtonText
                className="font-medium text-typography-900"
                style={{ fontSize: moderateScale(12) }}
              >
                5
              </ButtonText>
              <Icon
                as={StarIcon}
                className="mx-1"
                style={{ width: scale(10), height: scale(10) }}
              />
            </Button>
            {/* )} */}

            {/* {orders && ( */}
            <Button variant="link">
              <ButtonText
                className="font-medium text-typography-900"
                style={{ fontSize: moderateScale(12) }}
              >
                8
              </ButtonText>
              <Icon
                as={CogIcon}
                color="purple"
                className="mx-1"
                style={{ width: scale(10), height: scale(10) }}
              />
            </Button>
            {/* )} */}
          </HStack>
          {/* )} */}
        </View>

        {/* Right side: Content */}
        <View className="w-1/2 px-1">
          <VStack>
            <View className={I18nManager.isRTL ? "items-start" : "items-start"}>
              {/* {text && ( */}
              <Text
                bold
                size="lg"
                style={
                  {
                    // fontSize: moderateScale(16),
                  }
                }
                className="!text-accent font-bold text-xl"
              >
                {/* {text?.parameterTitel} Title */}
                {item.name}
              </Text>
              {/* )} */}

              {/* {description && ( */}
              <Text
                className="text-primary-custom text-lg"
                style={
                  {
                    // fontSize: moderateScale(14),
                  }
                }
              >
                {/* {description?.parameterTitel} Description Description */}
                {item.description}
              </Text>
              {/* )} */}
            </View>
            {/* <HStack space="lg" className="mt-2"> */}
            <View className="flex flex-row justify-end mt-2">
              <Text className="text-xl font-bold">
                {localization.menu.currency} {item.price}
              </Text>
            </View>
            <AddToCartPrimaryButton item={item} />

            {/* </HStack> */}
          </VStack>
        </View>
      </Card>
    </Pressable>
  );
};

export default MenuCardView;
