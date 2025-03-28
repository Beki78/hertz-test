import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBroadCastEnabled: false,
};

const broadcastNotification = createSlice({
  name: "broadcastNotification",
  initialState,
  reducers: {
    toggleNotification: (state) => {
    state.isBroadCastEnabled = !state.isBroadCastEnabled;
    },
    setNotification: (state, action) => {
      state.isBroadCastEnabled = action.payload;
    },
  },
});

export const { toggleNotification, setNotification } = broadcastNotification.actions;

export default broadcastNotification.reducer;