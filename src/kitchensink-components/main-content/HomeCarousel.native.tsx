import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  Text,
} from "react-native";
import Carousel from "react-native-reanimated-carousel"; // Works on mobile
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";
import { Image } from "../../../components/ui";
import AddCard from "../../components/cards/AddCard";
import { theme } from "../../Theme";
import SuggestCardContainer from "../../utils/component/SuggestCardContainer";
import AddressLocationCollapsible from "../../utils/component/AddressLocationCollapsible";

const { width } = Dimensions.get("window");

const data = [
  { src: require("../../../assets/display/food1.jpg") },
  { src: require("../../../assets/display/food.jpg") },
  { src: require("../../../assets/display/food.jpg") },
  { src: require("../../../assets/display/food.jpg") },
  { src: require("../../../assets/display/food.jpg") },
];

const HomeCarousel = () => {
  const [index, setIndex] = useState(0);
  const scrollViewRef = useRef(null);

  // Auto-scroll logic for Web
  // useEffect(() => {
  //   if (Platform.OS === "web") {
  //     const interval = setInterval(() => {
  //       setIndex((prevIndex) => (prevIndex + 1) % data.length);
  //     }, 3000); // Change slide every 3 seconds
  //     return () => clearInterval(interval);
  //   }
  // }, []);

return (
  <ScrollView style={{ flex: 1, backgroundColor: theme.body }}>
    <View style={{ flex: 1, paddingBottom: 20 }}>

      {/* Header Section */}
      <View
        style={{
          backgroundColor: theme.card,
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
        }}
      >
        <AddressLocationCollapsible />
      </View>

      {/* Carousel Section */}
      <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
        <Carousel
          width={width - 24} // Account for horizontal padding
          height={200}
          data={data}
          scrollAnimationDuration={500}
          defaultIndex={index}
          autoPlay={false}
          onSnapToItem={(newIndex) => setIndex(newIndex)}
          renderItem={({ item }) => <AddCard source={item.src} />}
        />
      </View>

      {/* Dots Indicator */}
      <View style={{ marginTop: 20, alignItems: "center" }}>
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
            containerBackgroundColor: theme.card,
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
            color: theme.text,
            margin: 3,
            opacity: 1,
            size: 8,
          }}
          inactiveIndicatorConfig={{
            color: theme.text,
            margin: 3,
            opacity: 0.5,
            size: 8,
          }}
          decreasingDots={[
            {
              config: { color: theme.text, margin: 3, opacity: 0.5, size: 6 },
              quantity: 1,
            },
            {
              config: { color: theme.text, margin: 3, opacity: 0.5, size: 4 },
              quantity: 1,
            },
          ]}
        />
      </View>

      {/* Suggest Cards Section */}
      <SuggestCardContainer />
    </View>
  </ScrollView>
);

};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  webCarousel: {
    flexDirection: "row",
    width: "100%",
  },
});

export default HomeCarousel;
