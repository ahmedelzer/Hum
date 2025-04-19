import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import AddLocation from "../components/menu-components/AddLocation";
import { Feather } from "@expo/vector-icons";
import { LocalizationContext } from "../../context/LocalizationContext";

export default function MarketPlace() {
  const [marketPlaces, setMarketPlaces] = useState([
    { id: "1", name: "Local Market" },
    { id: "2", name: "Organic Farm" },
    { id: "3", name: "City Center" },
  ]);
  const { isRTL } = useContext(LocalizationContext);

  const handleDelete = (id: string) => {
    setMarketPlaces((prev) => prev.filter((place) => place.id !== id));
  };

  return (
    <ScrollView>
      <View className="flex-row items-center justify-center overflow-auto">
        <AddLocation />
      </View>
      <View className="flex-col flex-wrap items-center justify-center gap-2 mt-4">
        {marketPlaces.map((place) => (
          <View
            key={place.id}
            className="w-full h-32 bg-card rounded-lg shadow-md m-2 p-2 relative"
          >
            {/* Delete button */}
            <TouchableOpacity
              onPress={() => handleDelete(place.id)}
              className={
                `absolute top-1 z-10 !right-1`
                // `${isRTL ? "!left-1" : "!right-1"}`
              }
            >
              <Feather name="x-circle" size={20} color="red" />
            </TouchableOpacity>

            <Text className="text-center mt-6 text-lg font-semibold text-text">
              {place.name}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
