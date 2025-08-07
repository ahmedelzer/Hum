import * as Location from "expo-location";
import { Alert } from "react-native";
export const requestLocationPermission = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // setErrorMsg("Permission to access location was denied");
      return;
    }
    let userLocation = await Location.getCurrentPositionAsync({});
    return userLocation.coords;
  } catch (error) {
    Alert.alert("Error", "Failed to get location");
  }
};
