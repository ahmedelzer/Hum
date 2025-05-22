import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import SuggestCard from "../../components/cards/SuggestCard";
import { scale } from "react-native-size-matters";
const DrawSuggestCard = ({ suggestContainerType, items }) => {
  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const chunkedItems = chunkArray(items, 4);
  switch (suggestContainerType) {
    case 0:
      return items.map((item, index) => (
        <SuggestCard item={item} key={index} />
      ));
    case 1:
      return (
        <>
          {chunkedItems.map((group, groupIndex) => (
            <View
              key={groupIndex}
              className="grid grid-cols-2 grid-rows-2 !w-full mb-4"
            >
              {group.map((item, index) => (
                <SuggestCard
                  key={index}
                  item={item}
                  imageStyle={{ width: scale(90), height: scale(90) }}
                />
              ))}
            </View>
          ))}
        </>
      );
  }
};

export default function SuggestCardContainer({
  Schema,
  suggestContainerType = 1,
}) {
  const items = [
    {
      canReturn: true,
      quantity: 2,
      discount: 15,
      heightCm: 0,
      indexOflike: 0,
      isActive: true,
      isAvailable: true,
      itemImage:
        "MenuItemImages\\34a706bf-8bf2-4c45-b660-c247ed177d99.jpg?v5/22/2025 12:12:13 PM?v5/22/2025 12:12:13 PM",
      keywords: "wee,apples12",
      lengthCm: 0,
      menuCategoryID: "b7d65f7f-f87a-4fa6-beaa-d799ba77b9ce",
      menuCategoryName: "طعام",
      menuItemDescription: "rtr",
      menuItemID: "f348161f-905a-4d78-af2f-068bd35599b5",
      menuItemName: "apples12",
      nodeAddress: null,
      nodeID: "2421d86a-0043-441b-988a-e7cfad6273a7",
      nodeMenuItemID: "b30ca2db-6662-4c70-9858-ab7d6bcae6e8",
      node_Name: "MainNode",
      numberOfDislikes: 0,
      numberOfLikes: 47,
      numberOfOrders: 0,
      numberOfReviews: 0,
      packageDegree: 0,
      preparingTimeAmountPerMinute: 0,
      price: 5,
      priceAfterDiscount: 4,
      rate: 5,
      size: 0,
      sku: "",
      taxAmount: 0,
      taxTypeID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      volume: 0,
      weightKg: 0,
      widthCm: 0,
    },
    {
      canReturn: true,
      quantity: 2,
      discount: 15,
      heightCm: 0,
      indexOflike: 0,
      isActive: true,
      isAvailable: true,
      itemImage:
        "MenuItemImages\\34a706bf-8bf2-4c45-b660-c247ed177d99.jpg?v5/22/2025 12:12:13 PM?v5/22/2025 12:12:13 PM",
      keywords: "wee,apples12",
      lengthCm: 0,
      menuCategoryID: "b7d65f7f-f87a-4fa6-beaa-d799ba77b9ce",
      menuCategoryName: "طعام",
      menuItemDescription: "rtr",
      menuItemID: "f348161f-905a-4d78-af2f-068bd35599b5",
      menuItemName: "apples12",
      nodeAddress: null,
      nodeID: "2421d86a-0043-441b-988a-e7cfad6273a7",
      nodeMenuItemID: "b30ca2db-6662-4c70-9858-ab7d6bcae6e8",
      node_Name: "MainNode",
      numberOfDislikes: 0,
      numberOfLikes: 47,
      numberOfOrders: 0,
      numberOfReviews: 0,
      packageDegree: 0,
      preparingTimeAmountPerMinute: 0,
      price: 5,
      priceAfterDiscount: 4,
      rate: 5,
      size: 0,
      sku: "",
      taxAmount: 0,
      taxTypeID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      volume: 0,
      weightKg: 0,
      widthCm: 0,
    },
    {
      canReturn: true,
      quantity: 2,
      discount: 15,
      heightCm: 0,
      indexOflike: 0,
      isActive: true,
      isAvailable: true,
      itemImage:
        "MenuItemImages\\34a706bf-8bf2-4c45-b660-c247ed177d99.jpg?v5/22/2025 12:12:13 PM?v5/22/2025 12:12:13 PM",
      keywords: "wee,apples12",
      lengthCm: 0,
      menuCategoryID: "b7d65f7f-f87a-4fa6-beaa-d799ba77b9ce",
      menuCategoryName: "طعام",
      menuItemDescription: "rtr",
      menuItemID: "f348161f-905a-4d78-af2f-068bd35599b5",
      menuItemName: "apples12",
      nodeAddress: null,
      nodeID: "2421d86a-0043-441b-988a-e7cfad6273a7",
      nodeMenuItemID: "b30ca2db-6662-4c70-9858-ab7d6bcae6e8",
      node_Name: "MainNode",
      numberOfDislikes: 0,
      numberOfLikes: 47,
      numberOfOrders: 0,
      numberOfReviews: 0,
      packageDegree: 0,
      preparingTimeAmountPerMinute: 0,
      price: 5,
      priceAfterDiscount: 4,
      rate: 5,
      size: 0,
      sku: "",
      taxAmount: 0,
      taxTypeID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      volume: 0,
      weightKg: 0,
      widthCm: 0,
    },
  ];
  const chunkArray = (arr, size = 4) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const chunkedItems = chunkArray(items, 4);
  return (
    <ScrollView
      horizontal
      className="mt-2"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12, paddingHorizontal: 12 }}
    >
      {chunkedItems.map((group, groupIndex) => (
        <View
          key={groupIndex}
          className="w-40 grid grid-cols-2 flex-wrap grid-rows-2 gap-2" // w-40 or customize width for each "page"
        >
          {group.map((item, index) => (
            <SuggestCard
              key={index}
              item={item}
              imageStyle={{ width: scale(90), height: scale(90) }}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
