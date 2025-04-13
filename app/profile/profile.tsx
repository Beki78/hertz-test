import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Header from "@/components/Header";
import { useUploadProfilePictureMutation } from "@/api/uploadApi";
import { useGetUserProfileQuery } from "@/api/profileApi";

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "",
    name: "",
    email: "",
    phoneNumber: "",
    status: true,
    image: null,
  });

  const [uploadProfilePicture, { isLoading }] =
    useUploadProfilePictureMutation();

  const {
    data: userProfile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useGetUserProfileQuery({});

  useEffect(() => {
    console.log("Fetched user profile:", userProfile);

    if (userProfile?.data?.user) {
      const userData = userProfile.data.user;

      setProfile((prevProfile) => ({
        ...prevProfile,
        username: userData.username || "N/A",
        name: userData.name || "N/A",
        email: userData.email || "N/A",
        phoneNumber: userData.phoneNumber || "N/A",
        image: userData.picture || null,
      }));
    }

    if (profileError) {
      console.error("Error fetching user profile:", profileError);
      Alert.alert("Error", "Failed to fetch user profile.");
    }
  }, [userProfile, profileError]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled || result.assets.length === 0) {
      return;
    }

    const selectedImageUri = result.assets[0].uri;

    try {
      const response = await uploadProfilePicture(selectedImageUri).unwrap();
      console.log("Server response:", response);

      if (response?.data?.uploadProfilePicture?.url) {
        setProfile((prevProfile) => ({
          ...prevProfile,
          image: response.data.uploadProfilePicture.url,
        }));
        Alert.alert("Success", "Profile picture uploaded successfully!");
      } else {
        Alert.alert("Upload failed", "No image URL returned from server.");
      }
    } catch (error) {
      console.error("Upload failed:", error);

      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Failed to upload profile picture.";
      Alert.alert("Error", errorMessage);
    }
  };

  console.log(userProfile);

  return (
    <SafeAreaView className="flex-1 bg-black py-5">
      <Header headerTitle="Profile" />

      <View className="flex-1 justify-center items-center">
        <Image
          source={{
            uri: `http://192.168.173.103:4000${profile.image}`,
          }}
          className="w-32 h-32 rounded-full"
        />

        <Text className="text-white text-xl font-bold mt-4">Profile</Text>
        <View className="bg-gray-800 p-5 rounded-lg mt-4 w-full">
          <Text className="text-white text-lg">
            Username: {profile.username}
          </Text>
          <Text className="text-white text-lg">Name: {profile.name}</Text>
          <Text className="text-white text-lg">Email: {profile.email}</Text>
          <Text className="text-white text-lg">Phone: {profile.phoneNumber}</Text>
        </View>

        <TouchableOpacity
          className="bg-blue-600 px-5 py-3 rounded-lg mt-5"
          onPress={pickImage}
          disabled={isLoading}
        >
          <Text className="text-white text-lg font-semibold">
            {isLoading ? "Uploading..." : "Upload Image"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
