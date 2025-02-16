import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    locations: [],
  },
  reducers: {
    updateLocations: (state, action) => {
      if (action.payload.type === "add") {
        state.locations.push(action.payload.location);
      }
    },
  },
});

export const { updateLocations } = locationSlice.actions;

export default locationSlice.reducer;
