import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../../context/auth";
import { AddItemToCart } from "./AddItemToCart";
import { useSelector } from "react-redux";

const AddToCartSecondaryButton = ({
  itemPackage,
  fieldsType,
  schemaActions,
}) => {
  // const { quantity, updateCart } = useCartItemHandler(itemPackage, fieldsType);
  const [item, setItem] = useState(itemPackage);
  const [loading, setLoading] = useState(false);
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
          newQuantity
        );
      } catch (error) {
        console.error("Error updating cart:", error);
        setLoading(false);
      }
    },
    [itemPackage, fieldsType, schemaActions]
  );
  return (
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
        {itemPackage?.[fieldsType.cardAction] ?? 0}
      </Text>
      <TouchableOpacity
        onPress={() => updateCart(-1)}
        className="mt-2 px-2 py-1 rounded-lg bg-accent items-center justify-center flex flex-row"
      >
        <Feather name="minus" size={25} className="!text-body" />
      </TouchableOpacity>
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
  const localization = useSelector((state) => state.localization.localization);

  // Update local item state whenever itemPackage changes (e.g. from WS update)

  // Current quantity based on cardAction field
  //const quantity = itemPackage?.[fieldsType.cardAction] ?? 0;

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
    const [isAdded, setIsAdded] = useState(
      itemPackage[fieldsType.cardAction] > 0 ? true : false
    );
    return (
      <TouchableOpacity
        onPress={async () => {
          await updateCart(1);
          setIsAdded(true);
        }}
        disabled={!user || isAdded}
        className="mt-2 px-2 py-1 text-body rounded-lg bg-accent items-center justify-center flex flex-row"
      >
        {isAdded ? (
          <Ionicons name="checkmark-done" size={24} color="white" />
        ) : (
          <Feather name="plus" size={24} className="!text-body" />
        )}
      </TouchableOpacity>
    );
  }

  return (
    <View>
      {(itemPackage?.[fieldsType.cardAction] ?? 0 > 0) ? (
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
          <Text className="text-body text-lg font-bold hidden md:flex">
            {localization.Hum_screens.menu.addToCartButton}
          </Text>
          <Feather name="shopping-cart" size={22} className="!text-body px-1" />
        </TouchableOpacity>
      )}
    </View>
  );
};
//<Text className="text-body text-lg font-bold">Add to Cart</Text>

export { AddToCartPrimaryButton, AddToCartSecondaryButton };
