// app/SettingsScreen.tsx
import { router, usePathname } from 'expo-router';
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomBar from '../components/BottomTabBar';

export default function SettingsScreen() {
  const pathname = usePathname();
  console.log('Current path:', pathname);
  const getActiveTab = () => {
    if (pathname === '/CalendarScreen') return 'calendar';
    if (pathname === '/StatsScreen') return 'stats';
    if (pathname === '/SettingsScreen') return 'settings';
    return 'home';
  };

  const activeTab = getActiveTab();
  const isActive = activeTab === 'settings'; // ✅ Kiểm tra nếu đang ở tab này

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={[styles.screenTitle, isActive && styles.activeTitle]}>
          Cài Đặt
        </Text>
      </View>

      <BottomBar
        activeTab={activeTab}
        onTabPress={(tab) => {
          switch (tab) {
            case 'home': router.push('/'); break;
            case 'calendar': router.push('/CalendarScreen'); break;
            case 'stats': router.push('/StatsScreen'); break;
            case 'settings': router.push('/SettingsScreen'); break;
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  activeTitle: {
    color: '#FF9800',
  },
});