import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const Header = ({ headerTitle }: { headerTitle: string }) => {
  const router = useRouter();
  const theme = useSelector((state: RootState) => state.theme);
  
  const backgroundColor = theme.theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme.theme === "dark" ? "text-white" : "text-black";
  const iconColor = theme.theme === "dark" ? "white" : "black";
  return (
    <View
      className={`${backgroundColor}  p-4 relative flex-row items-center my-7`}
    >
      <TouchableOpacity
        className="absolute left-4 z-50"
        onPress={() => {
          router.back();
        }}
      >
        <Ionicons name="chevron-back" size={28} color={iconColor} />
      </TouchableOpacity>
      <Text
        className={`${textColor} text-2xl  absolute left-0 right-0 mx-auto px-10 text-center  font-bold`}
        style={{ fontFamily: "RobotoRegular" }}
      >
        {headerTitle}
      </Text>
    </View>
  );
};

export default Header;
