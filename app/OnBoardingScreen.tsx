// app/OnBoardingScreen.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function OnBoardingScreen() {
  const [amount, setAmount] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const keyboardDidShow = (e: any) => {
      setKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height);
    };

    const keyboardDidHide = () => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
    };

    const showListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      keyboardDidShow
    );
    const hideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      keyboardDidHide
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const handleSave = async () => {
    if (!amount.trim()) {
      alert("Vui lòng nhập số tiền hiện có");
      return;
    }
    try {
      await AsyncStorage.setItem("initialMoney", amount);
      router.replace("/Main");
    } catch (error) {
      console.error("Lỗi lưu số tiền:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập số tiền ban đầu</Text>

      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={amount}
        onChangeText={setAmount}
        placeholder="0"
        returnKeyType="done"
        onSubmitEditing={handleSave}
      />

      {isKeyboardVisible && (
        <View
          style={[
            styles.accessory,
            {
              bottom: 0,
              height: 48,
            },
          ]}
        >
          <Button title="Hoàn thành" onPress={handleSave} color="#007AFF" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
  },
  accessory: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});