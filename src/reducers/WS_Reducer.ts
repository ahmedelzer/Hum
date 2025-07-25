import { createSlice } from "@reduxjs/toolkit";

export const wsSlice = createSlice({
  name: "ws",
  initialState: {
    wsInstances: [], // [{key,ws, queryParams, handlingMessages, connected}]
  },
  reducers: {
    addInstance(state, action) {
      state.wsInstances.push(action.payload);
    },

    // ✅ Overwrites the instance by key
    changeInstanceState(state, action) {
      const { key } = action.payload;
      const index = state.wsInstances.findIndex((ins) => ins.key === key);
      if (index !== -1) {
        state.wsInstances[index] = { ...action.payload };
      }
    },

    // ✅ Adds a handling message function to the handlingMessages array
    addInstanceStateHandlingMessage(state, action) {
      const { key, handlingMessage } = action.payload;
      const wsInstance = state.wsInstances.find((ins) => ins.key === key);
      if (wsInstance) {
        if (!Array.isArray(wsInstance.handlingMessages)) {
          wsInstance.handlingMessages = [];
        }
        wsInstance.handlingMessages.push(handlingMessage);
      }
    },
    // ✅ Adds a handling message function to the handlingMessages array
    // 🆕 Removes an entire instance by key
    removeInstance(state, action) {
      const { key } = action.payload;
      state.wsInstances = state.wsInstances.filter((ins) => ins.key !== key);
    },

    // 🆕 Removes a specific handlingMessage function by reference
    removeStateHandlingMessage(state, action) {
      const { key, handlingMessage } = action.payload;
      const wsInstance = state.wsInstances.find((ins) => ins.key === key);
      if (wsInstance && Array.isArray(wsInstance.handlingMessages)) {
        wsInstance.handlingMessages = wsInstance.handlingMessages.filter(
          (fn) => fn !== handlingMessage
        );
      }
    },
  },
});

export const {
  addInstance,
  changeInstanceState,
  addInstanceStateHandlingMessage,
} = wsSlice.actions;

export default wsSlice.reducer;
