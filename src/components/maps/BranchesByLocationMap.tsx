// import React, { useRef, useEffect, useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Dimensions,
//   Button,
//   Platform,
//   PermissionsAndroid,
//   Alert,
//   Text,
// } from "react-native";
// import MapView, { UrlTile, Marker, Region, Callout } from "react-native-maps";

// const { width, height } = Dimensions.get("window");

// const BranchesByLocationMap = ({ branches }) => {
//   const mapRef = useRef(null);

//   // Initial region state
//   const [region, setRegion] = useState({
//     latitude: branches[0]?.LocationLatitudePoint || 37.7749, // Default latitude
//     longitude: branches[0]?.LocationLongitudePoint || -122.4194, // Default longitude
//     latitudeDelta: 5, // Increase this value
//     longitudeDelta: 5, // Increase this value
//   });

//   // Fit the map bounds when branches are updated
//   useEffect(() => {
//     if (mapRef.current && branches.length > 0) {
//       const bounds = branches.map((branch) => ({
//         latitude: +branch.LocationLatitudePoint,
//         longitude: +branch.LocationLongitudePoint,
//       }));

//       mapRef.current.fitToCoordinates(bounds, {
//         edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
//         animated: true,
//       });
//     }
//   }, [branches]);

//   // Zoom in functionality
//   const zoomIn = () => {
//     setRegion((prevRegion) => ({
//       ...prevRegion,
//       latitudeDelta: prevRegion.latitudeDelta / 2,
//       longitudeDelta: prevRegion.longitudeDelta / 2,
//     }));
//   };

//   const requestLocationPermission = async () => {
//     if (Platform.OS === "android") {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: "Location Permission",
//           message: "This app requires access to your location.",
//           buttonNeutral: "Ask Me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK",
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   };

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);
//   // Zoom out functionality
//   const zoomOut = () => {
//     setRegion((prevRegion) => ({
//       ...prevRegion,
//       latitudeDelta: prevRegion.latitudeDelta * 2,
//       longitudeDelta: prevRegion.longitudeDelta * 2,
//     }));
//   };
//   const onMarkerSelected = (marker: any) => {
//     Alert.alert(marker.name);
//   };

//   const calloutPressed = (ev: any) => {
//     console.log(ev);
//   };

//   const onRegionChange = (region: Region) => {
//     console.log(region);
//   };
//   return (
//     <View style={styles.container}>
//       <MapView
// ref={mapRef}
// style={styles.map}
// region={region}
// onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
//       >
// <UrlTile
//   urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//   maximumZ={19}
//   flipY={false}
// />
//         {branches.map((branch, index) => (
//           // <Marker
//           //   key={index}
//           // coordinate={{
//           //   latitude: parseFloat(branch.LocationLatitudePoint),
//           //   longitude: parseFloat(branch.LocationLongitudePoint),
//           // }}
//           //   title={branch.name}
//           //   description={branch.description || ""}
//           // />
//           <Marker
//             key={index}
//             title={branch.name}
//             coordinate={{
//               latitude: parseFloat(branch.LocationLatitudePoint),
//               longitude: parseFloat(branch.LocationLongitudePoint),
//             }}
//             onPress={() => onMarkerSelected(branch)}
//           >
//             <Callout onPress={calloutPressed}>
//               <View style={{ padding: 10 }}>
//                 <Text style={{ fontSize: 24 }}>Hello</Text>
//               </View>
//             </Callout>
//           </Marker>
//         ))}

//         <Marker
//           coordinate={{ latitude: 37.7749, longitude: -122.4194 }}
//           title="San Francisco"
//           description="This is a test marker"
//         />
//       </MapView>
//       <View style={styles.zoomControls}>
//         <Button title="Zoom In" onPress={zoomIn} />
//         <Button title="Zoom Out" onPress={zoomOut} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   map: {
//     width: "100%",
//     height: "90%",
//   },
//   zoomControls: {
//     position: "absolute",
//     bottom: 20,
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%",
//     paddingHorizontal: 20,
//   },
// });

// export default BranchesByLocationMap;
import React, { useEffect, useRef } from "react";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
  UrlTile,
} from "react-native-maps";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import markers from "../../../assets/pngegg.png";
const markers = [
  // San Francisco
  {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "San Francisco City Center",
  },
  {
    latitude: 37.8077,
    longitude: -122.475,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "Golden Gate Bridge",
  },
];
const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 2,
  longitudeDelta: 2,
};

export default function App() {
  const mapRef = useRef<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={focusMap}>
          <View style={{ padding: 10 }}>
            <Text>Focus</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, []);

  const focusMap = () => {
    const GreenBayStadium = {
      latitude: 37.7749,
      longitude: -122.4194,
      latitudeDelta: 7,
      longitudeDelta: 7,
    };

    mapRef.current?.animateToRegion(GreenBayStadium);
    // mapRef.current?.animateCamera({ center: GreenBayStadium, zoom: 10 }, { duration: 2000 });
  };

  const onMarkerSelected = (marker: any) => {
    Alert.alert(marker.name);
  };

  const calloutPressed = (ev: any) => {
    console.log(ev);
  };

  const onRegionChange = (region: Region) => {
    console.log(region);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION} // Ensure this is set
        ref={mapRef}
        onRegionChangeComplete={onRegionChange}
      >
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.name}
          />
        ))}
      </MapView>
    </View>
  );
}
