import { Entypo } from "@expo/vector-icons";
import React, { Suspense, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Platform, View } from "react-native";
import { useSelector } from "react-redux";
import { CollapsibleSection } from "../../../utils/component/Collapsible";
import { Text } from "react-native";
import LocationMap from "../../maps/LocationMap.web";
// Lazy import only the correct component
export default function LocationParameter({ ...props }) {
  // const LocationMap = React.lazy(() =>
  //   Platform.OS === "web"
  //     ? import("../../maps/LocationMap.web")
  //     : import("../../maps/LocationMap")
  // );
  let { value, enable, title, className, control, fieldName, type } = props;
  const currentLocation = useSelector(
    (state) => state.location.currentLocation
  );
  const [location, setLocation] = useState(
    props.value || currentLocation || {}
  );
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };
  return (
    <View>
      <CollapsibleSection
        title="Current Location"
        icon={() => <Entypo name="location-pin" size={24} />}
        setheader={true}
      >
        {/* {Platform.OS == "web" ? (
          <LocationMapWeb
            location={location}
            onLocationChange={handleLocationChange}
            clickable={true}
            fields={props.formSchemaParameters}
            haveRadius={props.type === "areaMapLongitudePoint"}
          />
        ) : ( */}
        <LocationMap
          location={location}
          onLocationChange={handleLocationChange}
          clickable={true}
          fields={props.formSchemaParameters}
          haveRadius={props.type === "areaMapLongitudePoint"}
        />
        {/* )} */}
        {/* <Suspense fallback={<Text>Loading Map...</Text>}>
          <LocationMap
            location={location}
            onLocationChange={handleLocationChange}
            clickable={true}
            fields={props.formSchemaParameters}
            haveRadius={props.type === "areaMapLongitudePoint"}
          />
        </Suspense> */}
      </CollapsibleSection>
      {/* {props.formSchemaParameters
        .filter(
          (i) =>
            i.parameterType.startsWith("areaMap") ||
            i.parameterType.startsWith("map")
        )
        .map((pram) => (
          <Controller
            key={pram.parameterField}
            control={control}
            rules={{ required: true }}
            name={pram.parameterField}
            render={({ field: { onChange, onBlur, value } }) => {
              useEffect(() => {
                if (location[pram.parameterField] !== undefined) {
                  onChange(location[pram.parameterField]);
                }
              }, [location[pram.parameterField]]);
              return null; // No need to render hidden InputField if just syncing values
            }}
          />
        ))} */}
    </View>
  );
}
