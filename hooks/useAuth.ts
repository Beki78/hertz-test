import { useState } from "react";
import { Alert, Vibration } from "react-native";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useLoginMutation } from "@/api/authApi";

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

      if (isVibrationEnabled) {
        Vibration.vibrate([50, 100, 50]);
      }

      router.push("/settings");
    } catch (error: any) {
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
