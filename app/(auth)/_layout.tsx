
import React from "react";
import { Stack } from "expo-router";
import "@expo/metro-runtime";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <StatusBar style="light" backgroundColor="black" />
    </Stack>
  );
};

export default AuthLayout;
