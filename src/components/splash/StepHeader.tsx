import React from "react";
import { StyleSheet, View, Text } from "react-native";
import StepIndicator from "react-native-step-indicator";
import { theme } from "../../Theme";

// You can customize these icons based on each label
const statusIcons = {
  // Order flow
  Preparing: "🛠️",
  Prepared: "📦",
  "Picked Up": "🚗",
  "Out for Delivery": "🚚",
  Delivered: "✅",
  // Header flow
  Welcome: "👋",
  Language: "🌐",
  Intro: "📖",
};

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 35,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: theme.accentHover,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: theme.accentHover,
  stepStrokeUnFinishedColor: theme.primary,
  separatorFinishedColor: theme.accentHover,
  separatorUnFinishedColor: theme.primary,
  stepIndicatorFinishedColor: theme.accentHover,
  stepIndicatorUnFinishedColor: theme.body,
  stepIndicatorCurrentColor: theme.body,
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: theme.accentHover,
  stepIndicatorLabelFinishedColor: theme.body,
  stepIndicatorLabelUnFinishedColor: theme.primary,
  labelColor: theme.primary,
  labelSize: 12,
  currentStepLabelColor: theme.accentHover,
};

const StepHeader = ({ currentPosition = 0, labels, customKey }) => {
  const renderStepIndicator = ({ position, stepStatus }) => {
    const label = labels[position];
    const icon = statusIcons[label] || "❓"; // fallback icon

    return <Text style={{ fontSize: 16 }}>{icon}</Text>;
  };

  return (
    <View style={styles.container} key={customKey}>
      <StepIndicator
        customStyles={customStyles}
        direction="horizontal"
        currentPosition={currentPosition}
        labels={labels}
        stepCount={labels.length}
        renderStepIndicator={renderStepIndicator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    width: "100%",
    backgroundColor: theme.body,
  },
});

export default StepHeader;
