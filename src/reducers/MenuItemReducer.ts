import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tabs } from "../components/menu-components/tabsData";

// Utility functions for AsyncStorage
const saveMenuItemsToStorage = async (menuItems) => {
  try {
    await AsyncStorage.setItem("menuItems", JSON.stringify(menuItems));
  } catch (e) {
    console.error("Failed to save menu items to storage", e);
  }
};

const retrieveMenuItemsFromStorage = async () => {
  try {
    const menuItems = await AsyncStorage.getItem("menuItems");
    return menuItems ? JSON.parse(menuItems) : [];
  } catch (e) {
    console.error("Failed to retrieve menu items from storage", e);
    return [];
  }
};

// MenuItem slice
export const menuItemSlice = createSlice({
  name: "menuItem",
  initialState: {
    menuItem: [],
    allMenuItems: [],
    currentCategory: tabs[0],
    currentItemType: "",
    favoriteItems: [],
    fieldsType: {},
  },
  reducers: {
    getMenuItems: (state, action) => {
      //!use it when changing menu items like loading new items
      state.menuItem.push({ ...action.payload });
      state.allMenuItems.push({ ...action.payload });
      saveMenuItemsToStorage(state.menuItem); // Save to storage
    },
    getAllMenuItems: (state, action) => {
      //!use it when changing all menu items like filtering and searching
      state.menuItem = action.payload;
      saveMenuItemsToStorage(state.menuItem); // Save to storage
    },
    updateQuantity: (state, action) => {
      const itemPresent = state.menuItem.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity += +action.payload.addQuantity;
        saveMenuItemsToStorage(state.menuItem); // Save to storage
      }
    },
    setMenuItemsFromStorage: (state, action) => {
      state.menuItem = action.payload;
    },
    updateCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setFields: (state, action) => {
      state.fieldsType = action.payload;
    },
    updateMenuItemType: (state, action) => {
      state.currentItemType = action.payload;
    },
    updateFavoriteItems: (state, action) => {
      const fieldsType = state.fieldsType;
      if (action.payload.ope === "add") {
        state.favoriteItems.push(...action.payload.items);
      } else if (action.payload.ope === "delete") {
        const deleteIds = new Set(action.payload.items.map((item) => item.id));
        for (let i = state.favoriteItems.length - 1; i >= 0; i--) {
          if (deleteIds.has(state.favoriteItems[i][fieldsType.idField])) {
            state.favoriteItems.splice(i, 1);
          }
        }
      }
    },
  },
});

// Async action to load menu items from AsyncStorage
export const loadMenuItemsFromStorage = () => async (dispatch) => {
  const menuItems = await retrieveMenuItemsFromStorage();
  dispatch(setMenuItemsFromStorage(menuItems));
};

// Export actions and reducer
export const {
  getMenuItems,
  updateQuantity,
  setMenuItemsFromStorage,
  getAllMenuItems,
  updateCategory,
  updateFavoriteItems,
  updateMenuItemType,
  setFields,
} = menuItemSlice.actions;

export default menuItemSlice.reducer;
