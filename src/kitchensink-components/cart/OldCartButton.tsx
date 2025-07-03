import React, { useEffect, useReducer } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  I18nManager,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { isRTL } from "../../utils/operation/isRTL";

const OldCartButton = ({
  projectUrl,
  onPress,
  dataSourceName = "/ShopNode/GetOldCustomerCart",
  schemaActions,
  idField = "menuItemID",
}) => {
  // Reducer for state management
  const [state, reducerDispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_DATA":
          return { ...state, rows: action.payload, isLoading: false };
        case "SET_LOADING":
          return { ...state, isLoading: action.payload };
        default:
          return state;
      }
    },
    { rows: [], isLoading: true }
  );

  // Load data function
  //   useEffect(() => {
  //     const loadOldCartData = async () => {
  //       try {
  //         reducerDispatch({ type: 'SET_LOADING', payload: true });

  //         // Simulating LoadData functionality
  //         const response = await fetch(`${projectUrl}${dataSourceName}`);
  //         const data = await response.json();

  //         reducerDispatch({
  //           type: 'SET_DATA',
  //           payload: Array.isArray(data) ? data : [data]
  //         });
  //       } catch (error) {
  //         console.error("Failed to load old cart:", error);
  //         reducerDispatch({ type: 'SET_DATA', payload: [] });
  //       }
  //     };

  //     loadOldCartData();
  //   }, [projectUrl, dataSourceName]);

  // Calculate count from loaded data
  const oldCartCount = state.rows.reduce((count, item) => {
    return count + (item.quantity || 1); // Sum quantities or count each item as 1
  }, 0);

  if (state.isLoading) {
    return (
      <View className={`p-1`}>
        <ActivityIndicator size="small" color="black" />
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} className="p-1">
      <View className="relative">
        <MaterialCommunityIcons
          name="clipboard-clock-outline"
          size={28}
          color="black"
        />
        {oldCartCount > 0 && (
          <View
            className={`absolute -top-1 -right-1 bg-red-500 rounded-full h-4 w-4 items-center justify-center ${
              isRTL() ? "-left-1" : "-right-1"
            }`}
          >
            <Text className="text-white text-[10px] font-bold">
              {oldCartCount > 9 ? "9+" : oldCartCount}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(OldCartButton);
