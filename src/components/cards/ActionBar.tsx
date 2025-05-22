import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import GoBackHeader from "../header/GoBackHeader";
import { useDispatch, useSelector } from "react-redux";
import { areArraysEqualByKey } from "../../utils/operation/areArraysEqual";
import { IsSecondListSubsetOfFirstList } from "../../utils/operation/IsSecondListSubsetOfFirstList";
import { updateFavoriteItems } from "../../reducers/MenuItemReducer";
import { filterArrayByKey } from "../../utils/operation/filterArrayByKey";

export default function ActionBar({ selectedItems, setSelectedItems }) {
  const favoriteItems = useSelector((state) => state.menuItem.favoriteItems);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  function handleFavoritePress() {
    if (IsSecondListSubsetOfFirstList(favoriteItems, selectedItems, ["id"])) {
      dispatch(updateFavoriteItems({ items: selectedItems, ope: "delete" }));
    } else {
      const selected = [...selectedItems];
      const filteredItems = filterArrayByKey(favoriteItems, selected, "id");
      dispatch(updateFavoriteItems({ items: filteredItems, ope: "add" }));
    }
  }
  useEffect(() => {
    if (IsSecondListSubsetOfFirstList(favoriteItems, selectedItems, ["id"])) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favoriteItems, selectedItems]);
  return (
    <View className="flex-row items-center justify-between mt-2">
      <View className="w-1/2 flex-row items-center">
        <GoBackHeader
          subTitle={""}
          title={""}
          specialAction={() => {
            setSelectedItems([]);
          }}
        />
        <Text className="text-text font-bold text-2xl items-center mx-4">
          {selectedItems.length}
        </Text>
      </View>

      {/* Heart Icon (Toggle Favorite) */}
      <View className="flex-row items-center mx-4">
        <TouchableOpacity
          onPress={handleFavoritePress}
          className="px-3 py-1 rounded-full"
        >
          <AntDesign
            name="heart"
            size={22}
            className={isFavorite ? "!text-red-500" : "text-text"}
          />
        </TouchableOpacity>

        {/* Delete Button */}
        {/* <TouchableOpacity className="px-2 py-2 bg-rounded-full">
          <AntDesign name="delete" size={22} className="text-body" />
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
