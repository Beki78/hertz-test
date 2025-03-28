import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import "../global.css";
import useLoadFonts from "@/hooks/useLoadFonts";
import useTheme from "@/hooks/useTheme";

export default function RootLayout() {
  const fontsLoaded = useLoadFonts();
  const theme = useTheme();

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            gestureEnabled: true,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="content" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" backgroundColor="black" />
      </ThemeProvider>
    </Provider>
  );
}
