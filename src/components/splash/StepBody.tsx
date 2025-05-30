import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
import { styles } from "./styles";
import LanguageSelector from "../language/LanguageSelector";
import { VideoPlayer } from "expo-video";
import AddCard from "../cards/AddCard";

export default function StepBody({ stepNum }) {
  switch (stepNum) {
    case 0:
      return (
        <View className="flex justify-center items-center">
          <Image
            source={require("../../../assets/display/logo.jpeg")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Welcome to ShopMate 🛒</Text>
          <Text style={styles.description}>
            Discover amazing products, deals, and more!
          </Text>
        </View>
      );
    case 1:
      return (
        <View className="flex justify-center items-center">
          <Text style={styles.title}>Now choose your Language</Text>
          <View className="w-full h-20 py-2 mb-2">
            <LanguageSelector />
          </View>
        </View>
      );
    case 2:
      return (
        <View className="flex justify-center items-center">
          <Text style={styles.title}>How to Use ShopMate 📽</Text>
          <View style={styles.videoContainer}>
            <AddCard
              source={require("../../../assets/display/videoTest.mp4")}
              mediaType="video"
            />
          </View>
        </View>
      );
    default:
      return null;
  }
}
