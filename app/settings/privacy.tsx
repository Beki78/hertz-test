import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useUpdateProfileVisibilityMutation } from "@/api/profileApi";

const Privacy = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const backgroundColor = theme.theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme.theme === "dark" ? "text-white" : "text-black";
  const iconColor = theme.theme === "dark" ? "white" : "black";
  const router = useRouter();

  const handleActiveSessions = () => {
    router.push("/session/sessionScreen");
  };

  const [isProfileVisible, setIsProfileVisible] = useState({
    hideUsername: false,
    hidePhoneNumber: false,
    hidePicture: false,
  });

  const [updateVisibility] = useUpdateProfileVisibilityMutation();

  const handleSwitchToggle = async (value: boolean) => {
    setIsProfileVisible({
      hideUsername: value,
      hidePhoneNumber: value,
      hidePicture: value,
    });

    try {
      await updateVisibility({
        hideUsername: value,
        hidePhoneNumber: value,
        hidePicture: value,
      });
    } catch (err) {
      console.error("Failed to update visibility:", err);
      Alert.alert("Error", "Failed to update visibility.");
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} name="privacy" />
      <SafeAreaView className={`${backgroundColor} flex-1`}>
        <Header headerTitle="Privacy and Security" />
        <ScrollView className="mx-6">
          <Text
            className={`${textColor} font-semibold text-xl mt-12`}
            style={{ fontFamily: "RobotoRegular" }}
          >
            System Security
          </Text>

          <View className="flex-row justify-between items-center ">
            <View className="flex-row items-center gap-2 my-4 ">
              <Text
                className={`${textColor} text-lg`}
                style={{ fontFamily: "RobotoRegular" }}
              >
                Show profile image
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#293645", true: "#E19F42" }}
              value={
                isProfileVisible.hideUsername &&
                isProfileVisible.hidePhoneNumber &&
                isProfileVisible.hidePicture
              }
              onValueChange={(value) => handleSwitchToggle(value)}
            />
          </View>
          <View className="h-[.1rem] w-full bg-gray-400"></View>

          <TouchableOpacity className="flex-row justify-between items-center my-4">
            <View className="flex-row items-center gap-2">
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color={iconColor}
              />
              <Text
                className={`${textColor} text-lg`}
                style={{ fontFamily: "RobotoRegular" }}
              >
                Change password
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={iconColor} />
          </TouchableOpacity>
          <View className="h-[.1rem] w-full bg-gray-400"></View>

          <TouchableOpacity className="flex-row justify-between items-center my-4">
            <View className="flex-row items-center gap-2">
              <Entypo name="block" size={24} color={iconColor} />
              <Text
                className={`${textColor} text-lg`}
                style={{ fontFamily: "RobotoRegular" }}
              >
                Blocked users
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={iconColor} />
          </TouchableOpacity>
          <View className="h-[.1rem] w-full bg-gray-400"></View>

          <TouchableOpacity
            className="flex-row justify-between items-center my-4"
            onPress={handleActiveSessions}
          >
            <View className="flex-row items-center gap-2">
              <Feather name="smartphone" size={24} color={iconColor} />
              <Text
                className={`${textColor} text-lg`}
                style={{ fontFamily: "RobotoRegular" }}
              >
                Active sessions
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={iconColor} />
          </TouchableOpacity>
          <View className="h-[.1rem] w-full bg-gray-400"></View>

          <Text
            className={`${textColor} font-semibold text-xl mt-12`}
            style={{ fontFamily: "RobotoRegular" }}
          >
            Data Privacy
          </Text>

          <TouchableOpacity className="flex-row justify-between items-center my-4">
            <View className="flex-row items-center gap-2">
              <MaterialCommunityIcons
                name="message-cog-outline"
                size={24}
                color={iconColor}
              />
              <Text
                className={`${textColor} text-lg`}
                style={{ fontFamily: "RobotoRegular" }}
              >
                Auto delete messages
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={iconColor} />
          </TouchableOpacity>
          <View className="flex flex-row justify-between items-center my-4">
            <Text className={`${textColor} text-sm ml-8`}>If away for </Text>
            <TouchableOpacity className="bg-[#293645]  rounded-xl px-4 py-2 mr-2">
              <Text className="text-blue-500 text-lg">1 month</Text>
            </TouchableOpacity>
          </View>
          <View className="h-[.1rem] w-full bg-gray-400"></View>

          <TouchableOpacity className="flex-row justify-between items-center my-4">
            <View className="flex-row items-center gap-2">
              <MaterialCommunityIcons
                name="message-cog-outline"
                size={24}
                color={iconColor}
              />
              <Text
                className={`${textColor} text-lg`}
                style={{ fontFamily: "RobotoRegular" }}
              >
                Auto delete account
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={iconColor} />
          </TouchableOpacity>
          <View className="flex flex-row justify-between items-center my-4">
            <Text className={`${textColor} text-sm ml-8`}>If away for </Text>
            <TouchableOpacity className="bg-[#293645]  rounded-xl px-4 py-2 mr-2">
              <Text className="text-blue-500 text-lg">6 months</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Privacy;
