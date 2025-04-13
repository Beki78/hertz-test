import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl } from "@/constants/BaseURL";

export const uploadApi = createApi({
  reducerPath: "uploadApi",
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
    uploadProfilePicture: builder.mutation({
      query: (fileUri) => {
        const formData = new FormData();
        formData.append(
          "operations",
          JSON.stringify({
            query: `
              mutation UploadProfilePicture($file: Upload!) {
                uploadProfilePicture(file: $file) {
                  url
                  filename
                  mimetype
                }
              }
            `,
            variables: { file: null },
          })
        );
        formData.append("map", JSON.stringify({ 1: ["variables.file"] }));
        const file = {
          uri: fileUri,
          name: "profile-picture.jpg",
          type: "image/jpeg",
        } as any;

        formData.append("1", file); 

        return {
          url: "/graphql",
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
    }),
  }),
});

export const { useUploadProfilePictureMutation } = uploadApi;
