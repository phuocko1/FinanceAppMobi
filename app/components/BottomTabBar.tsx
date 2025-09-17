// components/BottomTabBar.tsx
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

type Props = {
  onTabPress?: (tab: string) => void;
};

const BottomTabBar: React.FC<Props> = ({ onTabPress }) => {
  return (
    <View style={styles.container}>
      {/* Tab 1: Nhập vào */}
      <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress?.("home")}>
        <Icon name="edit" size={24} color="#FF9800" />
        <Text style={[styles.tabText, { color: "#FF9800" }]}>Nhập vào</Text>
      </TouchableOpacity>

      {/* Tab 2: Lịch */}
      <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress?.("calendar")}>
        <Icon name="calendar-today" size={24} color="#666" />
        <Text style={styles.tabText}>Lịch</Text>
      </TouchableOpacity>

      {/* Tab 3: Báo cáo */}
      <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress?.("stats")}>
        <Icon name="pie-chart" size={24} color="#666" />
        <Text style={styles.tabText}>Báo cáo</Text>
      </TouchableOpacity>

      {/* Tab 4: Khác */}
      <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress?.("settings")}>
        <Icon name="more-horiz" size={24} color="#666" />
        <Text style={styles.tabText}>Khác</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
    color: "#666",
  },
});

export default BottomTabBar;
