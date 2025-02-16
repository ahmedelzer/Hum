import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { I18nManager, Pressable, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  ButtonText,
  Card,
  HStack,
  Image,
  Text,
  VStack,
} from "../../../components/ui";

import { useNavigation } from "@react-navigation/native";
import { LocalizationContext } from "../../../context/LocalizationContext";
import { AddToCartPrimaryButton } from "../../kitchensink-components/cart/AddToCartButton";

const MenuCardView = ({ item, selectedItems, setSelectedItems }) => {
  const dispatch = useDispatch();
  const { localization } = useContext(LocalizationContext);
  const navigation = useNavigation();
  const selected = selectedItems.find((selected) => selected.id === item.id);

  // Function to handle long press
  const handleLongPress = () => {
    if (selected) {
      const filterItemsSelected = selectedItems.filter(
        (selectedItem) => selectedItem.id !== selected.id
      );
      setSelectedItems(filterItemsSelected);
    } else {
      setSelectedItems((prev) => [...prev, item]);
    }
  };
  const handlePress = () => {
    if (selectedItems.length > 0) {
      handleLongPress();
    } else {
      navigation.navigate("DetailsProductScreen", item);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={handleLongPress} //todo then change the header of the screen by setting  options like Delete, Archive
    >
      <Card
        className={`flex flex-row items-center rounded-xl p-2 my-4 shadow-md ${
          selected ? "border-2 border-green-500 bg-green-100" : "bg-card"
        }`}
      >
        {/* Left side: Image */}
        <View className="w-1/2 flex justify-center items-center">
          <Box
            className="rounded-2xl overflow-hidden"
            style={{
              width: scale(128),
              height: scale(128),
            }}
          >
            <Image
              resizeMode="cover"
              className="w-full h-full"
              source={item.image}
              alt="food"
            />
          </Box>
          <HStack space="lg" className="items-center mt-2">
            <Button variant="link">
              <ButtonText
                className="font-medium text-typography-900"
                style={{ fontSize: moderateScale(12) }}
              >
                10
              </ButtonText>
              {/* <Icon
                as={User2Icon}
                className="mx-1"
                style={{ width: scale(10), height: scale(10) }}
                color="green"
              /> */}
              <Feather
                name="user"
                size={16}
                color="green"
                style={{ marginHorizontal: scale(1) }}
              />
            </Button>

            <Button variant="link">
              <ButtonText
                className="font-medium text-typography-900"
                style={{ fontSize: moderateScale(12) }}
              >
                5
              </ButtonText>
              {/* <Icon
                as={StarIcon}
                className="mx-1"
                style={{ width: scale(10), height: scale(10) }}
              /> */}
              <FontAwesome
                name="star"
                size={16}
                color="gold"
                style={{ marginHorizontal: scale(1) }}
              />
            </Button>

            <Button variant="link">
              <ButtonText
                className="font-medium text-typography-900"
                style={{ fontSize: moderateScale(12) }}
              >
                8
              </ButtonText>
              {/* <Icon
                as={CogIcon}
                color="purple"
                className="mx-1"
                style={{ width: scale(10), height: scale(10) }}
              /> */}
              <MaterialIcons
                name="settings"
                size={16}
                color="purple"
                style={{ marginHorizontal: scale(1) }}
              />
            </Button>
          </HStack>
        </View>

        {/* Right side: Content */}
        <View className="w-1/2 px-1">
          <VStack>
            <View className={I18nManager.isRTL ? "items-start" : "items-start"}>
              <Text bold size="lg" className="!text-accent font-bold text-xl">
                {item.name}
              </Text>

              <Text className="text-primary-custom text-lg">
                {item.description}
              </Text>
            </View>

            <View className="flex flex-row justify-end mt-2">
              <Text className="text-xl font-bold">
                {localization.menu.currency} {item.price}
              </Text>
            </View>
            <AddToCartPrimaryButton item={item} />
          </VStack>
        </View>
      </Card>
    </Pressable>
  );
};

export default MenuCardView;
