import React, { useState } from "react";
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
import { updateQuantity } from "../../reducers/ProductReducer";

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
  const cart = useSelector((state) => state.cart.cart);
  const addItemToCart = (item) => {
    // console.log("====================================");
    dispatch(addToCart(item)); // cart array being used
    dispatch(updateQuantity(item)); // product array being used
  };
  // console.log("====================================");
  // console.log(item);
  // console.log("====================================");

  return (
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
              className="font-medium text-sm text-typography-900"
              style={{ fontSize: moderateScale(12) }}
            >
              10
            </ButtonText>
            <Icon as={User2Icon} className="h-4 w-4 ml-1" color="green" />
          </Button>
          {/* )} */}

          {/* {reviews && ( */}
          <Button variant="link">
            <ButtonText
              className="font-medium text-sm text-typography-900"
              style={{ fontSize: moderateScale(12) }}
            >
              5
            </ButtonText>
            <Icon as={StarIcon} className="h-4 w-4 text-background-900 ml-1" />
          </Button>
          {/* )} */}

          {/* {orders && ( */}
          <Button variant="link">
            <ButtonText
              className="font-medium text-sm text-typography-900"
              style={{ fontSize: moderateScale(12) }}
            >
              8
            </ButtonText>
            <Icon as={CogIcon} color="purple" className="h-4 w-4 ml-1" />
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
              style={{
                fontSize: moderateScale(16),
              }}
              className="!text-accent font-bold"
            >
              {/* {text?.parameterTitel} Title */}
              {item.name}
            </Text>
            {/* )} */}

            {/* {description && ( */}
            <Text
              className="text-primary-custom"
              style={{
                fontSize: moderateScale(14),
              }}
            >
              {/* {description?.parameterTitel} Description Description */}
              {item.description}
            </Text>
            {/* )} */}
          </View>
          {/* <HStack space="lg" className="mt-2"> */}
          <View className="flex flex-row justify-end mt-2">
            <Text className="text-xl font-bold">{item.price}</Text>
          </View>
          {cart.some((value) => value.id === item.id) ? (
            <Pressable className="flex flex-row bg-accent justify-between items-center rounded-md mt-2 p-2">
              <Pressable
                onPress={() => {
                  addItemToCart({ ...item, addQuantity: -1 });
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    color: "white",
                    paddingHorizontal: 10,
                  }}
                >
                  <Icon as={Minus} size={"md"} className="text-body" />
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                    paddingHorizontal: 10,
                  }}
                >
                  {/* {GetQuantity(item.id)} */}
                  {item.quantity}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  addItemToCart({ ...item, addQuantity: 1 }); // cart
                  // dispatch(incrementQuantity(item)); //product
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                    paddingHorizontal: 10,
                  }}
                >
                  <Icon as={Plus} size={"md"} className="text-body" />
                </Text>
              </Pressable>
            </Pressable>
          ) : (
            <TouchableOpacity
              onPress={() => addItemToCart({ ...item, addQuantity: 1 })}
              className="mt-2 p-2 rounded-lg bg-accent items-center justify-center"
            >
              <Icon as={Plus} size={"md"} className="text-body" />
            </TouchableOpacity>
          )}

          {/* </HStack> */}
        </VStack>
      </View>
    </Card>
  );
};

export default MenuCardView;
