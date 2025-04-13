import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl } from "@/constants/BaseURL";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: "/graphql",
        method: "POST",
        body: {
          query: `
            query {
              user {
                id
                name
                username
                email
                phoneNumber
                picture
                createdAt
                updatedAt
              }
            }
          `,
        },
      }),
    }),
    updateProfileVisibility: builder.mutation({
      query: ({ hideUsername, hidePhoneNumber, hidePicture }) => ({
        url: "/graphql",
        method: "POST",
        body: {
          query: `
        mutation UpdateProfileVisibility($hideUsername: Boolean!, $hidePhoneNumber: Boolean!, $hidePicture: Boolean!) {
          updateProfileVisibility(
            hideUsername: $hideUsername,
            hidePhoneNumber: $hidePhoneNumber,
            hidePicture: $hidePicture
          ) {
            id
            username
            hideUsername
            hidePhoneNumber
            hidePicture
          }
        }
      `,
          variables: {
            hideUsername,
            hidePhoneNumber,
            hidePicture,
          },
        },
      }),
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateProfileVisibilityMutation } =
  profileApi;
