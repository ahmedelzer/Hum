import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  getProducts,
  incrementQuantity,
} from "../../reducers/ProductReducer";
import { decrementQty, incrementQty } from "../../reducers/CartReducer";
import MenuItem from "./u";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { MenuCard } from "../../components/cards/MenuCard";
import BranchesByLocationMap from "../../components/maps/BranchesByLocationMap";
import InfoCard from "../../components/cards/InfoCard";

const HomeScreen = () => {
  const products = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log(products.length);
  const images = [
    {
      id: "0",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqg_OBzcVDnKHv1d3hyVk_WlCo43pzit4CJQ&usqp=CAU",
      name: "Icecream",
      quantity: 0,
      description:
        "Snack Box - Original, Medium French Fries, Small Coleslaw, Pepsi Can(330 ML)",
      price: "EGP 136.00",
    },
    {
      id: "1",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT85O96gPiso_j2gaS0cePTBY4mCR3pumV6tw&usqp=CAU",
      name: "Biscuit",
      quantity: 0,
      description:
        "Snack Box - Original, Medium French Fries, Small Coleslaw, Pepsi Can(330 ML)",
      price: "EGP 136.00",
    },
    {
      id: "2",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSicQWeRoxxLEr1RLIp8dJtw-NQvSE4xtlhwA&usqp=CAU",
      name: "Chocolate",
      quantity: 0,
      description:
        "Snack Box - Original, Medium French Fries, Small Coleslaw, Pepsi Can(330 ML)",
      price: "EGP 136.00",
    },
  ];
  // useEffect(() => {
  //   if (products.length > 0) return;

  //   const fetchProducts = () => {
  //     images.map((image) => dispatch(getProducts(image)));
  //   };
  //   fetchProducts();
  // }, []);
  const cart = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.totalAmount);
  const pressHandler = () => {
    navigation.navigate("Cart");
  };
  const foods = [
    {
      id: "1",
      name: "Meat Pizza",
      ingredients: "Mixed Pizza",
      price: "8.30",
      image: require("../../../assets/display/food1.jpg"),
    },
    {
      id: "2",
      name: "Cheese Pizza",
      ingredients: "Cheese Pizza",
      price: "7.10",
      image: require("../../../assets/display/food1.jpg"),
    },
    {
      id: "3",
      name: "Chicken Burger",
      ingredients: "Fried Chicken",
      price: "5.10",
      image: require("../../../assets/display/food1.jpg"),
    },
    {
      id: "4",
      name: "Sushi Makizushi",
      ingredients: "Salmon Meat",
      price: "9.55",
      image: require("../../../assets/display/food1.jpg"),
    },
  ];
  const branches = [
    {
      CompanyBranchID: 1,
      CompanyName: "Branch 1",
      Address: "123 Street, City",
      LocationLatitudePoint: "37.78825",
      LocationLongitudePoint: "-122.4324",
      CompanyBranchContacts: [
        { CodeNumber: "+1", Contact: "1234567890" },
        { CodeNumber: "email", Contact: "info@branch.com" },
      ],
    },
    {
      CompanyBranchID: 2,
      CompanyName: "Branch 2",
      Address: "456 Avenue, City",
      LocationLatitudePoint: "37.75825",
      LocationLongitudePoint: "-122.4524",
      CompanyBranchContacts: [{ CodeNumber: "+2", Contact: "9876543210" }],
    },
  ];

  return (
    <View>
      <BranchesByLocationMap branches={branches} />
      {/* <InfoCard /> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
