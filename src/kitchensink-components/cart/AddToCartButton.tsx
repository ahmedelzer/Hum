import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../reducers/CartReducer";
import {
  StarIcon,
  User2Icon,
  CogIcon,
  Container,
  Plus,
  Minus,
} from "lucide-react-native";
import { Icon } from "../../../components/ui";
import { Pressable } from "react-native";
import { updateQuantity } from "../../reducers/MenuItemReducer";
const AddToCartSecondaryButton = ({ item }) => {
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    dispatch(addToCart(item)); // cart array being used
  };
  return (
    <View className="flex-row items-center mt-2">
      <TouchableOpacity
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
          `${item.quantity === 1 ? "py-2 bg-red-500" : "py-1 bg-card"}`
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
const AddToCartPrimaryButton = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const haveOnCart = cart.find((value) => value.id === item.id);
  const addItemToCart = (item) => {
    dispatch(addToCart(item)); // cart array being used
  };
  return (
    <View>
      {haveOnCart ? (
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
              {/* <Icon as={Minus} size={"md"}  /> */}
              <Feather name="minus" size={24} className="!text-body" />
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
              {/* <Icon as={Plus} size={"md"} /> */}
              <Feather name="plus" size={24} className="!text-body" />
            </Text>
          </Pressable>
        </Pressable>
      ) : (
        <TouchableOpacity
          onPress={() => addItemToCart({ ...item, addQuantity: 1 })}
          className="mt-2 p-2 rounded-lg bg-accent items-center justify-center"
        >
          <Feather name="plus" size={22} className="!text-body" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export { AddToCartSecondaryButton, AddToCartPrimaryButton };
