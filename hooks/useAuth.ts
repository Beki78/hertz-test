import { useState } from "react";
import { Alert, Vibration } from "react-native";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useLoginMutation } from "@/api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAuth() {
  const [username, setUsername] = useState("palmer");
  const [password, setPassword] = useState("palmer12345");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const isVibrationEnabled = useSelector(
    (state: RootState) => state.vibration.isEnabled
  );

  const [login, { isLoading }] = useLoginMutation();

  const handleSignIn = async () => {
    try {
      const result = await login({ username, password }).unwrap();
      console.log("Login Result:", result);

      // Extract the token from the response
      const token = result?.data?.login?.token;

      if (!token) {
        throw new Error("No token received from server.");
      }

      // Store the token in AsyncStorage
      await AsyncStorage.setItem("token", token);

      // Update the Redux state with the token

      if (isVibrationEnabled) {
        Vibration.vibrate([50, 100, 50]);
      }

      // Navigate to the main screen
      router.push("/main/main");
    } catch (error: any) {
      console.error("Login failed:", error);
      Alert.alert("Login Failed", error?.message || "Something went wrong!");
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    isPasswordVisible,
    setPasswordVisible,
    handleSignIn,
    isLoading,
  };
}
