import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/auth";
import { AddItemToCart } from "./AddItemToCart";

const AddToCartSecondaryButton = ({ item, fieldsType, schemaActions }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  return (
    <View className="flex-row items-center mt-2">
      <TouchableOpacity
        onPress={() => {
          // dispatch(incrementQty(item)); // cart
          // dispatch(incrementQuantity(item)); //product
          AddItemToCart(
            { ...item, addQuantity: 1 },
            setLoading,
            dispatch,
            fieldsType,
            schemaActions
          );
        }}
        className="px-3 py-1 bg-card rounded-full"
      >
        <Text className="text-lg font-bold">+</Text>
      </TouchableOpacity>
      <Text className="mx-4 text-lg">{item.quantity}</Text>
      <TouchableOpacity
        onPress={() => {
          AddItemToCart(
            { ...item, addQuantity: -1 },
            setLoading,
            dispatch,
            fieldsType,
            schemaActions
          );
        }}
        className={
          "px-2 text-body rounded-full " +
          `${item.quantity === 1 ? "py-2 bg-red-500" : "!px-3 py-1 bg-card"}`
        }
      >
        {item.quantity === 1 ? (
          <AntDesign name="delete" size={18} className="text-body" />
        ) : (
          <Text className="text-lg font-bold">-</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
const AddToCartPrimaryButton = ({ item, fieldsType, schemaActions }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const haveOnCart = cart.find((value) => {
    return value[fieldsType.idField] === item[fieldsType.idField];
  });

  return (
    <View>
      {haveOnCart ? (
        <Pressable className="flex flex-row bg-accent justify-between items-center rounded-md mt-2 p-2">
          <Pressable
            onPress={() => {
              AddItemToCart(
                { ...item, addQuantity: 1 },
                setLoading,
                dispatch,
                fieldsType,
                schemaActions
              ); // cart
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
              {/* <Icon as={Plus} size={"md"} /> */}
              <Feather name="plus" size={24} className="!text-body" />
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
              {haveOnCart.quantity}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              AddItemToCart(
                { ...item, addQuantity: -1 },
                setLoading,
                dispatch,
                fieldsType,
                schemaActions
              );
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: "white",
                paddingHorizontal: 10,
              }}
            >
              {/* <Icon as={Minus} size={"md"}  /> */}
              <Feather name="minus" size={24} className="!text-body" />
            </Text>
          </Pressable>
        </Pressable>
      ) : (
        <TouchableOpacity
          onPress={() =>
            AddItemToCart(
              { ...item, addQuantity: 1 },
              setLoading,
              dispatch,
              fieldsType,
              schemaActions
            )
          }
          disabled={!user}
          className="mt-2 p-2 rounded-lg bg-accent items-center justify-center"
        >
          <Feather name="plus" size={22} className="!text-body" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export { AddToCartPrimaryButton, AddToCartSecondaryButton };
