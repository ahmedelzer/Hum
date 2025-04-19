// import React, { useEffect, useRef } from "react";
// import MapView, { Callout, Marker, Region, UrlTile } from "react-native-maps";
// import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// const INITIAL_REGION = {
//   latitude: 37.33,
//   longitude: -122,
//   latitudeDelta: 2,
//   longitudeDelta: 2,
// };

// export default function BranchesByLocationMap({ branches }) {
//   const mapRef = useRef<any>(null);
//   const navigation = useNavigation();

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
//     <View style={{ flex: 1 }}>
//       <MapView
//         style={StyleSheet.absoluteFillObject}
//         initialRegion={INITIAL_REGION} // Ensure this is set
//         ref={mapRef}
//         onRegionChangeComplete={onRegionChange}
//       >
//         <UrlTile
//           urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           maximumZ={19}
//           flipY={false}
//         />
//         {branches.map((marker, index) => (
//           <Marker
//             key={index}
//             title={marker.name}
//             coordinate={marker}
//             onPress={() => onMarkerSelected(marker)}
//           >
//             <Callout onPress={calloutPressed}>
//               <View style={{ padding: 10 }}>
//                 <Text style={{ fontSize: 24 }}>Hello</Text>
//               </View>
//             </Callout>
//           </Marker>
//         ))}
//       </MapView>
//     </View>
//   );
// }
import React, { useEffect, useRef, useState } from "react";

import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
  UrlTile,
} from "react-native-maps";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const markers = [
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

export default function BranchesByLocationMap() {
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const [region, setRegion] = useState(INITIAL_REGION);
  const onMarkerSelected = (marker: any) => {
    console.log("====================================");
    console.log(marker.name);
    console.log("====================================");
  };
  const zoomIn = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta / 2,
      longitudeDelta: prevRegion.longitudeDelta / 2,
    }));
  };

  const zoomOut = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 2,
      longitudeDelta: prevRegion.longitudeDelta * 2,
    }));
  };

  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  const calloutPressed = (ev: any) => {
    console.log(ev);
  };
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={region}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        onRegionChangeComplete={onRegionChange}
        initialRegion={INITIAL_REGION} // Ensure this is set
      >
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            title={marker.name}
            coordinate={marker}
            onPress={() => onMarkerSelected(marker)}
          >
            <Callout onPress={calloutPressed}>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 24 }}>Hello</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Zoom Controls */}
      {/* <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
          <Text style={styles.zoomText}>-</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  zoomControls: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 5,
  },
  zoomButton: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  zoomText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
