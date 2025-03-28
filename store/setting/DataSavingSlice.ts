import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDataSavingEnabled: false,
};

const dataSaving = createSlice({
  name: "dataSaving",
  initialState,
  reducers: {
    toggleDataSaving: (state) => {
      state.isDataSavingEnabled = !state.isDataSavingEnabled;
    },
    setDataSavingEnabled: (state, action) => {
      state.isDataSavingEnabled = action.payload;
    },
  },
})

export const initializeDataSaving = () => async (dispatch: any) => {
  const savedState = await AsyncStorage.getItem("dataSaving");
  if (savedState !== null) {
    dispatch(setDataSavingEnabled(JSON.parse(savedState)));
  }
};


export const { setDataSavingEnabled, toggleDataSaving } = dataSaving.actions;
export default dataSaving.reducer;