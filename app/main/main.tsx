import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";

const main = () => {
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} name="home" />
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        className="bg-black"
      >
        <Text style={{ fontSize: 24, marginBottom: 20 }} className="text-white">
          Main Page
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/profile/profile")}
          className="bg-blue-500 mt-5"
        >
          <Text style={{ fontSize: 18, padding: 10 }} className="text-white">
            Go to Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/settings")}
          className="bg-blue-500 mt-5"
        >
          <Text style={{ fontSize: 18, padding: 10 }} className="text-white">
            Go to Setting
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default main;
