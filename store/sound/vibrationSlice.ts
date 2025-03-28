import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VibrationState {
  isEnabled: boolean;
}

const initialState: VibrationState = {
  isEnabled: true, 
};

const vibrationSlice = createSlice({
  name: "vibration",
  initialState,
  reducers: {
    toggleVibration: (state) => {
      state.isEnabled = !state.isEnabled;
    },
    setVibration: (state, action: PayloadAction<boolean>) => {
      state.isEnabled = action.payload;
    },
  },
});

export const { toggleVibration, setVibration } = vibrationSlice.actions;

export default vibrationSlice.reducer;
