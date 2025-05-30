// components/StepHeader.js
import React from "react";
import { View, StyleSheet } from "react-native";
import StepIndicator from "react-native-step-indicator";

const labels = ["Welcome", "Language", "Intro"];

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 35,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#007bff",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#007bff",
  stepStrokeUnFinishedColor: "#cccccc",
  separatorFinishedColor: "#007bff",
  separatorUnFinishedColor: "#cccccc",
  stepIndicatorFinishedColor: "#007bff",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#007bff",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#cccccc",
  labelColor: "#cccccc",
  labelSize: 12,
  currentStepLabelColor: "#007bff",
};

const StepHeader = ({ currentPosition = 0 }) => {
  return (
    <View style={styles.container}>
      <StepIndicator
        customStyles={customStyles}
        direction="horizontal"
        currentPosition={currentPosition}
        labels={labels}
        stepCount={labels.length}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    width: "100%",
    backgroundColor: "#fff",
  },
});

export default StepHeader;
