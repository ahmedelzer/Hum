// components/StepHeader.js
import React from "react";
import { StyleSheet, View } from "react-native";
import StepIndicator from "react-native-step-indicator";
import { useSelector } from "react-redux";
import { theme } from "../../Theme";

const labels = ["Welcome", "Language", "Intro"];

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

const StepHeader = ({ currentPosition = 0 }) => {
  const localization = useSelector((state) => state.localization.localization);

  return (
    <View style={styles.container}>
      <StepIndicator
        customStyles={customStyles}
        direction="horizontal"
        currentPosition={currentPosition}
        labels={localization.Hum_screens.splash.headerLabels}
        stepCount={labels.length}
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
