import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const UNSPLASH_ACCESS_KEY = "BFdck1Yroxm92IPVSGnlL9gdwiTxV3PFAM8ty1XImA8";

export const imageApi = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.unsplash.com/" }),
  endpoints: (builder) => ({
    getRandomImages: builder.query({
      query: () => `photos/random?client_id=${UNSPLASH_ACCESS_KEY}&count=15`,
    }),
  }),
});

export const { useGetRandomImagesQuery } = imageApi;

 
