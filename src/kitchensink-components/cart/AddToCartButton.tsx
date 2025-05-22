import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/auth";
import { AddItemToCart } from "./AddItemToCart";

const AddToCartSecondaryButton = ({ item, fieldsType }) => {
  const schemaActions = useSelector((state) => state.menuItem.schemaActions);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const cart = useSelector((state) => state.cart.cart);
  const haveOnCart = cart.find((value) => {
    return value[fieldsType.idField] === item[fieldsType.idField];
  });
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
            schemaActions,
            haveOnCart[fieldsType.cardAction] + 1 || 1
          );
        }}
        className="mt-2 px-2 py-1 rounded-lg bg-accent items-center justify-center flex flex-row"
      >
        <Feather name="plus" size={20} className="!text-body" />
      </TouchableOpacity>
      <Text className="mx-4 text-lg text-surface">{item.quantity || 1}</Text>
      <TouchableOpacity
        onPress={() => {
          AddItemToCart(
            { ...item, addQuantity: -1 },
            setLoading,
            dispatch,
            fieldsType,
            schemaActions,
            haveOnCart[fieldsType.cardAction] - 1 || 1
          );
        }}
        className="mt-2 px-2 py-1 rounded-lg bg-accent items-center justify-center flex flex-row"
      >
        <Feather name="minus" size={20} className="!text-body" />
      </TouchableOpacity>
    </View>
  );
};
const AddToCartPrimaryButton = ({ item, fieldsType, isSuggest = false }) => {
  const [loading, setLoading] = useState(false);
  const schemaActions = useSelector((state) => state.menuItem.schemaActions);

  const { user } = useAuth();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const haveOnCart = cart.find((value) => {
    return value[fieldsType.idField] === item[fieldsType.idField];
  });
  if (isSuggest) {
    return (
      <TouchableOpacity
        onPress={() =>
          AddItemToCart(
            { ...item, addQuantity: 1 },
            setLoading,
            dispatch,
            fieldsType,
            schemaActions,
            1
          )
        }
        disabled={!user}
        className="mt-2 px-2 py-1 rounded-lg bg-accent items-center justify-center flex flex-row"
      >
        <Feather name="plus" size={24} className="!text-body" />
      </TouchableOpacity>
    );
  }
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
                schemaActions,
                haveOnCart[fieldsType.cardAction] + 1 || 1
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
              {haveOnCart[fieldsType.cardAction]}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              AddItemToCart(
                { ...item, addQuantity: -1 },
                setLoading,
                dispatch,
                fieldsType,
                schemaActions,
                haveOnCart[fieldsType.cardAction] - 1 || 1
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
              schemaActions,
              1
            )
          }
          disabled={!user}
          className="mt-2 p-2 rounded-lg bg-accent items-center justify-center flex flex-row"
        >
          <Feather name="shopping-cart" size={22} className="!text-body px-1" />
          <Text className="text-body text-lg font-bold">Add to Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export { AddToCartPrimaryButton, AddToCartSecondaryButton };
