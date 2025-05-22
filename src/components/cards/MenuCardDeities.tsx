import React, { useContext, useState } from "react";
import { Image, Dimensions, View, TouchableOpacity } from "react-native";
import { Box, Text, VStack, HStack, Button } from "../../../components/ui";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AddToCartPrimaryButton } from "../../kitchensink-components/cart/AddToCartButton";
import { LocalizationContext } from "../../../context/LocalizationContext";
import CardInteraction from "./CardInteraction";

const { width } = Dimensions.get("window");

// Temporary image list for testing
const testImages = [
  "https://picsum.photos/id/237/400/300",
  "https://picsum.photos/id/238/400/300",
  "https://picsum.photos/id/239/400/300",
  "https://picsum.photos/id/240/400/300",
];

export default function MenuCardDeities({ item, fieldsType, schemaActions }) {
  const [selectedImage, setSelectedImage] = useState(testImages[0]);

  const { localization } = useContext(LocalizationContext);
  const discountPercentage = item.discount
    ? parseFloat(item.discount.replace("%", ""))
    : 0;
  const discountedPrice =
    item[fieldsType.price] -
    (item[fieldsType.price] * discountPercentage) / 100;
  return (
    <Box className="flex-1 bg-body">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Main Image */}
        {item[fieldsType.imageView] && (
          <Image
            source={{ uri: selectedImage }}
            className="w-full h-64 my-2"
            resizeMode="cover"
          />
        )}

        <HStack className="gap-x-4 gap-y-5 py-3 items-center flex-row justify-center">
          {testImages.map((img, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedImage(img)}>
              <Image
                source={{ uri: img }}
                className={`w-16 h-16 rounded-md border-2 ${
                  selectedImage === img ? "border-accent" : "border-gray-300"
                }`}
              />
            </TouchableOpacity>
          ))}
        </HStack>

        {/* Card Content */}
        <Box>
          <HStack className="items-center py-2 space-x-1">
            {item[fieldsType.rate] && (
              <View className="items-center flex-row">
                <MaterialCommunityIcons name="star" color="orange" size={25} />
                <Text className="text-2xl !text-[#f59e0b]">4.8</Text>
              </View>
            )}
            {/* {item[fieldsType.orders] && ( */}
            <Text className="text-md px-4 py-2 mx-2 bg-card rounded-full text-body">
              (145 orders)
            </Text>
            {/* )} */}
            <View pointerEvents="box-none" className="w-1/2">
              <CardInteraction fieldsType={fieldsType} item={item} />
            </View>
          </HStack>
          {item[fieldsType.text] && (
            <Text className="text-2xl font-semibold text-text mb-1">
              {item[fieldsType.text]}
            </Text>
          )}

          {item[fieldsType.description] && (
            <Text className="text-sm text-primary-custom mb-4 leading-relaxed">
              {item[fieldsType.description]}
            </Text>
          )}
        </Box>
      </ScrollView>

      {/* Sticky Bottom Price + Add Button */}
      <View className="flex-row items-center justify-between bg-body py-4 border-t border-card">
        {item[fieldsType.price] && (
          <Text className="text-2xl font-bold text-text w-1/3">
            {localization.menu.currency} {discountedPrice.toFixed(2)}
          </Text>
        )}

        {/* <TouchableOpacity className="bg-black py-3 ml-3 rounded-full">
          <Text className="text-center text-white font-semibold text-base">
            Add to cart
          </Text>
        </TouchableOpacity> */}
        {/* {fieldsType.cardAction && ( //!here are the error text
          <AddToCartPrimaryButton
            item={item}
            // idField={fieldsType.idField}
            // field={fieldsType.cardAction}
            fieldsType={fieldsType}
            schemaActions={schemaActions}
          />
        )} */}
      </View>
    </Box>
  );
}
