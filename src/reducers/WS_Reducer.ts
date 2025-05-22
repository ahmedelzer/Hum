import { createSlice } from "@reduxjs/toolkit";

export const wsSlice = createSlice({
  name: "ws",
  initialState: {
    wsInstances: [], // Start with empty array
  },
  reducers: {
    addInstance(state, action) {
      state.wsInstances.push(action.payload);
    },
    changeInstanceConnectState(state, action) {
      const { key, connected } = action.payload;
      const wsInstance = state.wsInstances.find((ins) => ins.key === key);
      if (wsInstance) {
        wsInstance.connected = connected;
      }
    },
  },
  getState(state, action) {
    return state;
  },
});

// ✅ Correct action exports
export const { addInstance, changeInstanceConnectState } = wsSlice.actions;

// ✅ Correct reducer export
export default wsSlice.reducer;
