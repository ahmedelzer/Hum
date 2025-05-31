import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Slider } from "react-native";
import MapView, {
  Marker,
  Callout,
  PROVIDER_GOOGLE,
  Circle,
  UrlTile,
} from "react-native-maps";
import { LocalizationContext } from "../../../context/LocalizationContext";
import { useSelector } from "react-redux";

const LocationMap = ({
  location,
  onLocationChange,
  clickable,
  fields,
  haveRadius,
}) => {
  const currentLocation = useSelector(
    (state) => state.location.currentLocation
  );
  const INITIAL_REGION = {
    latitude: currentLocation.latitude || 20,
    longitude: currentLocation.longitude || 24,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };
  const mapRef = useRef(null);
  const localization = useSelector((state) => state.localization.localization);

  const latitudeField = fields.find(
    (param) =>
      param.parameterType ===
      (haveRadius ? "areaMapLatitudePoint" : "mapLatitudePoint")
  )?.parameterField;

  const longitudeField = fields.find(
    (param) =>
      param.parameterType ===
      (haveRadius ? "areaMapLongitudePoint" : "mapLongitudePoint")
  )?.parameterField;

  const radiusField = haveRadius
    ? fields.find((param) => param.parameterType === "areaMapRadius")
        ?.parameterField
    : null;

  const lat = +location[latitudeField] || INITIAL_REGION.latitude;
  const lng = +location[longitudeField] || INITIAL_REGION.longitude;

  const [region, setRegion] = useState({
    ...INITIAL_REGION,
    latitude: lat,
    longitude: lng,
  });

  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: lat,
    longitude: lng,
  });

  const [radius, setRadius] = useState(location[radiusField] || 100);

  const handleMapPress = (event) => {
    if (!clickable) return;
    const { coordinate } = event.nativeEvent;
    setMarkerCoordinate(coordinate);
    onLocationChange({
      [latitudeField]: `${coordinate.latitude}`,
      [longitudeField]: `${coordinate.longitude}`,
      ...(radiusField && { [radiusField]: radius }),
    });
  };

  useEffect(() => {
    if (radiusField) {
      onLocationChange({
        [latitudeField]: `${markerCoordinate.latitude}`,
        [longitudeField]: `${markerCoordinate.longitude}`,
        [radiusField]: radius,
      });
    } else {
      onLocationChange({
        [latitudeField]: `${markerCoordinate.latitude}`,
        [longitudeField]: `${markerCoordinate.longitude}`,
      });
    }
  }, []);

  const handleRadiusChange = (value) => {
    setRadius(value);
    if (radiusField) {
      onLocationChange({
        [latitudeField]: markerCoordinate.latitude,
        [longitudeField]: markerCoordinate.longitude,
        [radiusField]: value,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapWrapper}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          initialRegion={region}
          onRegionChangeComplete={setRegion}
          onPress={handleMapPress}
          zoomEnabled={true}
          zoomControlEnabled={true} // Android only
          scrollEnabled={true}
        >
          <UrlTile
            urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
            flipY={false}
          />
          {markerCoordinate && (
            <>
              <Marker coordinate={markerCoordinate}>
                <Callout>
                  <View>
                    <Text style={{ fontSize: 16 }}>
                      {localization.inputs.locationMap.popupTitle}
                    </Text>
                  </View>
                </Callout>
              </Marker>
              {radiusField && (
                <Circle
                  center={markerCoordinate}
                  radius={radius}
                  strokeColor="#3b82f6"
                  fillColor="rgba(59, 130, 246, 0.2)"
                />
              )}
            </>
          )}
        </MapView>
      </View>

      {radiusField && clickable && haveRadius && (
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>
            {localization.inputs.locationMap.radius.replace("{radius}", radius)}
          </Text>
          <Slider
            minimumValue={50}
            maximumValue={1000}
            step={20}
            value={radius}
            onValueChange={handleRadiusChange}
            style={styles.slider}
          />
        </View>
      )}
    </View>
  );
};

export default LocationMap;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  mapWrapper: {
    width: "100%",
    height: 300,
    marginBottom: 10,
  },
  sliderContainer: {
    paddingHorizontal: 16,
  },
  sliderLabel: {
    marginBottom: 8,
    fontSize: 14,
  },
  slider: {
    width: "100%",
  },
});
