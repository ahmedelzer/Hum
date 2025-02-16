import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
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
import { useNavigation } from "@react-navigation/native";
import { LocalizationContext } from "../../../context/LocalizationContext";
import { moderateScale, scale } from "react-native-size-matters";
import SuggestCard from "../../components/cards/SuggestCard";
import { AddToCartSecondaryButton } from "./AddToCartButton";
import GoBackHeader from "../../components/header/GoBackHeader";
import { Image } from "../../../components/ui";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.totalAmount);
  const cartLength = cart.length;
  const navigation = useNavigation();
  const { isRTL, localization } = useContext(LocalizationContext);
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
  const addItemToCart = (item) => {
    dispatch(addToCart(item)); // cart array being used
  };
  return (
    <View className="flex-1 bg-body">
      {/* Header */}
      <GoBackHeader
        subTitle={localization.Hum_screens.cart.header.subTitle}
        title={localization.Hum_screens.cart.header.title}
      />

      {/* Scrollable Content */}
      <ScrollView className="flex-1  py-2">
        {cart.map((item) => (
          <View key={item.id} className="mb-5 flex-row items-start">
            <View
              style={{
                width: scale(80),
                height: scale(80),
                borderRadius: moderateScale(10),
              }}
            >
              <Image
                source={item.image}
                className="w-full h-full rounded-md"
                alt=""
              />
            </View>

            <View className="ml-4 flex-1 items-start">
              <Text className="font-semibold text-lg text-primary-custom">
                {item.name}
              </Text>
              <Text className="text-sm">{item.description}</Text>
              <AddToCartSecondaryButton item={item} />
            </View>
            <Text className="text-lg font-semibold">
              {localization.menu.currency} {item.price}
            </Text>
          </View>
        ))}
        {cartLength < 1 && (
          <View className="flex-1 bg-body justify-center items-center">
            <Text className="font-semibold text-lg text-primary-custom">
              {localization.Hum_screens.cart.emptyCart}
            </Text>
          </View>
        )}
        {/* Suggestions */}
        <View className="flex flex-row">
          <Text className="text-lg font-bold mt-6 items-start">
            {localization.Hum_screens.cart.suggests}
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
              {localization.Hum_screens.cart.specialRequest}
            </Text>
          </View>
          <TextInput
            placeholder={localization.Hum_screens.cart.specialRequest + "?"}
            className={
              "mt-2 bg-card p-3 items-end rounded-lg text-sm border border-body " +
              `${isRTL ? "text-right" : "text-left"}`
            }
          />
        </View>

        {/* Voucher */}
        <View className="mt-4">
          <View className="items-start">
            <Text className="text-lg font-bold">
              {localization.Hum_screens.cart.saveOrder}
            </Text>
          </View>
          <View className="flex-row mt-2 items-center">
            <TextInput
              placeholder={localization.Hum_screens.cart.saveOrderPlaceholder}
              className={
                "flex-1 bg-card p-3 rounded-l-lg text-sm border border-body " +
                `${isRTL ? "text-right" : "text-left"}`
              }
            />
            <TouchableOpacity className="bg-accent px-4 py-3 flex flex-row justify-center items-center h-full rounded-r-lg">
              <Text className="text-body text-sm">
                {localization.Hum_screens.cart.submitButton}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* total price */}
        <View className="mt-4 mb-6">
          <View className="items-start">
            <Text className="text-lg font-bold">
              {localization.Hum_screens.cart.paymentSummary.title}
            </Text>
          </View>
          <View className="flex-row mt-2 items-center justify-between">
            <Text className="text-md ">
              {localization.Hum_screens.cart.paymentSummary.totalAmount}
            </Text>
            <Text className="text-md">
              {localization.menu.currency} {total}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer (Static Buttons) */}
      <View className="flex-row items-center justify-between bg-body py-4 border-t border-card">
        <TouchableOpacity
          className="flex-1 bg-card py-3 mr-2 rounded-lg"
          onPress={pressHandler}
        >
          <Text className="text-center text-text">
            {localization.Hum_screens.cart.addItemsButton}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${
            cartLength < 1 && "bg-card "
          } flex-1 bg-accent py-3 rounded-lg`}
          disabled={cartLength < 1 ? true : false}
          onPress={() => navigation.navigate("CheckoutScreen")}
        >
          <Text className="text-center text-body">
            {localization.Hum_screens.cart.checkoutButton}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartPage;
