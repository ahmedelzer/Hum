import React, { useRef, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Button } from "react-native";
import MapView, { UrlTile, Marker } from "react-native-maps";

const { width, height } = Dimensions.get("window");

const BranchesByLocationMap = ({ branches }) => {
  const mapRef = useRef(null);

  // Initial region state
  const [region, setRegion] = useState({
    latitude: branches[0]?.LocationLatitudePoint || 37.7749, // Default latitude
    longitude: branches[0]?.LocationLongitudePoint || -122.4194, // Default longitude
    latitudeDelta: 0.1, // Controls the zoom level
    longitudeDelta: 0.1, // Controls the zoom level
  });

  // Fit the map bounds when branches are updated
  useEffect(() => {
    if (mapRef.current && branches.length > 0) {
      const bounds = branches.map((branch) => ({
        latitude: +branch.LocationLatitudePoint,
        longitude: +branch.LocationLongitudePoint,
      }));

      mapRef.current.fitToCoordinates(bounds, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [branches]);

  // Zoom in functionality
  const zoomIn = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta / 2,
      longitudeDelta: prevRegion.longitudeDelta / 2,
    }));
  };

  // Zoom out functionality
  const zoomOut = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 2,
      longitudeDelta: prevRegion.longitudeDelta * 2,
    }));
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />
        {branches.map((branch, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: +branch.LocationLatitudePoint,
              longitude: +branch.LocationLongitudePoint,
            }}
            title={`Branch ${index + 1}`}
            description={`Latitude: ${branch.LocationLatitudePoint}, Longitude: ${branch.LocationLongitudePoint}`}
          />
        ))}
      </MapView>
      <View style={styles.zoomControls}>
        <Button title="Zoom In" onPress={zoomIn} />
        <Button title="Zoom Out" onPress={zoomOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: "90%",
  },
  zoomControls: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
  },
});

export default BranchesByLocationMap;
