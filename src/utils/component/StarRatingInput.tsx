// components/StarRatingInput.js
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, PanResponder } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // or 'react-native-vector-icons/FontAwesome'

const StarRatingInput = ({ rating = 0, onChange }) => {
  const [hoverRating, setHoverRating] = useState(rating);

  const starSize = 30;

  // Handle dragging (overlay)
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const starIndex = Math.floor(
        (gestureState.moveX - gestureState.x0) / starSize
      );
      if (starIndex >= 0 && starIndex < 5) {
        setHoverRating(starIndex + 1);
        onChange && onChange(starIndex + 1);
      }
    },
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {[1, 2, 3, 4, 5].map((i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={0.7}
          onPress={() => {
            setHoverRating(i);
            onChange && onChange(i);
          }}
        >
          <FontAwesome
            name={i <= hoverRating ? "star" : "star-o"}
            size={starSize}
            color={i <= hoverRating ? "#FFD700" : "#CCCCCC"}
            style={{ marginHorizontal: 5 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
  },
});

export default StarRatingInput;
