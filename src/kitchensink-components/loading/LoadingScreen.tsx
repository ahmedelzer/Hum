import React, { FC, ReactNode } from "react";
import { View, Image } from "react-native";

type LoadingScreenProps = {
  LoadingComponent?: ReactNode; // Accepts a JSX element
};

const LoadingScreen: FC<LoadingScreenProps> = ({ LoadingComponent }) => {
  return (
    <View className="flex-1 bg-body justify-center items-center">
      {!LoadingComponent && (
        <Image
          source={require("../../../assets/display/logo.jpeg")}
          className="w-32 h-32"
        />
      )}
      {LoadingComponent}
    </View>
  );
};

export default LoadingScreen;
