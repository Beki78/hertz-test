// // utils/backgroundTasks.ts
// import * as TaskManager from "expo-task-manager";
// import * as BackgroundFetch from "expo-background-fetch";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export async function initializeBackgroundTasks() {
//   // Wait until TaskManager is available
//   while (!TaskManager.isAvailableAsync()) {
//     console.log("Waiting for TaskManager to become available...");
//     await new Promise((resolve) => setTimeout(resolve, 500)); // Retry every 500ms
//   }

//   const BACKGROUND_FETCH_TASK = "background-fetch-task";

//   if (!TaskManager.isTaskDefined(BACKGROUND_FETCH_TASK)) {
//     TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
//       try {
//         const isBackgroundDataEnabled = await AsyncStorage.getItem(
//           "backgroundDataUsage"
//         );

//         if (isBackgroundDataEnabled === "true") {
//           const UNSPLASH_ACCESS_KEY =
//             "BFdck1Yroxm92IPVSGnlL9gdwiTxV3PFAM8ty1XImA8";
//           const response = await fetch(
//             `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&count=15`
//           );
//           const data = await response.json();

//           await AsyncStorage.setItem(
//             "backgroundFetchedImages",
//             JSON.stringify(data)
//           );
//           console.log("Fetched images in background:", data);

//           return BackgroundFetch.BackgroundFetchResult.NewData;
//         }

//         return BackgroundFetch.BackgroundFetchResult.NoData;
//       } catch (error) {
//         console.error("Background fetch failed", error);
//         return BackgroundFetch.BackgroundFetchResult.Failed;
//       }
//     });
//   }
// }