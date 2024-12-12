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

  return (
    <ScrollView>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          marginTop: 60,
          color: "red",
        }}
      >
        Products Page
      </Text>
      {products.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={foods}
        renderItem={({ item }) => <MenuCard food={item} />}
        keyExtractor={(item) => item.id}
      />
      {/* <Text
        style={{ 
          fontSize: 18,
          textAlign: "center",
          marginTop: 60,
          color: "red",
        }}
      >
        Cart Page
      </Text> */}
      <TouchableOpacity
        onPress={pressHandler}
        className="mt-2 bg-orange-500 px-4 py-6 text-xl font-bold rounded-md flex flex-row justify-center items-center"
      >
        <Text className="text-white text-sm">Cart Page</Text>
      </TouchableOpacity>
      {/* {cart.map((item, index) => (
        <Pressable
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 10 }}>
              {item.name}
            </Text>
            <Image
              source={{ uri: item.image }}
              style={{ width: 80, height: 80, borderRadius: 10 }}
            />
          </View>

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#FF3366",
              borderRadius: 5,
              width: 120,
            }}
          >
            <Pressable
              onPress={() => {
                dispatch(decrementQty(item));
                dispatch(decrementQuantity(item));
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: "white",
                  paddingHorizontal: 10,
                }}
              >
                -
              </Text>
            </Pressable>

            <Pressable>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  paddingHorizontal: 10,
                }}
              >
                {item.quantity}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                dispatch(incrementQty(item)); // cart
                dispatch(incrementQuantity(item)); //product
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  paddingHorizontal: 10,
                }}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      ))} */}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
