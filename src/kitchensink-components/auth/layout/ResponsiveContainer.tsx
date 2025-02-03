import React from "react";
import { Platform } from "react-native";
import { SafeAreaView, View, StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const ResponsiveContainer = ({ children, style, setMargin }) => {
  return (
    <SafeAreaView
      style={styles.safeArea}
      className={
        `${Platform.OS === "web" && "container"}` + " bg-body !text-text"
      }
    >
      <View style={[style, styles.container, setMargin && styles.setMargin]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default ResponsiveContainer;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ensures the container fills the screen
  },
  container: {
    flex: 1,
    paddingRight: scale(8), // Left margin
    paddingLeft: scale(8), // Right margin
    width: width - scale(16), // Width adjusted based on margins (16px on both sides)
    // borderRadius: moderateScale(12), // Rounded corner
    marginLeft: "auto", //
    marginRight: "auto", //
  },
  setMargin: {
    marginTop: verticalScale(16), // Top margin
    marginBottom: verticalScale(16), // Bottom margin
  },
});
