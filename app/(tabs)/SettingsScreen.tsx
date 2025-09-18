// app/SettingsScreen.tsx
import { router, usePathname } from 'expo-router'; // ✅ Thêm để điều hướng và xác định active tab
import React from "react";
import { Text, View } from "react-native";
import BottomBar from '../components/BottomTabBar';

export default function SettingsScreen() {
  // ✅ Xác định tab đang active
  const pathname = usePathname();
  console.log('Current path:', pathname);
  const getActiveTab = () => {
    if (pathname === '/CalendarScreen') return 'calendar';
    if (pathname === '/StatsScreen') return 'stats';
    if (pathname === '/SettingsScreen') return 'settings';
    return 'home';
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Nội dung chính */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cài Đặt</Text>
      </View>

      {/* ✅ Bottom Tab Bar */}
      <BottomBar
        activeTab={getActiveTab()}
        onTabPress={(tab) => {
          switch (tab) {
            case 'home':
              router.push('/');
              break;
            case 'calendar':
              router.push('/CalendarScreen');
              break;
            case 'stats':
              router.push('/StatsScreen');
              break;
            case 'settings':
              router.push('/SettingsScreen');
              break;
            default:
              break;
          }
        }}
      />
    </View>
  );
}