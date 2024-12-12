import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Icon } from "../../../components/ui";
import { Plus } from "lucide-react-native";
const COLORS = {
  white: "#FFF",
  dark: "#000",
  primary: "#F9813A",
  secondary: "#fedac5",
  light: "#E5E5E5",
  grey: "#908e8c",
};
const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;
export const MenuCard = ({ food }) => {
  return (
    <TouchableHighlight
      //   underlayColor={COLORS.white}
      activeOpacity={0.9}
      //   onPress={() => navigation.navigate('DetailsScreen', food)}
    >
      <View style={style.card} className="bg-card">
        <View style={{ alignItems: "center", top: -40 }}>
          <Image
            source={food.image}
            style={{ height: 130, width: 180, borderRadius: 20 }}
          />
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{food.name}</Text>
          <Text style={{ fontSize: 14, marginTop: 2 }} className="text-body">
            {food.ingredients}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            ${food.price}
          </Text>
          <View style={style.addToCartBtn} className="bg-accent">
            <Icon as={Plus} size={"md"} className="text-body" />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const style = StyleSheet.create({
  card: {
    height: 220,
    width: cardWidth,
    // marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    // backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
