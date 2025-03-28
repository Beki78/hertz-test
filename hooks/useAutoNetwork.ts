import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

const useAutoNetwork = (autoWiFiOn: boolean, autoDataOn: boolean) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionType, setConnectionType] = useState<
    "wifi" | "cellular" | "none"
  >("none");

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        if (state.type === "wifi" && autoWiFiOn) {
          setIsConnected(true);
          setConnectionType("wifi");
        } else if (state.type === "cellular" && autoDataOn) {
          setIsConnected(true);
          setConnectionType("cellular");
        } else {
          setIsConnected(false);
          setConnectionType("none");
        }
      } else {
        setIsConnected(false);
        setConnectionType("none");
      }
    });

    return () => unsubscribe();
  }, [autoWiFiOn, autoDataOn]);

  return { isConnected, connectionType };
};

export default useAutoNetwork;
