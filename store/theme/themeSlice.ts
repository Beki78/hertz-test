import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  theme: "dark",
};

export const useTheme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      AsyncStorage.setItem("theme", action.payload);
    },
  },
})

export const { setTheme } = useTheme.actions;
export const selectTheme = (state: RootState) => state.theme;
export default useTheme.reducer;