import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";
export const clearCache = async () => {
  try {
    await FileSystem.deleteAsync(FileSystem.cacheDirectory ?? "", {
      idempotent: true,
    });
    Alert.alert("Success", "Cache cleared successfully!");
  } catch (error) {
    Alert.alert("Error", "Failed to clear cache.");
    console.error("Cache Clear Error:", error);
  }
};
