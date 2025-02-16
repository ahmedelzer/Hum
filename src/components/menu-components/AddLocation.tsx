import { View, Text, Button, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { TouchableOpacity } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { SelectParameter } from "../form-container";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "../../../components/ui";
import { useSelector } from "react-redux";

export default function AddLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedValue, setSelectedValue] = useState(""); // Store selected option
  const locations = useSelector((state) => state.location.locations);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    } catch (error) {
      Alert.alert("Error", "Failed to get location");
    }
  };

  return (
    <View className="flex flex-row items-center">
      <TouchableOpacity className="p-2 rounded-lg bg-accent items-center justify-center">
        <MaterialIcons name="plus-one" size={20} />
      </TouchableOpacity>
      <Select
        value={selectedValue}
        onValueChange={setSelectedValue}
        className="mx-2"
      >
        <SelectTrigger variant="outline" size="sm" className="w-full h-11">
          <SelectInput
            placeholder="Select option"
            value={selectedValue}
            className="text-base text-text"
          />
          <SelectIcon as={AntDesign} name="down" className="mr-3 text-text" />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {locations.map((location) => (
              <SelectItem label={location} value={location} />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
      <NearestBranches />
    </View>
  );
}
export function NearestBranches({ location }) {
  const locations = useSelector((state) => state.location.locations);

  return (
    <View className="flex flex-row items-center">
      <Select>
        <SelectTrigger variant="outline" size="sm" className="w-full h-11">
          <SelectInput
            placeholder="Select option"
            className="text-base text-text"
          />
          <SelectIcon as={AntDesign} name="down" className="mr-3 text-text" />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {locations.map((location) => (
              <SelectItem label={location} value={location} />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
    </View>
  );
}
