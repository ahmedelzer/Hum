import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../../context/auth";
import { styles } from "./styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function StepFooter({ stepNum, setStepNum, withSkip = false }) {
  const { setHasOnboarded } = useAuth();

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

  return (
    <View style={styles.footerContainer}>
      {stepNum >= 1 && (
        <TouchableOpacity style={styles.modernButton} onPress={handlePrv}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.modernButton} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>

      {withSkip && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <MaterialIcons name="skip-next" size={20} color="#888" />
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
