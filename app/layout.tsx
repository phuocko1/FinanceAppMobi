// app/_layout.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [isOnboardingDone, setIsOnboardingDone] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const balance = await AsyncStorage.getItem("initialBalance");
        setIsOnboardingDone(!!balance); // true nếu có số dư
      } catch (error) {
        console.error("Lỗi kiểm tra Onboarding:", error);
        setIsOnboardingDone(false);
      } finally {
        setAppReady(true);
      }
    };

    checkOnboarding();
  }, []);

  if (!appReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF9800" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isOnboardingDone ? (
        <Stack.Screen name="OnBoardingScreen" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}
