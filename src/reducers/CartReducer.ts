import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

const saveCartToStorage = async (cart, totalAmount) => {
  await SecureStore.setItemAsync("cart", JSON.stringify(cart));
  await SecureStore.setItemAsync("totalAmount", totalAmount.toString());
};

const retrieveCartFromStorage = async () => {
  const cart = await SecureStore.getItemAsync("cart");
  const totalAmount = await SecureStore.getItemAsync("totalAmount");
  return {
    cart: cart ? JSON.parse(cart) : [],
    totalAmount: totalAmount ? parseFloat(totalAmount) : 0,
  };
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    customerCartInfo: {},
    notes: [],
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload.item;
      const fieldsType = action.payload.fieldsType;
      const idField = fieldsType.idField;
      const itemPresent = state.cart.find(
        (cartItem) => cartItem[idField] === item[idField]
      );
      console.log(itemPresent, state, idField, item, "0000000000");

      if (itemPresent) {
        if (
          item.addQuantity == -1 &&
          itemPresent[fieldsType.cardAction] === 1
        ) {
          const removeFromCart = state.cart.filter(
            (removeItem) => removeItem[idField] !== item[idField]
          );
          state.cart = removeFromCart;
        } else {
          itemPresent[fieldsType.cardAction] += +item.addQuantity;
        }
      } else {
        state.cart.push({ ...item, [fieldsType.cardAction]: 1 });
      }
      // Recalculate totalAmount
      state.totalAmount += item[fieldsType.price] * action.payload.addQuantity;
    },
    setCartFromStorage: (state, action) => {
      state.cart = action.payload.cart;
      state.totalAmount = action.payload.totalAmount;
    },
    updateNotes: (state, action) => {
      if (action.payload.type == "add") {
        state.notes.push(action.payload.value);
      }
      if (action.payload.type == "delete") {
        const noteIdToDelete = action.payload.value;
        state.notes = state.notes.filter(
          (note) => note.value !== noteIdToDelete
        );
      }
    },
  },
});

// Fetch cart from SecureStore when the app starts
export const loadCartFromStorage = () => async (dispatch) => {
  const { cart, totalAmount } = await retrieveCartFromStorage();
  dispatch(setCartFromStorage({ cart, totalAmount }));
};

export const { addToCart, setCartFromStorage, updateNotes } = cartSlice.actions;

export default cartSlice.reducer;
