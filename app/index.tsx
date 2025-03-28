import { View, Text, Button, TouchableOpacity, AppState } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useGetRandomImagesQuery } from "@/api/fetchApi";
import { initializeDataSaving } from "@/store/setting/DataSavingSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import registerNNPushToken from "native-notify";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  registerNNPushToken(28711, "VilA1sw5FErSlmb5cifaMg");
  const isVibrationEnabled = useSelector(
    (state: RootState) => state.vibration.isEnabled
  );
  const isBroadcastNotificationEnabled = useSelector(
    (state: RootState) => state.broadcastNotification.isBroadCastEnabled
  );

  const requestPermission = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      return status === "granted";
    } catch (error) {
      console.error("Error requesting permission:", error);
      return false;
    }
  };
  Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: isBroadcastNotificationEnabled,
        shouldPlaySound: isVibrationEnabled,
        shouldSetBadge: true,
        vibrate: false,
      }),
    });

  useEffect(() => {
    const setupPushNotifications = async () => {
      const hasPermission = await requestPermission();
      if (!hasPermission) return;

      messaging()
        .getToken()
        .then((token) => console.log("FCM Token:", token));

      messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
          if (remoteMessage) {
            console.log("Opened from quit state:", remoteMessage.notification);
          }
        });

      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log("Opened from background:", remoteMessage.notification);
      });

      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log("Background message:", remoteMessage.notification);
      });

      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        console.log("Foreground message:", remoteMessage);
        await Notifications.scheduleNotificationAsync({
          content: {
            title: remoteMessage.notification?.title || "New Notification",
            body: remoteMessage.notification?.body || "You have a new message.",
          },
          trigger: null,
        });
      });

      return () => unsubscribe();
    };

    setupPushNotifications();
  }, []);

  const isDataSaverOn = useSelector(
    (state: RootState) => state.dataSaving.isDataSavingEnabled
  );
  const [images, setImages] = useState<any[]>([]);
  const { data, refetch } = useGetRandomImagesQuery(null, {
    skip: isDataSaverOn,
  });

  useEffect(() => {
    if (!isDataSaverOn) refetch();
  }, [isDataSaverOn]);

  useEffect(() => {
    if (data) {
      setImages(data);
      console.log("Images fetched:", data); 
    }
  }, [data]);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        console.log("Auto Data On:", await AsyncStorage.getItem("autoDataOn"));
        console.log("Auto Wi-Fi On:", await AsyncStorage.getItem("autoWiFiOn"));
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    const thunk = initializeDataSaving();
    thunk(dispatch);
  }, [dispatch]);
  

  const isBackgroundDataEnabled = useSelector(
    (state: RootState) => state.backgroundDataUsage.isBackgroundDataUsageEnabled
  );

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      "change",
      (nextAppState) => {
        console.log(
          `App moved to ${nextAppState} - Background Data: ${isBackgroundDataEnabled}`
        );
      }
    );
    return () => appStateListener.remove();
  }, [isBackgroundDataEnabled]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} name="home" />
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        className="bg-black"
      >
        <Text style={{ fontSize: 24, marginBottom: 20 }} className="text-white">
          Home Page
        </Text>
        <Button
          title="Go to Settings"
          onPress={() => router.push("/(auth)/signin")}
        />
        <TouchableOpacity
          onPress={() => router.push("/content/content")}
          className="bg-blue-500 mt-5"
        >
          <Text style={{ fontSize: 18, padding: 10 }} className="text-white">
            Go to Content
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
