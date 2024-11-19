import React, { useState, useEffect } from "react";
import { I18nManager, Text, View, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";

const TestPage = () => {
  const [isRTL, setIsRTL] = useState(I18nManager.isRTL);

  useEffect(() => {
    // Load saved direction preference on app start
    const loadDirection = async () => {
      const savedDirection = await AsyncStorage.getItem("isRTL");
      if (savedDirection !== null) {
        const direction = savedDirection === "true";
        setIsRTL(direction);
        if (I18nManager.isRTL !== direction) {
          I18nManager.forceRTL(direction);
        }
      }
    };
    loadDirection();
  }, []);

  const toggleDirection = async () => {
    const newDirection = !isRTL;
    setIsRTL(newDirection);
    await AsyncStorage.setItem("isRTL", newDirection.toString());

    // Apply the new direction and restart the app
    I18nManager.forceRTL(newDirection);
    RNRestart.Restart();
  };

  return (
    <View
      style={[
        styles.container,
        { flexDirection: isRTL ? "row-reverse" : "row" },
      ]}
    >
      <Text style={[styles.text, { textAlign: isRTL ? "right" : "left" }]}>
        {isRTL ? "مرحبا بالعالم" : "Hello, world!"}
      </Text>
      <Button
        title={`Switch to ${isRTL ? "LTR" : "RTL"}`}
        onPress={toggleDirection}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default TestPage;
