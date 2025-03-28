// import { useEffect, useState, useRef } from "react";
// import { View, Text, Button, Platform } from "react-native";
// import * as Notifications from "expo-notifications";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Device from "expo-device";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";

// export default function NotificationScreen() {
//   const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
//   const [hasPermission, setHasPermission] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const notificationListener = useRef<any>();
//   const responseListener = useRef<any>();

//   const isVibrationEnabled = useSelector(
//     (state: RootState) => state.vibration.isEnabled
//   );
//   const isBroadcastNotificationEnabled = useSelector(
//     (state: RootState) => state.broadcastNotification.isBroadCastEnabled
//   );
//   // Configure notification handling
//   Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//       shouldShowAlert: isBroadcastNotificationEnabled,
//       shouldPlaySound: isVibrationEnabled,
//       shouldSetBadge: true,
//       vibrate: false,
//     }),
//   });

//   // Request permission and get push token
//   useEffect(() => {
//     async function registerForPushNotificationsAsync() {
//       if (!Device.isDevice) {
//         alert("Must use a physical device for push notifications");
//         return;
//       }

//       const { status: existingStatus } =
//         await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;
//       if (existingStatus !== "granted") {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }

//       if (finalStatus !== "granted") {
//         alert("Failed to get push token for push notification!");
//         setHasPermission(false);
//         return;
//       }

//       setHasPermission(true);

//       // Get Expo Push Token
//       const token = (await Notifications.getExpoPushTokenAsync()).data;
//       console.log("Expo Push Token:", token);
//       setExpoPushToken(token);

//       // Store push token in backend
//       await savePushTokenToBackend(token);
//     }

//     registerForPushNotificationsAsync();
//   }, []);

//   // Listen for incoming notifications
//   useEffect(() => {
//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification) => {
//         console.log("Received Notification:", notification);
//       });

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log("User interacted with notification:", response);
//       });

//     return () => {
//       Notifications.removeNotificationSubscription(
//         notificationListener.current
//       );
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   // Save push token to backend
//   const savePushTokenToBackend = async (token: string) => {
//     try {
//       const userToken = await AsyncStorage.getItem("token");
//       if (!userToken) {
//         console.log("No auth token found!");
//         return;
//       }

//       await fetch("http://192.168.194.103:3000/api/users/push-token", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//         body: JSON.stringify({ pushToken: token }),
//       });

//       console.log("Push token saved to backend");
//     } catch (error) {
//       console.error("Error saving push token:", error);
//     }
//   };

//   // Show the notification
//   const showNotification = async (message: string) => {
//     try {
//       await Notifications.scheduleNotificationAsync({
//         content: {
//           title: "New Notification",
//           body: message,
//           sound: isVibrationEnabled ? "default" : null, 
//           vibrate: isVibrationEnabled ? [200, 100, 200] : [],
//         },
//         trigger: { seconds: 1 },
//         android: {
//           channelId: "custom-channel",
//         },
//       } as any);
//       console.log("Notification Scheduled!");
//     } catch (error) {
//       console.error("Error showing notification:", error);
//     }
//   };

//   // Fetch notifications from backend
//   const fetchNotifications = async () => {
//     if (!hasPermission) {
//       alert("Please grant notification permissions.");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const token = await AsyncStorage.getItem("token");
//       if (!token) {
//         alert("No auth token found!");
//         return;
//       }

//       console.log("Fetching notifications...");
//       const response = await fetch(
//         "http://192.168.194.103:3000/api/notifications",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json();
//       console.log("Response Data:", data);

//       if (response.ok && data.notifications.length > 0) {
//         const latestNotification = data.notifications[0];
//         showNotification(latestNotification.message);
//       } else {
//         alert("No new notifications.");
//       }
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//       alert("Failed to fetch notifications.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Button
//         title="Get Notifications"
//         onPress={fetchNotifications}
//         disabled={isLoading}
//       />

//       {isLoading && <Text>Loading...</Text>}
//     </View>
//   );
// }
