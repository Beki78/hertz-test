import { BaseUrl } from "@/constants/BaseURL";
import { RootState } from "@/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const graphqlApi = createApi({
  reducerPath: "graphqlApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: `query { users { id name username email } }`,
        },
      }),
    }),
    getUser: builder.query({
      query: (id) => ({
        url: "",
        method: "POST",
        body: {
          query: `query ($id: Int!) { user(id: $id) { id name username email } }`,
          variables: { id },
        },
      }),
    }),
    signUp: builder.mutation({
      query: ({ name, username, email, password, fcmToken }) => ({
        url: "",
        method: "POST",
        body: {
          query: `mutation ($name: String!, $username: String!, $email: String!, $password: String!, $fcmToken: String) {
            signUp(name: $name, username: $username, email: $email, password: $password, fcmToken: $fcmToken) {
              id name username email 
            }
          }`,
          variables: { name, username, email, password, fcmToken },
        },
      }),
    }),
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: "",
        method: "POST",
        body: {
          query: `mutation ($username: String!, $password: String!) {
            login(username: $username, password: $password) {
              token
              notificationStatus
            }
          }`,
          variables: { username, password },
        },
      }),
    }),
    sendNotification: builder.mutation({
      query: ({ userId, title, body }) => ({
        url: "",
        method: "POST",
        body: {
          query: `mutation ($userId: Int!, $title: String!, $body: String!) {
            sendNotification(userId: $userId, title: $title, body: $body)
          }`,
          variables: { userId, title, body },
        },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useSignUpMutation,
  useLoginMutation,
  useSendNotificationMutation,
} = graphqlApi;
