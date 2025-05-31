import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StepIndicator from "react-native-step-indicator";
import { useAuth } from "../../../context/auth";
import StepHeader from "./StepHeader";
import { styles } from "./styles";
import StepFooter from "./StepFooter";
import StepBody from "./StepBody";
import { LocalizationContext } from "../../../context/LocalizationContext";
import { useSelector } from "react-redux";

const SplashScreen = () => {
  const [stepNum, setStepNum] = useState(0);
  const languageRow = useSelector((state) => state.localization.languageRow);
  return (
    <View style={styles.container}>
      <StepHeader currentPosition={stepNum} />
      <StepBody stepNum={stepNum} />
      <StepFooter
        stepNum={stepNum}
        withSkip={Object.keys(languageRow).length > 0}
        setStepNum={setStepNum}
      />
    </View>
  );
};

export default SplashScreen;
