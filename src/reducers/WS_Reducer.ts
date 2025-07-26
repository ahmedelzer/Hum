import { createSlice } from "@reduxjs/toolkit";

export const wsSlice = createSlice({
  name: "ws",
  initialState: {
    wsInstances: [], // [{key, ws, url, handlingMessages, connected}]
  },
  reducers: {
    addInstance(state, action) {
      // Remove existing instance with the same key to prevent duplicates
      state.wsInstances = state.wsInstances.filter(
        (ins) => ins.key !== action.payload.key
      );
      state.wsInstances.push(action.payload);
    },

    changeInstanceState(state, action) {
      const { key } = action.payload;
      const index = state.wsInstances.findIndex((ins) => ins.key === key);
      if (index !== -1) {
        state.wsInstances[index] = { ...action.payload };
      }
    },

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

    removeInstance(state, action) {
      const { key } = action.payload;
      state.wsInstances = state.wsInstances.filter((ins) => ins.key !== key);
    },

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
  removeInstance,
  removeStateHandlingMessage,
} = wsSlice.actions;

export default wsSlice.reducer;
