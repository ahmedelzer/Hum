import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
import { styles } from "./styles";
import LanguageComponent from "../language/LanguageSelector";
import { VideoPlayer } from "expo-video";
import AddCard from "../cards/AddCard";
import { useSelector } from "react-redux";

export default function StepBody({ stepNum }) {
  const localization = useSelector((state) => state.localization.localization);

  switch (stepNum) {
    case 0:
      return (
        <View className="flex justify-center items-center">
          <Image
            source={require("../../../assets/display/logo.jpeg")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            {localization.Hum_screens.splash.welcome}
          </Text>
          <Text style={styles.description}>
            {localization.Hum_screens.splash.quickDescription}
          </Text>
        </View>
      );
    case 1:
      return (
        <View className="flex justify-center items-center">
          <Text style={styles.title}>
            {localization.Hum_screens.splash.language}
          </Text>
          <View className="w-full h-20 py-2 mb-2">
            {/* <LanguageComponent />//!here must Warning: ReferenceError: Property 'useSelector' doesn't exist solve  */}
          </View>
        </View>
      );
    case 2:
      return (
        <View className="flex justify-center items-center">
          <Text style={styles.title}>
            {localization.Hum_screens.splash.videoTitle}
          </Text>
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
