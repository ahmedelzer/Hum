import React from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "../../Theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
export default function StarsIcons({ value }) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.25 && value % 1 < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  console.log(fullStars, hasHalfStar, emptyStars, value);

  return (
    <View style={styles.starRow}>
      {[...Array(fullStars)].map((_, i) => (
        <AntDesign
          key={`full-${i}`}
          name="star"
          className="!text-[#f59e0b]"
          size={16}
        />
      ))}
      {hasHalfStar && (
        <FontAwesome
          key="half"
          name="star-half"
          className="!text-[#f59e0b]"
          size={16}
          //   style={{
          //     clipPath: "inset(0 50% 0 0)",
          //     display: "inline-block",
          //   }}
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <AntDesign
          name="staro"
          key={`empty-${i}`}
          className="!text-text"
          size={16}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  starRow: {
    flexDirection: "row",
  },
  fullStar: {
    color: "#f59e0b", // Tailwind's text-accent equivalent (amber-500)
  },
  emptyStar: {
    color: theme.text, // Tailwind's text-gray-300
  },
  halfStarWrapper: {
    position: "relative",
    width: 16,
    height: 16,
    overflow: "hidden",
  },
  halfStarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 8, // half of 16
    height: 16,
    overflow: "hidden",
  },
});
