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
      try {
        const money = await AsyncStorage.getItem("initialMoney");
        if (money) {
          router.replace("../(tabs)/Main"); // Có dữ liệu → vào Main
        } else {
          router.replace("../OnBoardingScreen"); // Không có → vào Onboarding
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra dữ liệu:", error);
        router.replace("../OnBoardingScreen"); // Sai thì vào Onboarding
      } finally {
        setLoading(false);
      }
    };

    checkInitialMoney();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF9800" />
      </View>
    );
  }

  return null; // Không render gì cả, vì đã redirect
}