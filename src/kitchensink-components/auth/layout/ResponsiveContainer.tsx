// import React from "react";
// import { Platform } from "react-native";
// import { SafeAreaView, View, StyleSheet, Dimensions } from "react-native";
// import { scale, verticalScale, moderateScale } from "react-native-size-matters";

// const ResponsiveContainer = ({ children, style, setMargin }) => {
//   return (
//     <SafeAreaView
//       style={styles.safeArea}
//       className={
//         `${Platform.OS === "web" && "container"}` + " bg-body !text-text"
//       }
//     >
//       <View style={[style, styles.container, setMargin && styles.setMargin]}>
//         {children}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ResponsiveContainer;

// const { width } = Dimensions.get("window");

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1, // Ensures the container fills the screen
//   },
//   container: {
//     flex: 1,
//     paddingRight: scale(8), // Left margin
//     paddingLeft: scale(8), // Right margin
//     width: width - scale(16), // Width adjusted based on margins (16px on both sides)
//     // borderRadius: moderateScale(12), // Rounded corner
//     marginLeft: "auto", //
//     marginRight: "auto", //
//   },
//   setMargin: {
//     marginTop: verticalScale(16), // Top margin
//     marginBottom: verticalScale(16), // Bottom margin
//   },
// });
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { SafeAreaView, View, StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

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
      style={[styles.safeArea, Platform.OS === "web" && styles.webSafeArea]}
      className=" bg-body !text-text"
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
  },
  setMargin: {
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
  },
});
