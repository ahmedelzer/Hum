import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Platform, View } from "react-native";
import { useSelector } from "react-redux";
import { CollapsibleSection } from "../../../utils/component/Collapsible";
import LocationMap from "../../maps/LocationMap";
import LocationMapWeb from "../../maps/LocationMap.web";
const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 2,
  longitudeDelta: 2,
};
export default function LocationParameter({ ...props }) {
  let { value, enable, title, className, control, fieldName, type } = props;
  const currentLocation = useSelector(
    (state) => state.location.currentLocation
  );
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
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
        expandedSection={expandedSection}
        toggleSection={toggleSection}
        setheader={true}
      >
        {Platform.OS == "web" ? (
          <LocationMapWeb
            location={location}
            onLocationChange={handleLocationChange}
            clickable={true}
            fields={props.formSchemaParameters}
            haveRadius={props.type === "areaMapLongitudePoint"}
          />
        ) : (
          <LocationMap
            location={location}
            onLocationChange={handleLocationChange}
            clickable={true}
            fields={props.formSchemaParameters}
            haveRadius={props.type === "areaMapLongitudePoint"}
          />
        )}
      </CollapsibleSection>
      {props.formSchemaParameters
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
        ))}
    </View>
  );
}
