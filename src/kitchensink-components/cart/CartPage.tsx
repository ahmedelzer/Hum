import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQty,
  incrementQty,
} from "../../reducers/CartReducer";
import { decrementQuantity } from "../../reducers/ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { LocalizationContext } from "../../../context/LocalizationContext";
import { moderateScale, scale } from "react-native-size-matters";
import SuggestCard from "../../components/cards/SuggestCard";
import { AddToCartSecondaryButton } from "./AddToCartButton";
import GoBackHeader from "../../components/header/GoBackHeader";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.totalAmount);
  const navigation = useNavigation();
  const { isRTL } = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const suggestions = [
    {
      id: 1,
      name: "Ketchup Packets Ketchup Packets",
      price: "EGP 1.00",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Bun",
      price: "EGP 5.00",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "Pepsi",
      price: "EGP 32.00",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      name: "Diet Pepsi",
      price: "EGP 32.00",
      image: "https://via.placeholder.com/50",
    },
  ];
  const pressHandler = () => {
    navigation.navigate("HomeScreen");
  };
  console.log("====================================");
  console.log(cart);
  console.log("====================================");
  const addItemToCart = (item) => {
    dispatch(addToCart(item)); // cart array being used
    // dispatch(incrementQuantity(item)); // product array being used
  };
  if (cart.length < 1) {
    return (
      <View className="flex-1 bg-body justify-center items-center">
        <Text className="font-semibold text-lg text-primary-custom">
          cart is empty
        </Text>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-body">
      {/* Header */}
      <GoBackHeader subTitle={"KFC"} title={"Cart"} />

      {/* Scrollable Content */}
      <ScrollView className="flex-1  py-2">
        {cart.map((item) => (
          <View key={item.id} className="mb-5 flex-row items-start">
            <Image
              source={{ uri: item.image }}
              // className="w-24 h-24 rounded-md"
              style={{
                width: scale(80),
                height: scale(80),
                borderRadius: moderateScale(10),
              }}
            />

            <View className="ml-4 flex-1 items-start">
              <Text className="font-semibold text-lg text-primary-custom">
                {item.name}
              </Text>
              <Text className="text-sm">{item.description}</Text>
              {/* <View className="flex-row items-center mt-2"> */}
              {/* <TouchableOpacity
                  onPress={() => {
                    // dispatch(incrementQty(item)); // cart
                    // dispatch(incrementQuantity(item)); //product
                    addItemToCart({ ...item, addQuantity: 1 });
                  }}
                  className="px-3 py-1 bg-card rounded-full"
                >
                  <Text className="text-lg font-bold">+</Text>
                </TouchableOpacity>
                <Text className="mx-4 text-lg">{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => {
                    addItemToCart({ ...item, addQuantity: -1 });
                  }}
                  className={
                    "px-2 text-body rounded-full " +
                    `${
                      item.quantity === 1 ? "py-2 bg-red-500" : "py-1 bg-card"
                    }`
                  }
                >
                  {item.quantity === 1 ? (
                    <AntDesign name="delete" size={18} className="text-body" />
                  ) : (
                    <Text className="text-lg font-bold">-</Text>
                  )}
                </TouchableOpacity> */}
              <AddToCartSecondaryButton item={item} />
              {/* </View> */}
            </View>
            <Text className="text-lg font-semibold">{item.price}</Text>
          </View>
        ))}

        {/* Suggestions */}
        <View className="flex flex-row">
          <Text className="text-lg font-bold mt-6 items-start">
            You might also like...
          </Text>
        </View>
        <ScrollView horizontal className="mt-2">
          {suggestions.map((item) => (
            <SuggestCard
              key={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </ScrollView>

        {/* Special Request */}
        <View className="mt-4">
          <View className="items-start">
            <Text className="text-lg font-bold items-start">
              Special request
            </Text>
          </View>
          <TextInput
            placeholder="Any special requests?"
            className={
              "mt-2 bg-card p-3 items-end rounded-lg text-sm border border-body " +
              `${isRTL ? "text-right" : "text-left"}`
            }
          />
        </View>

        {/* Voucher */}
        <View className="mt-4">
          <View className="items-start">
            <Text className="text-lg font-bold">Save on your order</Text>
          </View>
          <View className="flex-row mt-2 items-center">
            <TextInput
              placeholder="Enter voucher code"
              className={
                "flex-1 bg-card p-3 rounded-l-lg text-sm border border-body " +
                `${isRTL ? "text-right" : "text-left"}`
              }
            />
            <TouchableOpacity className="bg-accent px-4 py-3 flex flex-row justify-center items-center h-full rounded-r-lg">
              <Text className="text-body text-sm">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* total price */}
        <View className="mt-4 mb-6">
          <View className="items-start">
            <Text className="text-lg font-bold">Payment summary</Text>
          </View>
          <View className="flex-row mt-2 items-center justify-between">
            <Text className="text-md ">Total Amount</Text>
            <Text className="text-md">EGP {total}</Text>
          </View>
          {/* <View className="flex-row mt-2 items-center justify-between">
            <Text className="text-md ">Payment summary</Text>
            <Text className="text-md ">Payment summary</Text>
          </View>
          <View className="flex-row mt-2 mb-6 items-center justify-between">
            <Text className="text-md ">Payment summary</Text>
            <Text className="text-md ">Payment summary</Text>
          </View> */}
        </View>
      </ScrollView>

      {/* Footer (Static Buttons) */}
      <View className="flex-row items-center justify-between bg-body py-4 border-t border-card">
        <TouchableOpacity
          className="flex-1 bg-card py-3 mr-2 rounded-lg"
          onPress={pressHandler}
        >
          <Text className="text-center text-text">Add items</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-accent py-3 rounded-lg">
          <Text
            className="text-center text-body"
            onPress={() => navigation.navigate("CheckoutScreen")}
          >
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartPage;
