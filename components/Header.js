import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import logo from "../assets/logo.jpg";
import logoHum from "../assets/logoHum.png";
import { Rect, Circle, Line } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
function Header() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const deadline = new Date("12-30-2023").getTime();
  const getTime = () => {
    const now = new Date().getTime();
    const timeDifference = deadline - now;
    if (timeDifference >= 0) {
      setHours(Math.floor((timeDifference / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((timeDifference / (1000 * 60)) % 60));
      setSeconds(Math.floor((timeDifference / 1000) % 60));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);
  const angle = (timeUnit, totalUnits) => (timeUnit / totalUnits) * 360;

  return (
    <View className="mt-12 mx-4 flex flex-row justify-between items-center">
      <View className=" w">
        <Image source={logoHum} className="w-20 h-20" alt="logo" />
      </View>
      <View className=""></View>
      <View style={styles.container}>
        {/* <Circle cx={50} cy={50} r={45} fill="none" stroke="#fff" strokeWidth={4} />
      <Circle cx={50} cy={50} r={40} fill="#fff" />
      <Line x1={50} y1={50} x2={50} y2={25} stroke="#fff" strokeWidth={2} transform={`rotate(10 50 50)`} />
      <Line x1={50} y1={50} x2={50} y2={30} stroke="#fff" strokeWidth={1} transform={`rotate(1 50 50)`} />
      <Circle cx={50} cy={50} r={5} fill="#fff" /> */}
        <Text>{hours}</Text>
        <Text>{seconds}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;
