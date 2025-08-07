import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../../context/auth";
import { styles } from "./styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import useTimer from "../../../components/hooks/Custom/useTimer";
import { theme } from "../../Theme";
import { useSelector } from "react-redux";

export default function StepFooter({ stepNum, setStepNum, withSkip = false }) {
  const { setHasOnboarded } = useAuth();
  const localization = useSelector((state) => state.localization.localization);

  const handleNext = () => {
    if (stepNum <= 1) {
      setStepNum((prevStep) => prevStep + 1);
    } else {
      handleSkip();
    }
  };

  const handlePrv = () => {
    if (stepNum >= 1) setStepNum((prevStep) => prevStep - 1);
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem("hasOnboarded", "true");
    setHasOnboarded(true);
  };
  // useTimer(1, () => {//todo timer
  //   handleNext();
  // });
  return (
    <View className="w-full flex justify-center items-center">
      <View style={styles.footerContainer}>
        {stepNum >= 1 && (
          <TouchableOpacity style={styles.modernButton} onPress={handlePrv}>
            <Ionicons name="arrow-back" size={20} color={theme.body} />
            <Text style={styles.buttonText}>
              {localization.Hum_screens.splash.buttonPrevious}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.modernButton} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {" "}
            {localization.Hum_screens.splash.buttonNext}
          </Text>
          <Ionicons name="arrow-forward" size={20} color={theme.body} />
        </TouchableOpacity>
      </View>
      {withSkip && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <MaterialIcons name="skip-next" size={20} color={theme.primary} />
          <Text style={styles.skipText}>
            {" "}
            {localization.Hum_screens.splash.buttonSkip}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
