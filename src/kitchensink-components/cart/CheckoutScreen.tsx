import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import GoBackHeader from "../../components/header/GoBackHeader";
import BranchesByLocationMap from "../../components/maps/BranchesByLocationMap";
//!localization
export default function CheckoutScreen() {
  const [selectedPayment, setSelectedPayment] = useState("visa");
  const localization = useSelector((state) => state.localization.localization);
  const total = useSelector((state) => state.cart.totalAmount);
  const branches = [
    {
      LocationLatitudePoint: "37.7749",
      LocationLongitudePoint: "-122.4194",
      name: "San Francisco",
      description: "Main Branch",
    },
    {
      LocationLatitudePoint: "34.0522",
      LocationLongitudePoint: "-118.2437",
      name: "Los Angeles",
    },
    {
      LocationLatitudePoint: "40.7128",
      LocationLongitudePoint: "-74.0060",
      name: "New York City",
      description: "East Coast Branch",
    },
  ];
  return (
    <View className="flex-1 bg-body">
      {/* Header */}
      <GoBackHeader
        subTitle={localization.checkout.title}
        title={localization.checkout.subTitle}
      />
      <ScrollView>
        <View className="my-2 w-full h-[500]">
          {/* <BranchesByLocationMap branches={branches} /> */}
        </View>
        {/* Delivery Address */}
        <View className="mt-4 bg-body p-4 border border-card rounded-xl">
          <View className="flex-row justify-between">
            <View className="flex-row items-center">
              <Feather name="map-pin" size={24} className="text-text" />
              <View className="ml-3">
                <Text className="text-lg font-bold">
                  Apartment (Adnan El Malky)
                </Text>
                <Text className="text-sm text-card">
                  Adnan Al Maleki, g, g{"\n"}Mobile number: +20 1096749975
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text className="text-accent text-sm font-semibold">Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delivery Info */}
        <View className="mt-4 bg-body p-4 border border-card rounded-xl">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              {/* <Icon as={Truck} size="3xl" /> */}
              <Feather name="truck" size={24} className="text-text" />
              <View className="ml-3">
                <Text className="text-lg font-bold">Delivery</Text>
                <Text className="text-sm text-card">
                  Arriving in approx. 60 mins
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text className="text-accent text-sm font-semibold">Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Options */}
        <View className="mt-4 p-4">
          <Text className="text-xl font-semibold mb-2">Pay with</Text>

          {/* Payment Methods */}
          <TouchableOpacity
            onPress={() => setSelectedPayment("visa")}
            className={`p-4 flex-row items-center border ${
              selectedPayment === "visa" ? "border-accent" : "border-card"
            } rounded-xl mb-2`}
          >
            <AntDesign
              name="checkcircle"
              size={20}
              className={
                selectedPayment === "visa" ? "!text-accent" : "!text-card"
              }
            />
            <Text className="ml-4 font-semibold text-lg">VISA xxxx-1191</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedPayment("newCard")}
            className={`p-4 flex-row items-center border ${
              selectedPayment === "newCard" ? "border-accent" : "border-card"
            } rounded-xl mb-2`}
          >
            <AntDesign name="pluscircle" size={20} className="!text-card" />
            <Text className="ml-4 font-semibold text-lg">Add new card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedPayment("cash")}
            className={`p-4 flex-row items-center border ${
              selectedPayment === "cash" ? "border-accent" : "border-card"
            } rounded-xl`}
          >
            <AntDesign name="wallet" size={20} className="!text-card" />
            <Text className="ml-4 font-semibold text-lg">Cash</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Summary */}
        <View className="mt-4 bg-body p-4 rounded-xl">
          <Text className="text-xl font-semibold mb-2">Payment summary</Text>
          <View className="flex-row justify-between">
            <Text className="text-lg">Subtotal</Text>
            <Text className="text-lg">
              {localization.menu.currency} {total}
            </Text>
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-lg">Delivery fee</Text>
            <Text className="text-lg">
              {localization.menu.currency} {total}
            </Text>
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-lg font-bold">Total amount</Text>
            <Text className="text-lg font-bold">
              {localization.menu.currency} {total}
            </Text>
          </View>
          <Text className="mt-4 text-sm">
            By placing this order you agree to the Credit Card{" "}
            <Text className="text-accent">Terms & Conditions</Text>
          </Text>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View className="p-4 bg-body border-t border-card">
        <TouchableOpacity className="bg-accent py-4 rounded-lg">
          <Text className="text-body text-center text-lg font-semibold">
            Place order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
