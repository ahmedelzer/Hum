import React, { useContext } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  I18nManager,
  SafeAreaView,
} from "react-native";
import { LocalizationContext } from "../../context/LocalizationContext";
import LanguageSelector from "../components/language/LanguageSelector";
import FormContainer from "../components/form-container/FormContainer";
import loginFormSchema from "../Schemas/MenuSchema/FilterSchema.json";
import { useForm } from "react-hook-form";
import BranchesByLocationMap from "../components/maps/BranchesByLocationMap";

const SettingsScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    console.log(data);
  };
  const branches = [
    {
      LocationLatitudePoint: "37.7749",
      LocationLongitudePoint: "-122.4194",
      name: "San Francisco",
      description: "Main Branch",
    },
    {
      LocationLatitudePoint: "34.0522",
      LocationLongitudePoint: "-118.2437",
      name: "Los Angeles",
    },
    {
      LocationLatitudePoint: "40.7128",
      LocationLongitudePoint: "-74.0060",
      name: "New York City",
      description: "East Coast Branch",
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BranchesByLocationMap branches={branches} />
    </SafeAreaView>
  );
  // return <LanguageSelector />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});

export default SettingsScreen;
//!test price input
// import { StyleSheet, Text, View } from "react-native";
// import React, { useState } from "react";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import RangeSlider from "../components/form-container/inputs/CustomInputs/RangeSlider";
// const SettingsScreen = () => {
//   const MIN_DEFAULT = 10;
//   const MAX_DEFAULT = 500;
//   const [minValue, setMinValue] = useState(MIN_DEFAULT);
//   const [maxValue, setMaxValue] = useState(MAX_DEFAULT);
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <View style={styles.contentContainer}>
//           <View style={styles.content}>
//             <Text style={styles.text}>Price Slider</Text>
//             <RangeSlider
//               // sliderWidth={300}
//               min={MIN_DEFAULT}
//               max={MAX_DEFAULT}
//               step={10}
//               onValueChange={(range) => {
//                 setMinValue(range.min);
//                 setMaxValue(range.max);
//               }}
//             />
//             {/* <Text>here</Text> */}
//             <View style={styles.tableContainer}>
//               <View style={{ marginBottom: 20 }}>
//                 <Text style={styles.colorBlack}>Min Price</Text>
//                 <View style={styles.table}>
//                   <Text style={styles.colorBlack}>${minValue}</Text>
//                 </View>
//               </View>
//               <View>
//                 <Text style={styles.colorBlack}>Max Price</Text>
//                 <View style={styles.table}>
//                   <Text style={styles.colorBlack}>${maxValue}</Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//     </GestureHandlerRootView>
//     // <View>
//     //   <Text>here</Text>
//     // </View>
//   );
// };

// export default SettingsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#EBECF2",
//   },
//   contentContainer: {
//     width: "90%",
//     height: 300,
//     backgroundColor: "white",
//     borderRadius: 25,
//   },
//   content: {
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   text: {
//     color: "black",
//     fontSize: 20,
//   },
//   tableContainer: {
//     flexDirection: "column",
//     justifyContent: "space-between",
//   },
//   table: {
//     borderColor: "#EBECF2",
//     borderWidth: 1,
//     padding: 10,
//     marginTop: 5,
//     borderRadius: 5,
//   },
//   colorBlack: { color: "black" },
// });
