import React from "react";
import { SafeAreaView, TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import { Box, HStack, VStack, Card, Icon } from "@/components/ui";
import { ChevronRight } from "lucide-react-native";

const RoomsView = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const isMobileDevice = width <= 500;

  // Static data to emulate the view
  const staticData = [
    {
      id: 1,
      title: "Room 1",
      status: "available",
    },
    {
      id: 2,
      title: "Room 2",
      status: "available",
    },
    {
      id: 3,
      title: "Room 3",
      status: "available",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Room List */}
      <Box className="flex-1 mt-4 mx-4">
        <HStack className="justify-between mb-2">
          <Text className="text-lg">Choose Room</Text>
          <Text className="text-sm text-gray-500">Rooms</Text>
        </HStack>

        {staticData.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              //@ts-ignore
              navigation.navigate("LiveChatView");
            }}>
            <Card className="bg-white p-4 mb-4 rounded-lg ">
              <HStack space="md" className="items-center">
                <VStack>
                  <Text className="text-base">{item.title}</Text>
                </VStack>
                <Box className="rounded-full py-1 px-2 bg-green-400">
                  <Text className="text-base color-green-700">
                    {item.status}
                  </Text>
                </Box>
                <Icon
                  as={ChevronRight}
                  size="sm"
                  color="#25A4EB"
                  className="ml-auto"
                />
              </HStack>
            </Card>
          </TouchableOpacity>
        ))}
      </Box>
    </SafeAreaView>
  );
};

export default RoomsView;
