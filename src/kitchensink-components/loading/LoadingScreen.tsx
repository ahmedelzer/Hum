import React, { FC } from "react";
import { View, Text, Image } from "react-native";

const LoadingScreen: FC = () => {
  return (
    <View className="flex-1 bg-body justify-center items-center">
      <Image
        source={require("../../../assets/display/logo.jpeg")} // Replace with your logo path
        className="w-32 h-32"
      />
      {/* <Text className="text-lg font-semibold mt-4 text-gray-800">
        Loading...
      </Text> */}
    </View>
  );
};

export default LoadingScreen;
