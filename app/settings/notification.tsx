import { View, Text, ScrollView, Switch } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Stack } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleVibration } from "@/store/sound/vibrationSlice";
import { toggleNotification } from "@/store/sound/broadcastNotificationSlice";

const Notification = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [isBroadcast, setIsBroadcast] = React.useState(false);
  const theme = useSelector((state: RootState) => state.theme);

  const dispatch = useDispatch();
  const isVibrationEnabled = useSelector(
    (state: RootState) => state.vibration.isEnabled
  );

  const isBroadcastNotificationEnabled = useSelector(
    (state: RootState) => state.broadcastNotification.isBroadCastEnabled
  );
  const backgroundColor = theme.theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme.theme === "dark" ? "text-white" : "text-black";

  const inAppSettings = [
    {
      title: "In app sound",
      value: isEnabled,
      onValueChange: setIsEnabled,
    },
    {
      title: "In app vibration",
      value: isVibrationEnabled,
      onValueChange: (value: boolean) => {
        setIsEnabled(value);
        dispatch(toggleVibration());
      },
    },
    {
      title: "In app preview",
      value: false, 
      onValueChange: () => {},
    },
    {
      title: "Chat sound",
      value: false, 
      onValueChange: () => {},
    },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} name="notification" />
      <SafeAreaView className={`${backgroundColor} flex-1`}>
        <Header headerTitle="Notification" />
        <ScrollView className="mx-6">
          <Text
            className={`${textColor} font-semibold text-xl mt-12`}
            style={{ fontFamily: "RobotoRegular" }}
          >
            System notifications
          </Text>

          {inAppSettings.map((setting, index) => (
            <React.Fragment key={index}>
              <View className="flex-row justify-between items-center">
                <Text
                  className={`${textColor} text-lg my-4`}
                  style={{ fontFamily: "RobotoRegular" }}
                >
                  {setting.title}
                </Text>
                <Switch
                  trackColor={{ false: "#293645", true: "#E19F42" }}
                  thumbColor={setting.value ? "#fff" : "#fff"}
                  value={setting.value}
                  onValueChange={setting.onValueChange}
                />
              </View>
              <View className="h-[.1rem] w-full bg-gray-400"></View>
            </React.Fragment>
          ))}

          <Text
            className={`${textColor} font-semibold text-xl mt-12`}
            style={{ fontFamily: "RobotoRegular" }}
          >
            Broadcast
          </Text>

          <View className="flex-row justify-between items-center ">
            <View className="flex-col items-start gap-2 my-4">
              <Text
                className={`${textColor} text-lg`}
                style={{ fontFamily: "RobotoRegular" }}
              >
                Broadcast notification
              </Text>
              <Text className={`${textColor} text-sm`}>
                Notification on a shop or a content broadcast
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#293645", true: "#E19F42" }}
              thumbColor={isBroadcastNotificationEnabled ? "#fff" : "#fff"}
              value={isBroadcastNotificationEnabled}
              onValueChange={(value) => {
                setIsBroadcast(value);
                dispatch(toggleNotification());
              }}
            />
          </View>
          <View className="h-[.1rem] w-full bg-gray-400"></View>

          <Text
            className={`${textColor} font-semibold text-xl mt-12`}
            style={{ fontFamily: "RobotoRegular" }}
          >
            Shop notification
          </Text>

          <View className="flex-row justify-between items-center ">
            <Text
              className={`${textColor} text-lg my-4`}
              style={{ fontFamily: "RobotoRegular" }}
            >
              Shop notification
            </Text>
            <Switch trackColor={{ false: "#293645", true: "#E19F42" }} />
          </View>
          <View className="h-[.1rem] w-full bg-gray-400"></View>

          <View className="flex-row justify-between items-center ">
            <Text
              className={`${textColor} text-lg my-4`}
              style={{ fontFamily: "RobotoRegular" }}
            >
              Chat notification
            </Text>
            <Switch trackColor={{ false: "#293645", true: "#E19F42" }} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Notification;
