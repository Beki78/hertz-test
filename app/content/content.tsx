import {
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetRandomImagesQuery } from "@/api/fetchApi";

const Content = () => {
  const {
    data: images,
    isLoading,
    error,
  } = useGetRandomImagesQuery(null, {
    selectFromResult: ({ data, isLoading, error }) => ({
      data,
      isLoading,
      error,
    }),
  });

  useEffect(() => {
    console.log("Checking cached images in Content screen:", images);
  }, [images]);

  return (
    <SafeAreaView className="flex-1 px-5 bg-black">
      <Header headerTitle="Content" />

      {isLoading ? (
        <ActivityIndicator size="large" color="#E19F42" />
      ) : error ? (
        <Text className="text-white text-center mt-5">
          Failed to load images
        </Text>
      ) : (
        <ScrollView className="mt-5">
          {images?.map(
            (
              image: { urls: { small: string }; alt_description: string },
              index: number
            ) => (
              <TouchableOpacity
                key={index}
                onPress={() => alert(image.alt_description)}
                className="bg-gray-800 p-4 rounded-lg mb-4"
              >
                <Image
                  source={{ uri: image.urls.small }}
                  style={{ width: "100%", height: 200, borderRadius: 10 }}
                />
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Content;
