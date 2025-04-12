import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl } from "@/constants/BaseURL";


const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string }): any =>
  async ({ body }: { body: { query: string; variables?: any } }) => {
    const token = await AsyncStorage.getItem("token");
    const result = await fetch(`${baseUrl}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(body),
    });

    const json = await result.json();
    if (json.errors) throw new Error(json.errors[0].message);
    return { data: json.data };
  };

export const sessionApi = createApi({
  reducerPath: "sessionApi",
  baseQuery: graphqlBaseQuery({ baseUrl: BaseUrl }),
  endpoints: (builder) => ({
    getActiveSessions: builder.query<any, void>({
      query: () => ({
        body: {
          query: `
            query {
              activeSessions {
                id
                device
                ipAddress
                createdAt
                lastActive
                isActive
              }
            }
          `,
        },
      }),
    }),
    terminateSession: builder.mutation<boolean, string>({
      query: (sessionId) => ({
        body: {
          query: `
            mutation TerminateSession($sessionId: ID!) {
              terminateSession(sessionId: $sessionId)
            }
          `,
          variables: { sessionId },
        },
      }),
    }),
    terminateAllSessions: builder.mutation<boolean, void>({
      query: () => ({
        body: {
          query: `
            mutation {
              terminateAllOtherSessions
            }
          `,
        },
      }),
    }),
  }),
});

export const {
  useGetActiveSessionsQuery,
  useTerminateSessionMutation,
  useTerminateAllSessionsMutation,
} = sessionApi;
