import { AnimatePresence, Motion } from "@legendapp/motion";
import {
  AxeIcon,
  BoxIcon,
  Heart,
  LocateIcon,
  StarIcon,
  UserCheck,
} from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import {
  Box,
  Button,
  Card,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
  VStack,
} from "../../../components/ui";
export const CarouselBox = ({ image, title, description, actions }) => {
  const { likes, setLikes } = actions;
  return (
    <Box className="justify-center items-center">
      <View>
        <Image
          source={image}
          alt={title}
          className="w-auto h-[70%] rounded-xl" //!solve the height
          style={{
            // width: "60%", // Responsive logo width
            // height: "60%", // Responsive logo height
            resizeMode: "cover",
            aspectRatio: 1, // Maintain square aspect ratio
            borderRadius: moderateScale(10), // Rounded corners
          }}
          // resizeMode="cover"
        />
      </View>
      <Card
        variant="elevated"
        className="absolute bottom-6 w-[90%] md:w-[80%] lg:w-[70%] p-4 rounded-3xl shadow-xl"
      >
        <Pressable
          onPress={() => setLikes(!likes)}
          className="absolute top-3 right-4 h-6 w-6 justify-center items-center"
        >
          <AnimatePresence>
            <Motion.View
              key={likes ? "like" : "dislike"}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{
                type: "spring",
                mass: 0.9,
                damping: 9,
                stiffness: 300,
              }}
            >
              <Icon
                as={Heart}
                size="xl"
                className={`${
                  likes
                    ? "fill-red-500 stroke-red-500"
                    : "fill-gray-500 stroke-white"
                }`}
              />
            </Motion.View>
          </AnimatePresence>
        </Pressable>

        <VStack space="sm">
          <Text bold size="sm" className="text-primary">
            {title}
          </Text>
          <Text size="sm" className="text-gray-500">
            {description}
          </Text>
          <HStack space="sm" className="items-center">
            <HStack space="xs" className="items-center">
              {[...Array(4)].map((_, i) => (
                <Icon key={i} as={StarIcon} size="sm" color="orange" />
              ))}
            </HStack>
            <Text size="sm" className="ml-2 text-gray-600">
              4.5
            </Text>
            <Text size="sm" className="ml-2 text-gray-600">
              8
            </Text>
            <Icon as={UserCheck} size="sm" color="green" />
          </HStack>
          <HStack space="lg" className="items-center">
            <Button variant="link">
              <Text className="font-medium text-sm">8</Text>
              <Icon as={BoxIcon} className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="link">
              <Text className="font-medium text-sm">18</Text>
              <Icon as={AxeIcon} className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="link">
              <Text className="font-medium text-sm">Locate</Text>
              <Icon as={LocateIcon} className="h-4 w-4 ml-1" />
            </Button>
          </HStack>
        </VStack>
      </Card>
    </Box>
  );
};
