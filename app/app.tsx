import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import Main from "./(tabs)/Main"; // <-- file Main.tsx nằm ở thư mục (tabs)
import OnBoardingScreen from "./OnBoardingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialMoney, setInitialMoney] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkInitialMoney = async () => {
      const money = await AsyncStorage.getItem("initialMoney");
      setInitialMoney(money);
      setLoading(false);
    };
    checkInitialMoney();
  }, []);

  if (loading) return null; // hoặc splash screen

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {initialMoney ? (
          <Stack.Screen name="Main" component={Main} />
        ) : (
          <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
