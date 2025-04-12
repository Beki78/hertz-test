import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import {
  useGetActiveSessionsQuery,
  useTerminateAllSessionsMutation,
  useTerminateSessionMutation,
} from "@/api/sessionApi";
import Header from "@/components/Header";

const SessionScreen = () => {
  const { data, isLoading, refetch } = useGetActiveSessionsQuery();
  const [terminateSession] = useTerminateSessionMutation();
  const [terminateAll] = useTerminateAllSessionsMutation();

  const handleTerminate = async (id: string) => {
    await terminateSession(id);
    refetch();
  };

  const handleTerminateAll = async () => {
    await terminateAll();
    refetch();
  };

  return (
    <View className="flex-1 bg-black p-4">
      <Header headerTitle="Sessions" />

      <Text className="text-white text-2xl font-bold mb-4">
        Active Sessions
      </Text>
      {isLoading ? (
        <Text className="text-white">Loading...</Text>
      ) : (
        <ScrollView>
          {data?.activeSessions.map((session: any) => (
            <View
              key={session.id}
              className="bg-neutral-900 p-4 mb-3 rounded-xl"
            >
              <View className="mb-2">
                <Text className="text-white">
                  Device: {session.device || "Unknown"}
                </Text>
                <Text className="text-white">
                  IP: {session.ipAddress || "N/A"}
                </Text>
                <Text className="text-white">
                  Last Active:{" "}
                  {session.lastActive
                    ? new Date(Number(session.lastActive)).toLocaleString()
                    : "N/A"}
                </Text>
              </View>
              <Pressable
                className="bg-red-600 px-4 py-2 rounded"
                onPress={() => handleTerminate(session.id)}
              >
                <Text className="text-white text-center">Terminate</Text>
              </Pressable>
            </View>
          ))}
          <Pressable
            className="bg-red-800 px-4 py-3 mt-6 rounded-xl"
            onPress={handleTerminateAll}
          >
            <Text className="text-white text-center font-semibold">
              Terminate All Other Sessions
            </Text>
          </Pressable>
        </ScrollView>
      )}
    </View>
  );
};

export default SessionScreen;
