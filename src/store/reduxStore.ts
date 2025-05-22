import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../reducers/CartReducer";
import ProductReducer from "../reducers/ProductReducer";
import filterReducer from "../reducers/FilterReducer";
import menuItemReducer from "../reducers/MenuItemReducer";
import locationReducer from "../reducers/LocationReducer";
import wsReducer from "../reducers/WS_Reducer";
export default configureStore({
  reducer: {
    cart: CartReducer,
    menuItem: menuItemReducer,
    product: ProductReducer,
    filter: filterReducer,
    location: locationReducer,
    ws: wsReducer,
  },
});
