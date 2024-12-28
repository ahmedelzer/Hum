import React from "react";
import { Text, View } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
function Footer() {
  const navigation = useNavigation();
  const pressHome = () => {
    navigation.navigate("Home");
  };
  const pressRooms = () => {
    navigation.navigate("Rooms");
  };
  const presslogin = () => {
    navigation.navigate("Login");
  };
  return (
    <View className="mx-4 mb-4 flex flex-row justify-between items-center absolute bottom-0 left-0 right-0 ">
      <View onPress={pressHome}>
        <Entypo name="home" onPress={pressHome} size={24} color="black" />
      </View>
      <View>
        <MaterialIcons
          name="groups"
          onPress={pressRooms}
          size={24}
          color="black"
        />
      </View>
      <View>
        <Text onPress={presslogin}>profile</Text>
      </View>
    </View>
  );
}

export default Footer;
