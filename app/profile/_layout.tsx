
import React from "react";
import { Stack } from "expo-router";
import "@expo/metro-runtime";
import { StatusBar } from "expo-status-bar";

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <StatusBar style="light" backgroundColor="black" />
    </Stack>
  );
};

export default ProfileLayout;
