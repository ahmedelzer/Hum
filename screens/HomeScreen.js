import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Button,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
var { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const data = [1, 2, 3];
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate("Add");
  };
  const pressHandler2 = () => {
    navigation.navigate("Homescreen");
  };
  return (
    <View className="mb-8 bg-white">
      <Text className=" text-xl mx-4 mb-5">companes</Text>
      <Carousel
        data={data}
        renderItem={() => <Companes />}
        firstItem={1}
        // loop={true}
        // inactiveSlideScale={0.86}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
      <View className="flex flex-row px-4 justify-evenly mt-10">
        <Text onPress={pressHandler}>one</Text>
        <Text onPress={pressHandler2}>one</Text>
        <Text>one</Text>
      </View>
    </View>
  );
}

const Companes = () => {
  return (
    <TouchableWithoutFeedback>
      <Image
        source={require("../assets/logo.jpg")}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
