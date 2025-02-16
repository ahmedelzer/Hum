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

const { width } = Dimensions.get("window");

const data = [
  { src: require("../../../assets/display/food1.jpg") },
  { src: require("../../../assets/display/food.jpg") },
  { src: require("../../../assets/display/food.jpg") },
  { src: require("../../../assets/display/food.jpg") },
  { src: require("../../../assets/display/food.jpg") },
];

const MyCarousel = () => {
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
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(
              event.nativeEvent.contentOffset.x / width
            );
            setIndex(newIndex);
          }}
          style={styles.webCarousel}
          // className="!mb-20"
        >
          {data.map((item, i) => (
            <View key={i} style={{ width: width, height: 400 }}>
              <AddCard source={item.src} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <Carousel
          width={width}
          height={200}
          data={data}
          scrollAnimationDuration={500}
          defaultIndex={index}
          autoPlay={false}
          onSnapToItem={(newIndex) => setIndex(newIndex)}
          renderItem={({ item }) => <AddCard source={item.src} />}
        />
      )}

      {/* Dots Indicator */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  webCarousel: {
    flexDirection: "row",
    width: "100%",
  },
});

export default MyCarousel;
