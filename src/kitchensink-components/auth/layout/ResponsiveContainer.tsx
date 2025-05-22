import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { SafeAreaView, View, StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { theme } from "../../../Theme";

const ResponsiveContainer = ({ children, style, setMargin }) => {
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    if (Platform.OS === "web") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        Platform.OS === "web" && styles.webSafeArea,
        { backgroundColor: theme.body }, // Set background explicitly
      ]}
      className="!text-text"
    >
      <View
        style={[
          styles.container,
          style,
          setMargin && styles.setMargin,
          { width: windowWidth - scale(16) }, // Dynamically adjust width
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

export default ResponsiveContainer;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  webSafeArea: {
    alignItems: "center", // Ensures content is centered in the web view
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(8),
    marginLeft: "auto",
    marginRight: "auto",
    color: theme.text,
  },
  setMargin: {
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
  },
});
