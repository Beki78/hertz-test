
import React from "react";
import { Stack } from "expo-router";
import "@expo/metro-runtime";
import { StatusBar } from "expo-status-bar";

const SessionLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="sessionScreen" options={{ headerShown: false }} />
      <StatusBar style="light" backgroundColor="black" />
    </Stack>
  );
};

export default SessionLayout;
