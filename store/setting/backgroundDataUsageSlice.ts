import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BackgroundState {
  isBackgroundDataUsageEnabled: boolean;
}

const initialState: BackgroundState = {
  isBackgroundDataUsageEnabled: true,
};

const backgroundData = createSlice({
  name: "backgroundDataUsage",
  initialState,
  reducers: {
    toggleBackgroundData: (state) => {
      state.isBackgroundDataUsageEnabled = !state.isBackgroundDataUsageEnabled;
    },
    setBackgroundData: (state, action: PayloadAction<boolean>) => {
      state.isBackgroundDataUsageEnabled = action.payload;
    },
  },
});

export const { toggleBackgroundData, setBackgroundData } =
  backgroundData.actions;

export default backgroundData.reducer;
