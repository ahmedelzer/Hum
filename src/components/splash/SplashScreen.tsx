import React, { useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import StepBody from "./StepBody";
import StepFooter from "./StepFooter";
import StepHeader from "./StepHeader";
import { styles } from "./styles";

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
