import { Text, TouchableOpacity } from "react-native";
import React from "react";
import "@expo/metro-runtime";

const Button = ({
  title,
  handlePress,
  style,
}: {
  title: string;
  handlePress: () => void;
  style?: string;
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        className={`h-20 mb-28 mt-6 justify-center  items-center ${style}`}
      >
        <Text className="text-lg  text-white px-32 py-4 rounded-2xl bg-[#293645] w-full text-center">
          {title}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Button;
