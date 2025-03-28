  import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    ActivityIndicator,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import FormField from "../../components/FormField";
  import Button from "../../components/Button";
  import useAuth from "@/hooks/useAuth";

  const Signin = () => {
    const {
      username,
      setUsername,
      password,
      setPassword,
      isPasswordVisible,
      setPasswordVisible,
      handleSignIn,
      isLoading,
    } = useAuth();

    return (
      <SafeAreaView className="flex-1 px-5 bg-black">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View className="flex-1 justify-center">
            <Text className="text-2xl text-white font-bold my-4">
              Sign In to Hertz
            </Text>
            <FormField
              heading={"Username"}
              placeholder={"User name"}
              autoComplete={""}
              phoneFieldStyle={"flex flex-row justify-center items-center"}
              value={username}
              state={setUsername}
            />
            <FormField
              heading={"Password"}
              placeholder={"Password"}
              autoComplete={""}
              secureTextEntry={!isPasswordVisible}
              value={password}
              state={setPassword}
              onEyePress={() => setPasswordVisible((prev) => !prev)}
            />
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Button
                title={"Sign In"}
                style={"mb-0"}
                handlePress={handleSignIn}
              />
            )}
          </View>
        </KeyboardAvoidingView>
        <StatusBar barStyle="light-content" />
      </SafeAreaView>
    );
  };

  export default Signin;
