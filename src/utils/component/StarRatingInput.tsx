import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import { runOnJS } from "react-native-reanimated";
const { width } = Dimensions.get("window");
const STAR_COUNT = 5;
const STAR_SIZE = 40;
const TOTAL_WIDTH = STAR_COUNT * (STAR_SIZE + 10);

const AnimatedStarRatingInput = ({ rating = 0, onChange }) => {
  const [currentRating, setCurrentRating] = useState(rating);
  const animatedValues = Array(STAR_COUNT)
    .fill(0)
    .map(() => useSharedValue(1));

  const handleRate = (index) => {
    setCurrentRating(index + 1);
    onChange && onChange(index + 1);
    animateStars(index);
  };

  const animateStars = (index) => {
    animatedValues.forEach((value, i) => {
      value.value = withSpring(i <= index ? 1.3 : 1);
      setTimeout(() => {
        value.value = withSpring(1);
      }, 300);
    });
  };

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      const x = event.x;
      const index = Math.floor(x / (STAR_SIZE + 10));
      if (index >= 0 && index < STAR_COUNT) {
        runOnJS(handleRate)(index);
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={styles.starRow}>
        {[...Array(STAR_COUNT)].map((_, i) => {
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: animatedValues[i].value }],
          }));

          return (
            <Animated.View key={i} style={[animatedStyle, styles.star]}>
              <FontAwesome
                name={i < currentRating ? "star" : "star-o"}
                size={STAR_SIZE}
                color={i < currentRating ? "#FFD700" : "#DDD"}
                onPress={() => handleRate(i)}
              />
            </Animated.View>
          );
        })}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  starRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: TOTAL_WIDTH,
    alignSelf: "center",
    paddingVertical: 20,
  },
  star: {
    marginHorizontal: 5,
  },
});

export default AnimatedStarRatingInput;
