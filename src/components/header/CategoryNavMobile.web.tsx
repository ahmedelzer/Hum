// import React, { useContext, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Feather } from "@expo/vector-icons";
// import { LocalizationContext } from "../../../context/LocalizationContext";

// const CategoryNavMobile = ({ setCatNavMobile, open }) => {
//   const { localization } = useContext(LocalizationContext);
//   const translateX = new Animated.Value(open ? 0 : -300);

//   React.useEffect(() => {
//     Animated.timing(translateX, {
//       toValue: open ? 0 : -300,
//       duration: 200,
//       useNativeDriver: true,
//     }).start();
//   }, [open]);

//   return (
//     <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
//       <TouchableOpacity
//         onPress={() => setCatNavMobile(false)}
//         style={styles.closeButtonWrapper}
//       >
//         <Feather name="x" size={24} color="black" />
//       </TouchableOpacity>
//       <View style={styles.linkWrapper}>
//         {localization.routes?.map((item) => (
//           <TouchableOpacity
//             key={item.id}
//             onPress={() => setCatNavMobile(false)}
//             style={styles.link}
//           >
//             <Text style={styles.linkText}>{item.title}</Text>
//           </TouchableOpacity>
//         ))}
//         <View>
//           <Text style={styles.label}>Language</Text>
//           {/* <LanguageSelector /> */}
//         </View>
//       </View>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: "absolute",
//     top: 0,
//     bottom: 0,
//     left: 0,
//     width: "80%",
//     height: "100%",
//     backgroundColor: "white",
//     zIndex: 500,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   closeButtonWrapper: {
//     alignSelf: "flex-end",
//     padding: 10,
//   },
//   linkWrapper: {
//     marginTop: 20,
//   },
//   link: {
//     paddingVertical: 10,
//   },
//   linkText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginTop: 20,
//   },
// });

// export default CategoryNavMobile;
import React, { useContext } from "react";
import { LocalizationContext } from "../../../context/LocalizationContext";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
const categoryNavMobileStyles = {
  container: "w-full h-full bg-card p-8",
  closeButtonWrapper: "flex justify-end mb-8 cursor-pointer",
  closeButtonIcon: "text-3xl",
  linkWrapper: "flex flex-col gap-y-8",
  link: "uppercase font-medium",
};
const CategoryNavMobile = ({ setCatNavMobile }) => {
  const { localization } = useContext(LocalizationContext);
  const navigation = useNavigation();
  const tabs = [
    { name: "Home", icon: "home" },
    { name: "MenuView", icon: "menu" },
    { name: "Profile", icon: "person" },
  ];
  return (
    <div className={categoryNavMobileStyles.container}>
      <div
        onClick={() => setCatNavMobile(false)}
        className={categoryNavMobileStyles.closeButtonWrapper}
      >
        <AntDesign
          name="closecircle"
          size={24}
          color="black"
          className={categoryNavMobileStyles.closeButtonIcon}
        />
        {/* <FiX  /> */}
      </div>
      <div className={categoryNavMobileStyles.linkWrapper}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: tab.name }], // This prevents back navigation
              });
            }}
            className={categoryNavMobileStyles.link}
            // style={styles.link}
          >
            {tab.name}
          </TouchableOpacity>
        ))}
        <div>
          <label className="uppercase mb-1 !font-primary">Language</label>
          {/* <LanguageSelector /> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryNavMobile;
