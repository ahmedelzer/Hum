import { AnimatePresence, Motion } from "@legendapp/motion";
import React from "react";
import { View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
//!locaization
export const CarouselBox = ({ image, title, description, actions }) => {
  const { likes, setLikes } = actions;

  return (
    <Box className="justify-center items-center">
      <View>
        <Image
          source={image}
          alt={title}
          className="w-auto h-[70%] rounded-xl"
          style={{
            resizeMode: "cover",
            aspectRatio: 1,
            borderRadius: moderateScale(10),
          }}
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
              <MaterialCommunityIcons
                name="heart"
                size={24}
                color={likes ? "red" : "gray"}
              />
            </Motion.View>
          </AnimatePresence>
        </Pressable>

        <VStack space="sm">
          <Text bold size="sm" className="text-primary">
            {title}
          </Text>
          <Text size="sm" className="text-primary-custom">
            {description}
          </Text>
          <HStack space="sm" className="items-center">
            <HStack space="xs" className="items-center">
              {[...Array(4)].map((_, i) => (
                <MaterialCommunityIcons
                  key={i}
                  name="star"
                  size={16}
                  color="orange"
                />
              ))}
            </HStack>
            <Text size="sm" className="ml-2 text-card">
              4.5
            </Text>
            <Text size="sm" className="ml-2 text-card">
              8
            </Text>
            <MaterialCommunityIcons
              name="account-check"
              size={16}
              color="green"
            />
          </HStack>
          <HStack space="lg" className="items-center">
            <Button variant="link">
              <Text className="font-medium text-sm">8</Text>
              <MaterialCommunityIcons
                name="cube-outline"
                size={16}
                className="ml-1 !text-accent"
              />
            </Button>
            <Button variant="link">
              <Text className="font-medium text-sm">18</Text>
              <MaterialCommunityIcons name="axe" size={16} className="ml-1" />
            </Button>
            <Button variant="link">
              <Text className="font-medium text-sm">Locate</Text>
              <MaterialCommunityIcons
                name="map-marker"
                size={16}
                className="ml-1"
              />
            </Button>
          </HStack>
        </VStack>
      </Card>
    </Box>
  );
};
