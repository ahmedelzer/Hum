// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";

// Your reducers
import CartReducer from "../reducers/CartReducer";
import ProductReducer from "../reducers/ProductReducer";
import FilterReducer from "../reducers/FilterReducer";
import MenuItemReducer from "../reducers/MenuItemReducer";
import LocationReducer from "../reducers/LocationReducer";
import wsReducer from "../reducers/WS_Reducer";
import PaymentReducer from "../reducers/PaymentReducer";
import localizationReducer from "../reducers/localizationReducer"; // ✅ import this
import SchemasReducer from "../reducers/SchemasReducer"; // ✅ import this

const rootReducer = combineReducers({
  cart: CartReducer,
  product: ProductReducer,
  filter: FilterReducer,
  menuItem: MenuItemReducer,
  location: LocationReducer,
  ws: wsReducer,
  localization: localizationReducer,
  payment: PaymentReducer,
  schemas: SchemasReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [
    "cart",
    "product",
    "filter",
    "menuItem",
    "payment",
    "location",
    "ws",
    "localization",
    "schemas",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
