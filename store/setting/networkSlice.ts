import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface networkState {
  isAutoDataOn: boolean;
  isAutoWiFiOn: boolean;
}

const initialState: networkState = {
  isAutoDataOn: false,
  isAutoWiFiOn: false,
};

const networkSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setAutoData(state, action: PayloadAction<boolean>) {
      state.isAutoDataOn = action.payload;
    },
    setAutoWiFi(state, action: PayloadAction<boolean>) {
      state.isAutoWiFiOn = action.payload;
    },
    loadSettingsFromStorage(state, action: PayloadAction<networkState>) {
      state.isAutoDataOn = action.payload.isAutoDataOn;
      state.isAutoWiFiOn = action.payload.isAutoWiFiOn;
    },
  },
});

export const { setAutoData, setAutoWiFi, loadSettingsFromStorage } =
  networkSlice.actions;

export default networkSlice.reducer;
