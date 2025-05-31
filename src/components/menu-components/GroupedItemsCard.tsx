//!Frequently Bought Together
// import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
// import React, { useState, useContext } from "react";
// import { Pressable, View } from "react-native";
// import { moderateScale, scale } from "react-native-size-matters";
// import { useDispatch } from "react-redux";
// import {
//   Box,
//   Button,
//   ButtonText,
//   Card,
//   HStack,
//   Image,
//   Text,
//   VStack,
//   Checkbox,
// } from "../../../components/ui";

// import { useNavigation } from "@react-navigation/native";
// import { LocalizationContext } from "../../../context/LocalizationContext";
// import { AddToCartPrimaryButton } from "../../kitchensink-components/cart/AddToCartButton";

// const GroupedItemsCard = ({ items }) => {
//   const dispatch = useDispatch();
// //   const localization = useSelector(
//     (state) => state.localization.localization
//   );
//   const navigation = useNavigation();

//   const [selectedItems, setSelectedItems] = useState(items);

//   const toggleItemSelection = (itemId) => {
//     setSelectedItems((prev) =>
//       prev.map((item) =>
//         item.id === itemId ? { ...item, selected: !item.selected } : item
//       )
//     );
//   };

//   const totalPrice = selectedItems
//     .filter((item) => item.selected)
//     .reduce((sum, item) => sum + item.price, 0);

//   return (
//     <Card className="rounded-xl p-3 my-4 shadow-md bg-card">
//       <Text bold size="lg" className="!text-accent font-bold text-xl mb-2">
//         Frequently Bought Together
//       </Text>

//       {selectedItems.map((item) => (
//         <HStack key={item.id} className="items-center my-2">
//           {/* Checkbox to select/deselect */}
//           <Checkbox
//             value={item.selected}
//             onPress={() => toggleItemSelection(item.id)}
//           />

//           {/* Item Image */}
//           <Box
//             className="rounded-2xl overflow-hidden mx-2"
//             style={{ width: scale(64), height: scale(64) }}
//           >
//             <Image
//               resizeMode="cover"
//               className="w-full h-full"
//               source={item.image}
//               alt={item.name}
//             />
//           </Box>

//           {/* Item Details */}
//           <VStack className="flex-1">
//             <Text bold className="text-lg">
//               {item.name}
//             </Text>
//             <Text className="text-primary-custom text-sm">
//               {localization.menu.currency} {item.price}
//             </Text>
//           </VStack>
//         </HStack>
//       ))}

//       {/* Total Price & Add to Cart Button */}
//       <HStack className="justify-between items-center mt-3">
//         <Text bold size="lg" className="text-xl">
//           Total: {localization.menu.currency} {totalPrice.toFixed(2)}
//         </Text>
//         <Button onPress={() => console.log("Adding to Cart", selectedItems)}>
//           <ButtonText>Add Selected to Cart</ButtonText>
//         </Button>
//       </HStack>
//     </Card>
//   );
// };

// export default GroupedItemsCard;
//!groupItems
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { useState, useContext, useEffect } from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  ButtonText,
  Card,
  HStack,
  Image,
  Text,
  VStack,
  Checkbox,
  Select,
  SelectItem,
} from "../../../components/ui";

import { useNavigation } from "@react-navigation/native";
import { LocalizationContext } from "../../../context/LocalizationContext";

const GroupedItemsCard = ({ items }) => {
  const dispatch = useDispatch();
  const localization = useSelector((state) => state.localization.localization);
  const navigation = useNavigation();

  const [selectedItems, setSelectedItems] = useState(
    items.map((item) => ({
      ...item,
      selected: true, // Default selected
      size: "Medium", // Default size
      extraToppings: [],
    }))
  );
  useEffect(() => {
    if (items.length > 0) {
      setSelectedItems(
        items.map((item) => ({
          ...item,
          selected: true,
          size: "Medium",
          extraToppings: [],
        }))
      );
    }
  }, [items]);

  const toggleItemSelection = (itemId) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleSizeChange = (itemId, newSize) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, size: newSize } : item
      )
    );
  };

  const handleToppingChange = (itemId, topping) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              extraToppings: item.extraToppings.includes(topping)
                ? item.extraToppings.filter((t) => t !== topping)
                : [...item.extraToppings, topping],
            }
          : item
      )
    );
  };

  const totalPrice = selectedItems
    .filter((item) => item.selected)
    .reduce(
      (sum, item) => sum + item.price + item.extraToppings.length * 1.5,
      0
    );

  return (
    <Card className="rounded-xl p-3 my-4 shadow-md bg-card">
      <Text bold size="lg" className="!text-accent font-bold text-xl mb-2">
        Items group
      </Text>

      {selectedItems.map((item) => (
        <VStack key={item.id} className="my-2">
          <HStack className="items-center">
            {/* Checkbox to select/deselect */}

            {/* Item Image */}
            <Box
              className="rounded-2xl overflow-hidden mx-2"
              style={{ width: scale(64), height: scale(64) }}
            >
              <Image
                resizeMode="cover"
                className="w-full h-full"
                source={item.image}
                alt={item.name}
              />
            </Box>

            {/* Item Details */}
            <VStack className="flex-1">
              <Text bold className="text-lg">
                {item.name}
              </Text>
              <Text className="text-primary-custom text-sm">
                {localization.menu.currency} {item.price.toFixed(2)}
              </Text>
            </VStack>
          </HStack>

          {/* Attribute Selection */}
          <HStack className="mt-2">
            {/* Size Selection */}
            <Select
              selectedValue={item.size}
              onValueChange={() => console.log("value")}
              className="flex-1 mr-2"
            >
              <SelectItem label="Small" value="Small" />
              <SelectItem label="Medium" value="Medium" />
              <SelectItem label="Large" value="Large" />
            </Select>

            {/* Extra Toppings */}
            <Button
              variant="outline"
              className="ml-2"
              onPress={() => handleToppingChange(item.id, "Extra Cheese")}
            >
              <ButtonText>
                {item.extraToppings.includes("Extra Cheese")
                  ? "✓ Extra Cheese"
                  : "Add Extra Cheese +$1.50"}
              </ButtonText>
            </Button>
          </HStack>
        </VStack>
        // <View>
        //   <Text>ahmed</Text>
        // </View>
      ))}

      {/* Total Price & Add to Cart Button */}
      <HStack className="justify-between items-center mt-3">
        <Text bold size="lg" className="text-xl">
          Total: {localization.menu.currency} {totalPrice.toFixed(2)}
        </Text>
        <Button onPress={() => console.log("Adding to Cart", selectedItems)}>
          <ButtonText>Add Selected to Cart</ButtonText>
        </Button>
      </HStack>
    </Card>
  );
};

export default GroupedItemsCard;
