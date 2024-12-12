import React from "react";
import { SafeAreaView, View, StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const ResponsiveContainer = ({ children, style, setMarginBottom = true }) => {
  return (
    <SafeAreaView style={styles.safeArea} className="bg-body !text-text">
      <View
        style={[
          style,
          setMarginBottom ? styles.container : styles.containerWithoutBigMargin,
        ]}
      >
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
    marginTop: verticalScale(16), // Top margin
    marginBottom: verticalScale(150), // Bottom margin
    marginLeft: scale(8), // Left margin
    marginRight: scale(8), // Right margin
    width: width - scale(16), // Width adjusted based on margins (16px on both sides)
    // borderRadius: moderateScale(12), // Rounded corner
  },
  containerWithoutBigMargin: {
    flex: 1,
    marginTop: verticalScale(16), // Top margin
    marginBottom: verticalScale(16), // Bottom margin
    marginLeft: scale(8), // Left margin
    marginRight: scale(8), // Right margin
    width: width - scale(16), // Width adjusted based on margins (16px on both sides)
    // borderRadius: moderateScale(12), // Rounded corner
  },
});
