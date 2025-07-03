import { Feather } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/auth";
import { AddItemToCart } from "./AddItemToCart";
import { useCartItemHandler } from "./useCartItemHandler";
import { scale } from "react-native-size-matters";

const AddToCartSecondaryButton = ({
  itemPackage,
  fieldsType,
  schemaActions,
}) => {
  // const { quantity, updateCart } = useCartItemHandler(itemPackage, fieldsType);
  const [item, setItem] = useState(itemPackage);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const haveOnCart = cart.find((value) => {
    return value[fieldsType.idField] === item[fieldsType.idField];
  });
  const updateCart = useCallback(
    async (quantityChange) => {
      if (!itemPackage || !fieldsType?.cardAction) return;

      setLoading(true);
      try {
        const newQuantity =
          (itemPackage?.[fieldsType.cardAction] ?? 0) + quantityChange;
        if (newQuantity < 0) {
          setLoading(false);
          return; // Prevent negative quantity
        }

        await AddItemToCart(
          { ...item, [fieldsType.cardAction]: newQuantity },
          setLoading,
          fieldsType,
          schemaActions,
          newQuantity,
          dispatch
        );
      } catch (error) {
        console.error("Error updating cart:", error);
        setLoading(false);
      }
    },
    [itemPackage, fieldsType, schemaActions]
  );
  return (
    <View>
      {loading ? (
        <View
          className="flex justify-center items-center"
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: scale(28),
          }}
        >
          <ActivityIndicator size="small" color="black" />
        </View>
      ) : (
        <View className="flex-row items-center mt-2">
          <TouchableOpacity
            onPress={() => updateCart(1)}
            className="mt-2 px-2 py-1 rounded-lg bg-accent items-center justify-center flex flex-row"
          >
            <Feather name="plus" size={25} className="!text-body" />
          </TouchableOpacity>
          <Text
            key={`${item?.[fieldsType.idField]}-${fieldsType.cardAction}-${itemPackage?.[fieldsType.cardAction] ?? 0}`}
            className="mx-4 text-lg text-surface"
          >
            {itemPackage[fieldsType.cardAction]}
          </Text>
          <TouchableOpacity
            onPress={() => updateCart(-1)}
            className="mt-2 px-2 py-1 rounded-lg bg-accent items-center justify-center flex flex-row"
          >
            <Feather name="minus" size={25} className="!text-body" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const AddToCartPrimaryButton = ({
  itemPackage = {},
  fieldsType = {},
  isSuggest = false,
  schemaActions,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(itemPackage);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  let haveOnCart = cart.find((value) => {
    return value[fieldsType.idField] === item[fieldsType.idField];
  });
  // Update local item state whenever itemPackage changes (e.g. from WS update)

  // Current quantity based on cardAction field
  //const quantity = itemPackage?.[fieldsType.cardAction] ?? 0;

  const updateCart = useCallback(
    async (quantityChange) => {
      if (!itemPackage || !fieldsType?.cardAction) return;

      setLoading(true);
      try {
        const newQuantity =
          (haveOnCart?.[fieldsType.cardAction] ?? 0) + quantityChange;
        if (newQuantity < 0) {
          setLoading(false);
          return; // Prevent negative quantity
        }

        await AddItemToCart(
          {
            ...item,
            [fieldsType.cardAction]: newQuantity,
            addQuantity: quantityChange, // <-- Add this line
          },
          setLoading,
          fieldsType,
          schemaActions,
          newQuantity,
          dispatch
        );
      } catch (error) {
        console.error("Error updating cart:", error);
        setLoading(false);
      }
    },
    [itemPackage, fieldsType, schemaActions]
  );

  if (isSuggest) {
    return (
      <TouchableOpacity
        onPress={() => {
          updateCart(1);
        }}
        disabled={!user || loading}
        className="mt-2 px-2 py-1 rounded-lg bg-accent items-center justify-center flex flex-row"
      >
        <Feather name="plus" size={24} className="!text-body" />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      {loading ? (
        <View
          className="mt-2 p-2 rounded-lg bg-accent items-center justify-center flex flex-row"
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: scale(28),
          }}
        >
          <ActivityIndicator size="small" color="black" />
        </View>
      ) : (
        <View>
          {haveOnCart ? (
            <View className="flex flex-row bg-accent justify-between items-center rounded-md mt-2 p-2">
              <Pressable onPress={() => updateCart(1)} disabled={loading}>
                <Feather name="plus" size={24} className="!text-body mx-2" />
              </Pressable>

              <Text
                key={`${item?.[fieldsType.idField]}-${fieldsType.cardAction}-${itemPackage?.[fieldsType.cardAction] ?? 0}`}
                className="text-white text-lg"
              >
                {haveOnCart[fieldsType.cardAction] ?? 0}
              </Text>

              <Pressable
                onPress={() => updateCart(-1)}
                disabled={
                  loading || (itemPackage?.[fieldsType.cardAction] ?? 0) === 0
                }
              >
                <Feather name="minus" size={24} className="!text-body mx-2" />
              </Pressable>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => updateCart(1)}
              disabled={!user || loading}
              className="mt-2 p-2 rounded-lg bg-accent items-center justify-center flex flex-row"
            >
              <Feather
                name="shopping-cart"
                size={22}
                className="!text-body px-1"
              />
              <Text className="text-body text-lg font-bold">Add to Cart</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export { AddToCartPrimaryButton, AddToCartSecondaryButton };
