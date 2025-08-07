import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filterRow: {},
  },
  reducers: {
    updateFilters: (state, action) => {
      state.filterRow = action.payload;
    },
  },
});

export const { updateFilters } = filterSlice.actions;

export default filterSlice.reducer;
