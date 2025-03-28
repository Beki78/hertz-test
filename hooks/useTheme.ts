import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useTheme() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const fetchTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      setTheme(storedTheme);
    };

    fetchTheme();
  }, []);

  return theme;
}
