// app/index.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkInitialMoney = async () => {
      const money = await AsyncStorage.getItem("initialMoney");
      if (money) {
        router.replace("/(tabs)/Main"); // Đã có tiền ban đầu → vào Main
      } else {
        router.replace("/OnBoardingScreen"); // Chưa có → vào Onboarding
      }
      setLoading(false);
    };
    checkInitialMoney();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null; // không render gì cả, vì sẽ redirect
}
