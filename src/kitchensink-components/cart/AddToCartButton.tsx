import { Feather } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/auth";
import { AddItemToCart } from "./AddItemToCart";
import { useCartItemHandler } from "./useCartItemHandler";

const AddToCartSecondaryButton = ({ item, fieldsType }) => {
  const { quantity, updateCart } = useCartItemHandler(item, fieldsType);

  return (
    <View className="flex-row items-center mt-2">
      <TouchableOpacity
        onPress={() => updateCart(1)}
        className="mt-2 px-2 py-1 rounded-lg bg-accent items-center justify-center flex flex-row"
      >
        <Feather name="plus" size={20} className="!text-body" />
      </TouchableOpacity>
      <Text className="mx-4 text-lg text-surface">{quantity}</Text>
      <TouchableOpacity
        onPress={() => updateCart(-1)}
        className="mt-2 px-2 py-1 rounded-lg bg-accent items-center justify-center flex flex-row"
      >
        <Feather name="minus" size={20} className="!text-body" />
      </TouchableOpacity>
    </View>
  );
};


const AddToCartPrimaryButton = ({ itemPackage = {}, fieldsType = {}, isSuggest = false, schemaActions }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(itemPackage);

  // Update local item state whenever itemPackage changes (e.g. from WS update)
console.log("quatity",itemPackage?.[fieldsType.cardAction]);

  // Current quantity based on cardAction field
  //const quantity = itemPackage?.[fieldsType.cardAction] ?? 0;

  const updateCart = useCallback(
    
    async (quantityChange) => {
      
      if (!itemPackage || !fieldsType?.cardAction) return;

      setLoading(true);
      try {
        const newQuantity = itemPackage?.[fieldsType.cardAction] ?? 0 + quantityChange;
        if (newQuantity < 0) {
          setLoading(false);
          return; // Prevent negative quantity
        }

        await AddItemToCart(
          { ...item, [fieldsType.cardAction]: newQuantity },
          setLoading,
          fieldsType,
          schemaActions,
          newQuantity
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
        onPress={() => {updateCart(1)}}
        disabled={!user || loading}
        className="mt-2 px-2 py-1 rounded-lg bg-accent items-center justify-center flex flex-row"
      >
        <Feather name="plus" size={24} className="!text-body" />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      {itemPackage?.[fieldsType.cardAction] ?? 0 > 0 ? (
        <View className="flex flex-row bg-accent justify-between items-center rounded-md mt-2 p-2">
          <Pressable onPress={() => updateCart(1)} disabled={loading}>
            <Feather name="plus" size={24} className="!text-body mx-2" />
          </Pressable>

          <Text
            key={`${item?.[fieldsType.idField]}-${fieldsType.cardAction}-${itemPackage?.[fieldsType.cardAction] ?? 0}`}
            className="text-white text-lg"
          >
            {itemPackage?.[fieldsType.cardAction] ?? 0}
          </Text>

          <Pressable onPress={() => updateCart(-1)} disabled={loading || (itemPackage?.[fieldsType.cardAction] ?? 0) === 0}>
            <Feather name="minus" size={24} className="!text-body mx-2" />
          </Pressable>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => updateCart(1)}
          disabled={!user || loading}
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

