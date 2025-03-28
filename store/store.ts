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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      imageApi.middleware,
      graphqlApi.middleware,
      loginApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
