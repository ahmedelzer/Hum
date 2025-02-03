import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";
import { Image } from "../../../components/ui";
import Test from "../../components/cards/Test";

const { width } = Dimensions.get("window");
const data = [
  {
    src: require("../../../assets/display/food1.jpg"),
  },
  {
    src: require("../../../assets/display/food.jpg"),
  },

  {
    src: require("../../../assets/display/food.jpg"),
  },
  // {
  //   src: require("../../../assets/display/image5.png"),
  // },
  {
    src: require("../../../assets/display/food.jpg"),
  },
  // {
  //   src: require("../../../assets/display/image7.png"),
  // },
  {
    src: require("../../../assets/display/food.jpg"),
  },
];
const MyCarousel = () => {
  const [index, setIndex] = useState(0);
  const scrollViewRef = useRef(null);

  // Auto-scroll logic (fixes autoplay on Web)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prevIndex) => (prevIndex + 1) % data.length);
  //   }, 3000); // Change slide every 3 seconds

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <View style={styles.container}>
      {/* Main Carousel */}
      <Carousel
        width={width}
        height={200}
        data={data}
        scrollAnimationDuration={500}
        defaultIndex={index}
        autoPlay={false}
        onSnapToItem={(newIndex) => setIndex(newIndex)}
        renderItem={({ item }) => <Test image={item.src} />}
      />

      {/* Dots Indicator */}
      <View style={{ marginTop: 20 }}>
        <AnimatedDotsCarousel
          length={data.length}
          currentIndex={index}
          scrollableDotsConfig={{
            setIndex,
            onNewIndex: (newIndex) => {
              scrollViewRef?.current?.scrollTo?.({
                x: newIndex * width,
                animated: false,
              });
            },
            containerBackgroundColor: "rgba(230,230,230, 0.5)",
            container: {
              alignItems: "center",
              borderRadius: 15,
              height: 30,
              justifyContent: "center",
              paddingHorizontal: 15,
            },
          }}
          maxIndicators={4}
          interpolateOpacityAndColor={true}
          activeIndicatorConfig={{
            color: "#111111",
            margin: 3,
            opacity: 1,
            size: 8,
          }}
          inactiveIndicatorConfig={{
            color: "#111",
            margin: 3,
            opacity: 0.5,
            size: 8,
          }}
          decreasingDots={[
            {
              config: { color: "#111", margin: 3, opacity: 0.5, size: 6 },
              quantity: 1,
            },
            {
              config: { color: "#111", margin: 3, opacity: 0.5, size: 4 },
              quantity: 1,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  text: { color: "#fff", fontSize: 24, fontWeight: "bold" },
});

export default MyCarousel;
