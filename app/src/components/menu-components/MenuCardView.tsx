import React, { useState } from "react";
import { View } from "react-native";
import { scale, moderateScale } from "react-native-size-matters";
import {
  Box,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
  Card,
  Button,
  ButtonText,
} from "../../../components/ui";
import { StarIcon, User2Icon, CogIcon, Container } from "lucide-react-native";

const MenuCardView = ({
  imageView,
  description,
  numberOfIndividuals,
  rate,
  likes,
  dislikes,
  orders,
  reviews,
  text,
}) => {
  return (
    <Card className="flex flex-row items-center rounded-xl p-2 my-4 bg-card shadow-md">
      {/* Left side: Image */}
      <View className="w-1/2 flex justify-center items-center">
        {/* {imageView && ( */}
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
            source={require("../../../assets/display/food1.jpg")}
            alt="food"
          />
        </Box>
        {/* )} */}
      </View>

      {/* Right side: Content */}
      <View className="w-1/2 px-2">
        <VStack>
          {/* {text && ( */}
          <Text
            bold
            size="lg"
            style={{
              fontSize: moderateScale(16),
            }}
            className="!text-accent font-bold"
          >
            {text?.parameterTitel} Title
          </Text>
          {/* )} */}

          {/* {description && ( */}
          <Text
            numberOfLines={1}
            className="text-primary-custom"
            style={{
              fontSize: moderateScale(14),
            }}
          >
            {description?.parameterTitel} Description Description
          </Text>
          {/* )} */}

          <HStack space="lg" className="items-center mt-2">
            {/* {numberOfIndividuals && ( */}
            <Button variant="link">
              <ButtonText
                className="font-medium text-sm text-typography-900"
                style={{ fontSize: moderateScale(12) }}
              >
                10
              </ButtonText>
              <Icon as={User2Icon} className="h-4 w-4 ml-1" color="green" />
            </Button>
            {/* )} */}

            {/* {reviews && ( */}
            <Button variant="link">
              <ButtonText
                className="font-medium text-sm text-typography-900"
                style={{ fontSize: moderateScale(12) }}
              >
                5
              </ButtonText>
              <Icon
                as={StarIcon}
                className="h-4 w-4 text-background-900 ml-1"
              />
            </Button>
            {/* )} */}

            {/* {orders && ( */}
            <Button variant="link">
              <ButtonText
                className="font-medium text-sm text-typography-900"
                style={{ fontSize: moderateScale(12) }}
              >
                8
              </ButtonText>
              <Icon as={CogIcon} color="purple" className="h-4 w-4 ml-1" />
            </Button>
            {/* )} */}
          </HStack>
        </VStack>
      </View>
    </Card>
  );
};

export default MenuCardView;
