import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    locations: [],
    currentLocation: {}, //location of device
    selectedLocation: {}, //selected location from addresses
    selectedNodePickup: {}, //selected node in case pickup
    selectedNodeAddresses: {}, //selected node in case specific address
    selectedTab: 0,
  },
  reducers: {
    updateLocations: (state, action) => {
      if (action.payload.type === "add") {
        state.locations.push(action.payload.location);
      }
    },
    updateSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
      if (action.payload == 0) {
        state.selectedLocation = {};
      }
    },
    updateCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    updateSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    updateSelectedNode: (state, action) => {
      if (state.selectedTab == 0) {
        state.selectedNodePickup = action.payload;
      } else {
        state.selectedNodeAddresses = action.payload;
      }
    },
  },
});
export const selectSelectedNode = (state) =>
  state.location.selectedTab == 0
    ? state.location.selectedNodePickup
    : state.location.selectedNodeAddresses;
export const {
  updateLocations,
  updateCurrentLocation,
  updateSelectedTab,
  updateSelectedLocation,
  updateSelectedNode,
} = locationSlice.actions;

export default locationSlice.reducer;
