import { ScrollView, Switch, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setTheme } from "@/store/theme/themeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const route = useRouter();
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  const handleTheme = () => {
    dispatch(setTheme(theme.theme === "dark" ? "light" : "dark"));
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    route.back();
    ToastAndroid.show(
      "Logged out successfully",
      ToastAndroid.SHORT
    );
  };

  const backgroundColor = theme.theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme.theme === "dark" ? "text-white" : "text-black";
  const iconColor = theme.theme === "dark" ? "white" : "black";
  const borderColor = theme.theme === "dark" ? "border-white" : "border-black";

  // Settings Data Array
  const settings = [
    { title: "Language", icon: "globe-outline", route: "" },
    { title: "Location (Country)", icon: "location-outline", route: "" },
    {
      title: "Notification",
      icon: "chatbox-ellipses-outline",
      route: "/settings/notification",
    },
    {
      title: "Privacy and Security",
      icon: "lock-closed-outline",
      route: "/settings/privacy",
    },
    {
      title: "Data and Storage",
      icon: "newspaper-outline",
      route: "/settings/data_storage",
    },
  ];

  const otherSettings = [
    { title: "Get Help", icon: "help-circle-outline", route: "" },
    {
      title: "Terms and Policy",
      icon: "lock-closed-outline",
      route: "/settings/terms",
    },
    { title: "Give Feedback", icon: "star-outline", route: "" },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} name="settings" />
      <SafeAreaView className={`${backgroundColor} flex-1`}>
        <Header headerTitle="Settings" />
        <ScrollView className="mx-6">
          {/* General Section */}
          <Text
            className={`${textColor} font-semibold text-xl mt-12`}
            style={{ fontFamily: "RobotoRegular" }}
          >
            General
          </Text>

          {settings.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                className="flex-row justify-between items-center my-4"
                onPress={() => item.route && route.push(item.route as any)}
              >
                <View className="flex-row items-center gap-2">
                  <Ionicons name={item.icon as any} size={24} color={iconColor} />
                  <Text
                    className={`${textColor} text-lg`}
                    style={{ fontFamily: "RobotoRegular" }}
                  >
                    {item.title}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color={iconColor} />
              </TouchableOpacity>
              <View className="h-[.1rem] w-full bg-gray-400"></View>
            </View>
          ))}

          {/* Dark Theme Toggle */}
          <View className="flex-row justify-between items-center my-4">
            <View className="flex-row items-center gap-2">
              <Ionicons name="moon-outline" size={24} color={iconColor} />
              <Text
                className={`${textColor} text-lg`}
                style={{ fontFamily: "RobotoRegular" }}
              >
                Dark Theme
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#293645", true: "#E19F42" }}
              thumbColor={theme.theme === "dark" ? "#fff" : "#fff"}
              value={theme.theme === "dark"}
              onValueChange={handleTheme}
            />
          </View>
          <View className="h-[.1rem] w-full bg-gray-400"></View>

          {/* Others Section */}
          <Text
            className={`${textColor} font-semibold text-xl mt-12`}
            style={{ fontFamily: "RobotoRegular" }}
          >
            Others
          </Text>

          {otherSettings.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                className="flex-row justify-between items-center my-4"
                onPress={() => item.route && route.push(item.route as any)}
              >
                <View className="flex-row items-center gap-2">
                  <Ionicons name={item.icon as any} size={24} color={iconColor} />
                  <Text
                    className={`${textColor} text-lg`}
                    style={{ fontFamily: "RobotoRegular" }}
                  >
                    {item.title}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color={iconColor} />
              </TouchableOpacity>
              <View className="h-[.1rem] w-full bg-gray-400"></View>
            </View>
          ))}

          {/* Logout Button */}
          <TouchableOpacity
            className={`${borderColor} flex-row justify-center items-center my-4 gap-2 border-2 p-2 rounded-3xl w-52`}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color={iconColor} />
            <Text
              className={`${textColor} font-semibold text-lg`}
              style={{ fontFamily: "RobotoRegular" }}
            >
              Log Out
            </Text>
          </TouchableOpacity>

          {/* <NotificationScreen /> */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default index;
