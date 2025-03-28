import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "@/store/store";
import { toggleDataSaving } from "@/store/setting/DataSavingSlice";
import { setAutoData, setAutoWiFi } from "@/store/setting/networkSlice";
import { setBackgroundData } from "@/store/setting/backgroundDataUsageSlice";

export const useToggleSetting = () => {
  const dispatch = useDispatch();

  const isDataSaverOn = useSelector(
    (state: RootState) => state.dataSaving.isDataSavingEnabled
  );

  const isAutoDataOn = useSelector(
    (state: RootState) => state.network.isAutoDataOn
  );

  const isAutoWiFiOn = useSelector(
    (state: RootState) => state.network.isAutoWiFiOn
  );

  const isBackgroundDataEnabled = useSelector(
    (state: RootState) => state.backgroundDataUsage.isBackgroundDataUsageEnabled
  );

  const dataSavingToggle = async () => {
    dispatch(toggleDataSaving());
    const updatedValue = !isDataSaverOn;
    await AsyncStorage.setItem("dataSaving", JSON.stringify(updatedValue));
  };

  const autoDataToggle = async () => {
    const newAutoDataValue = !isAutoDataOn;
    dispatch(setAutoData(newAutoDataValue));
    await AsyncStorage.setItem("autoDataOn", JSON.stringify(newAutoDataValue));
  };

  const autoWiFiToggle = async () => {
    const newAutoWiFiValue = !isAutoWiFiOn;
    dispatch(setAutoWiFi(newAutoWiFiValue));
    await AsyncStorage.setItem("autoWiFiOn", JSON.stringify(newAutoWiFiValue));
  };

  const toggleBackgroundDataUsage = async (value: boolean) => {
    dispatch(setBackgroundData(value));
    await AsyncStorage.setItem("backgroundData", JSON.stringify(value));
  };

  return {
    isDataSaverOn,
    isAutoDataOn,
    isAutoWiFiOn,
    isBackgroundDataEnabled,
    dataSavingToggle,
    autoDataToggle,
    autoWiFiToggle,
    toggleBackgroundDataUsage,
  };
};
