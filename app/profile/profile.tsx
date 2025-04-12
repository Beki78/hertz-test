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
import { useUploadProfilePictureMutation } from "@/api/uploadApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/Header";

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "johndoe",
    name: "John Doe",
    email: "johndoe@example.com",
    status: true,
    image: null,
  });

  const [uploadProfilePicture, { isLoading }] =
    useUploadProfilePictureMutation();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("Token from AsyncStorage:", token);
        if (!token) {
          console.warn("No token found in AsyncStorage!");
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };

    fetchToken();
  }, []);

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

  return (
    <SafeAreaView className="flex-1 bg-black p-5">
      <Header headerTitle="Profile" />

      <View className="flex-1 justify-center items-center">
        {profile.image ? (
          <Image
            source={{ uri: profile.image }}
            className="w-32 h-32 rounded-full"
          />
        ) : (
          <View className="w-32 h-32 bg-gray-600 rounded-full justify-center items-center">
            <Text className="text-white">No Image</Text>
          </View>
        )}

        <Text className="text-white text-xl font-bold mt-4">Profile</Text>
        <View className="bg-gray-800 p-5 rounded-lg mt-4 w-full">
          <Text className="text-white text-lg">
            Username: {profile.username}
          </Text>
          <Text className="text-white text-lg">Name: {profile.name}</Text>
          <Text className="text-white text-lg">Email: {profile.email}</Text>
          <Text className="text-white text-lg">
            Status: {profile.status ? "Active ✅" : "Inactive ❌"}
          </Text>
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
