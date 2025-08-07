import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkOnboarding = async () => {
  const onboarded = await AsyncStorage.getItem("hasOnboarded");
  if (onboarded) {
    return true;
  }
  return false;
};
