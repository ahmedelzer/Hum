import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import { Card, HStack, Icon, Text, VStack } from "../../../components/ui";
import SuggestCardContainer from "../../utils/component/SuggestCardContainer";

const shortcuts = [
  {
    id: "1",
    name: "Spaghetti Carbonara",
    image: "https://example.com/spaghetti.jpg",
    lastOrderTime: "2 hours ago",
  },
  {
    id: "2",
    name: "Chicken Alfredo",
    image: "https://example.com/chicken-alfredo.jpg",
    lastOrderTime: "1 day ago",
  },
  {
    id: "3",
    name: "Caesar Salad",
    image: "https://example.com/caesar-salad.jpg",
    lastOrderTime: "3 days ago",
  },
  {
    id: "4",
    name: "Beef Tacos",
    image: "https://example.com/beef-tacos.jpg",
    lastOrderTime: "5 days ago",
  },
];

const HomeContent = () => {
  const localization = useSelector((state) => state.localization.localization);
  return (
    <>
      <HStack className="flex-1 items-center justify-between">
        <Text>{localization.Hum_screens.home.shortcuts}</Text>
        <Text className="text-primary-custom">{shortcuts.length}</Text>
      </HStack>

      <HStack className="flex-wrap flex-row flex mx-2">
        {shortcuts.map((shortcut) => (
          <Card
            key={shortcut.id}
            style={{
              borderRadius: 12,
            }}
            className="relative w-1/3 md:w-1/4 aspect-square shrink border-[4px] border-card"
          >
            <VStack className="items-center">
              <Image
                source={require("../../../assets/display/image11.png")}
                className="!size-12 md:!size-28 aspect-square rounded-full"
                resizeMode="cover"
              />
              <Text className="mt-2 text-sm font-bold">{shortcut.name}</Text>
            </VStack>
            <Icon
              as={() => (
                <MaterialIcons
                  name="launch"
                  className="absolute bottom-1 left-1 w-4 h-4 !text-text"
                  size={16}
                />
              )}
            />
          </Card>
        ))}
      </HStack>
      <SuggestCardContainer />
    </>
  );
};

export default HomeContent;
