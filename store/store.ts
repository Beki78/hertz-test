import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import vibrationReducer from "./sound/vibrationSlice";
import broadcastNotificationReducer from "./sound/broadcastNotificationSlice";
import dataSavingReducer from "./setting/DataSavingSlice";
import networkReducer from "./setting/networkSlice";
import backgroundDataUsageReducer from "./setting/backgroundDataUsageSlice";
import authReducer from "./auth/authSlice";
import { imageApi } from "@/api/fetchApi";
import { loginApi } from "@/api/loginApi";
import { graphqlApi } from "@/api/authApi";
import { uploadApi } from "@/api/uploadApi";
import { setStatusBarHidden } from "expo-status-bar";
import { sessionApi } from "@/api/sessionApi";
import { profileApi } from "@/api/profileApi";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    vibration: vibrationReducer,
    broadcastNotification: broadcastNotificationReducer,
    network: networkReducer,
    dataSaving: dataSavingReducer,
    backgroundDataUsage: backgroundDataUsageReducer,
    auth: authReducer,
    [imageApi.reducerPath]: imageApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [graphqlApi.reducerPath]: graphqlApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [sessionApi.reducerPath]: sessionApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      imageApi.middleware,
      graphqlApi.middleware,
      loginApi.middleware,
      uploadApi.middleware,
      sessionApi.middleware,
      profileApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
