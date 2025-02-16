import * as React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  View,
  Image,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from "react-native";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Test from "./AddCard";

const { width, height } = Dimensions.get("window");
//!when use theme make object of them cause react native doesn’t support CSS variables
export default function CarouselApp({ images }) {
  const [index, setIndex] = React.useState<number>(0);
  const scrollViewRef = React.useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const finalIndex = Math.floor(contentOffsetX / width);
    setIndex(finalIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{
          width: "100%",
          height: 300,
        }}
      >
        {images.map((image) => (
          <View
            key={image.id}
            style={{
              width: width,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={image.src}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
            />
          </View>
        ))}
      </ScrollView>
      <View style={{ marginTop: 20 }}>
        <AnimatedDotsCarousel
          length={images.length}
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
          currentIndex={index}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
