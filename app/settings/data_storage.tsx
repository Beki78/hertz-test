import { View, Text, ScrollView, Switch, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Stack } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useToggleSetting } from "@/hooks/useToggleSetting";
import { useEffect } from "react";
import { clearCache } from "@/scripts/ClearCache";
import { Ionicons } from "@expo/vector-icons";

const Data_and_Storage = () => {
  const theme = useSelector((state: RootState) => state.theme);

  const backgroundColor = theme.theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme.theme === "dark" ? "text-white" : "text-black";
  const iconColor = theme.theme === "dark" ? "white" : "black";


  const {
    isDataSaverOn,
    isAutoDataOn,
    isAutoWiFiOn,
    isBackgroundDataEnabled,
    dataSavingToggle,
    autoDataToggle,
    autoWiFiToggle,
    toggleBackgroundDataUsage,
  } = useToggleSetting();

  useEffect(() => {
    console.log(`Auto Data: ${isAutoDataOn}`);
    console.log(`Auto WiFi: ${isAutoWiFiOn}`);
    console.log(`DataSaver: ${isDataSaverOn}`);
    console.log(`BackgroundData Usage: ${isBackgroundDataEnabled}`);
  }, [isAutoDataOn, isAutoWiFiOn, isDataSaverOn, isBackgroundDataEnabled]);

  
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} name="Data_and_Storage" />
      <SafeAreaView className={`${backgroundColor} flex-1`}>
        <Header headerTitle="Data and Storage" />
        <ScrollView className="mx-6">
          <Text
            className={`${textColor} font-semibold text-xl mt-12`}
            style={{ fontFamily: "RobotoRegular" }}
          >
            Media Quality
          </Text>

          {/* auto data Setting */}
          <View className="flex-row justify-between items-center ">
            <View className="flex-row items-center gap-2 my-4">
              <Text
                className={`${textColor} text-lg`}
                style={{ fontFamily: "RobotoRegular" }}
              >
                Auto data on
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#293645", true: "#E19F42" }}
              thumbColor={isAutoDataOn ? "#fff" : "#fff"}
              value={isAutoDataOn}
              onValueChange={autoDataToggle}
            />
          </View>
          <View className="h-[.1rem] w-full bg-gray-400"></View>

          {/* wifi Setting */}
          <View className="flex-row justify-between items-center ">
            <View className="flex-row items-center gap-2 my-4">
              <Text
                className={`${textColor} text-lg`}
                style={{ fontFamily: "RobotoRegular" }}
              >
                Auto WI-FI on
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#293645", true: "#E19F42" }}
              thumbColor={isAutoWiFiOn ? "#fff" : "#fff"}
              value={isAutoWiFiOn}
              onValueChange={autoWiFiToggle}
            />
          </View>
          <View className="h-[.1rem] w-full bg-gray-400"></View>

          {/* video Setting */}
          <View className="flex-row justify-between items-center ">
            <View className="flex-row items-center gap-2 my-4">
              <Text
                className={`${textColor} text-lg`}
                style={{ fontFamily: "RobotoRegular" }}
              >
                Video quality
              </Text>
            </View>
            <View className="bg-[#293645] rounded-xl px-4 py-2 mr-2">
              <Text className="text-blue-500 text-lg">High</Text>
            </View>
          </View>
          <View className="h-[.1rem] w-full bg-gray-400"></View>

          {/* chat sound Setting */}
          <View className="flex-row justify-between items-center ">
            <View className="flex-row items-center gap-2 my-4">
              <Text
                className={`${textColor} text-lg`}
                style={{ fontFamily: "RobotoRegular" }}
              >
                Chat sound
              </Text>
            </View>
            <Switch trackColor={{ false: "#293645", true: "#E19F42" }} />
          </View>
          <View className="h-[.1rem] w-full bg-gray-400"></View>

          <Text
            className={`${textColor} font-semibold text-xl mt-12`}
            style={{ fontFamily: "RobotoRegular" }}
          >
            Data Saving
          </Text>

          {/* data saving Setting */}
          <View className="flex-row justify-between items-center ">
            <View className="flex-row items-center gap-2 my-4">
              <Text
                className={`${textColor} text-lg`}
                style={{ fontFamily: "RobotoRegular" }}
              >
                Data saving mode
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#293645", true: "#E19F42" }}
              thumbColor={isDataSaverOn ? "#fff" : "#fff"}
              value={isDataSaverOn}
              onValueChange={dataSavingToggle}
            />
          </View>
          <View className="h-[.1rem] w-full bg-gray-400"></View>

          {/* background data Setting */}
          <View className="flex-row justify-between items-center ">
            <View className="flex-row items-center gap-2 my-4">
              <Text
                className={`${textColor} text-lg`}
                style={{ fontFamily: "RobotoRegular" }}
              >
                Background data usage
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#293645", true: "#E19F42" }}
              thumbColor={isBackgroundDataEnabled ? "#fff" : "#fff"}
              value={isBackgroundDataEnabled}
              onValueChange={toggleBackgroundDataUsage}
            />
          </View>
          <View className="h-[.1rem] w-full bg-gray-400"></View>

          {/* clear cache Setting */}
          {/* <View className="flex-row justify-between items-center ">
            <View className="flex-row items-center gap-2 my-4">
              <Text
                className={`${textColor} text-lg`}
                style={{ fontFamily: "RobotoRegular" }}
              >
                Clear Cache
              </Text>
            </View>
            <Switch trackColor={{ false: "#293645", true: "#E19F42" }} />
          </View> */}
          <TouchableOpacity
            className="flex-row justify-between items-center my-4"
            onPress={clearCache}
          >
            <View className="flex-row items-center gap-2">
              <Text
                className={`${textColor} text-lg`}
                style={{ fontFamily: "RobotoRegular" }}
              >
                Clear Cache
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={iconColor} />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Data_and_Storage;
