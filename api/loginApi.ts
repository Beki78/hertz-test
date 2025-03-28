import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.157.103:3000";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/api/auth` }),
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string },
      { username: string; password: string }
    >({
      query: ({ username, password }) => ({
        url: "login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { username, password },
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await AsyncStorage.setItem("token", data.token);
        } catch (error) {
          console.error("Error storing token:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = loginApi;
