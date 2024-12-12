import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../reducers/CartReducer";
import ProductReducer from "../reducers/ProductReducer";
export default configureStore({
  reducer: {
    cart: CartReducer,
    product: ProductReducer,
  },
});
