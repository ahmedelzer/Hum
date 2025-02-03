import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tabs } from "../components/menu-components/tabsData";

// Utility functions for AsyncStorage
const saveProductsToStorage = async (products) => {
  try {
    await AsyncStorage.setItem("products", JSON.stringify(products));
  } catch (e) {
    console.error("Failed to save products to storage", e);
  }
};

const retrieveProductsFromStorage = async () => {
  try {
    const products = await AsyncStorage.getItem("products");
    return products ? JSON.parse(products) : [];
  } catch (e) {
    console.error("Failed to retrieve products from storage", e);
    return [];
  }
};

// Product slice
export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    allProducts: [],
    currentCategory: tabs[0],
  },
  reducers: {
    getProducts: (state, action) => {
      //!use it when change in products like loading new products
      state.product.push({ ...action.payload });
      state.allProducts.push({ ...action.payload });
      saveProductsToStorage(state.product); // Save to storage
    },
    getAllProducts: (state, action) => {
      //!use it when change all products like filtering and searching
      state.product = action.payload;
      saveProductsToStorage(state.product); // Save to storage
    },
    updateQuantity: (state, action) => {
      const itemPresent = state.product.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity += +action.payload.addQuantity;
        saveProductsToStorage(state.product); // Save to storage
      }
    },
    setProductsFromStorage: (state, action) => {
      state.product = action.payload;
    },
    updateCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

// Async action to load products from AsyncStorage
export const loadProductsFromStorage = () => async (dispatch) => {
  const products = await retrieveProductsFromStorage();
  dispatch(setProductsFromStorage(products));
};

// Export actions and reducer
export const {
  getProducts,
  updateQuantity,
  setProductsFromStorage,
  getAllProducts,
  updateCategory,
} = productSlice.actions;

export default productSlice.reducer;
