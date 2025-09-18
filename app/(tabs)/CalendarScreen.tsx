// app/CalendarScreen.tsx
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { router, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import BottomBar from '../components/BottomTabBar';

dayjs.locale('vi');

interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
}

const mockTransactions: Transaction[] = [
  { id: '1', date: '2025-08-21', type: 'income', category: 'Tiền lương', amount: 2500000 },
  { id: '2', date: '2025-08-21', type: 'expense', category: 'Ăn uống', amount: 150000 },
  { id: '3', date: '2025-08-22', type: 'expense', category: 'Ăn uống', amount: 30000 },
  { id: '4', date: '2025-08-23', type: 'expense', category: 'Ăn uống', amount: 3000000 },
  { id: '5', date: '2025-08-21', type: 'income', category: 'Tiền phụ cấp', amount: 2000000 },
];

export default function CalendarScreen() {
  const [now, setNow] = useState(dayjs());
  const [currentMonth, setCurrentMonth] = useState(dayjs().format('YYYY-MM'));
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

  useEffect(() => {
    const t = setInterval(() => setNow(dayjs()), 60 * 1000);
    return () => clearInterval(t);
  }, []);

  const pathname = usePathname();
  const getActiveTab = () => {
    if (pathname === '/CalendarScreen') return 'calendar';
    if (pathname === '/StatsScreen') return 'stats';
    if (pathname === '/SettingsScreen') return 'settings';
    return 'home';
  };

  // Lọc giao dịch trong tháng hiện tại
  let transactions = mockTransactions.filter(t =>
    dayjs(t.date).format('YYYY-MM') === currentMonth
  );

  if (filter !== 'all') {
    transactions = transactions.filter(t => t.type === filter);
  }

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  // Gom nhóm theo ngày
  const groupedByDate = transactions.reduce<Record<string, Transaction[]>>((acc, t) => {
    if (!acc[t.date]) acc[t.date] = [];
    acc[t.date].push(t);
    return acc;
  }, {});

  const dates = Object.keys(groupedByDate).sort((a, b) => dayjs(b).unix() - dayjs(a).unix());

  return (
    <View style={styles.container}>
      {/* Thanh tiến trình tỷ lệ chi tiêu */}
      <View style={styles.progressContainerAlt}>
        <Text style={styles.progressLabel}>Tỷ lệ chi tiêu</Text>

        {income > 0 ? (
          expense <= income ? (
            <>
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill1,
                    { width: `${Math.min((expense / income) * 100, 100)}%` },
                  ]}
                />
              </View>
              <Text style={[styles.progressText, { color: "#39ca11ff" }]}>
                Thu nhập vượt chi tiêu  {(income - expense).toLocaleString()}đ
              </Text>
            </>
          ) : (
            <>
              <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill2, { width: "100%" }]} />
              </View>
              <Text style={[styles.progressText, { color: "#F44336" }]}>
                Chi tiêu vượt thu nhập {(expense - income).toLocaleString()}đ
              </Text>
            </>
          )
        ) : (
          <Text style={styles.progressText}>Chưa có thu nhập</Text>
        )}
      </View>


      {/* Tháng + Card tổng */}
      <View style={styles.monthContainer}>
        <TouchableOpacity onPress={() =>
          setCurrentMonth(dayjs(currentMonth).subtract(1, 'month').format('YYYY-MM'))
        }>
          <Icon name="chevron-left" size={28} color="#666" />
        </TouchableOpacity>

        <Text style={styles.monthText}>{dayjs(currentMonth).format('MM/YYYY')}</Text>

        <TouchableOpacity onPress={() =>
          setCurrentMonth(dayjs(currentMonth).add(1, 'month').format('YYYY-MM'))
        }>
          <Icon name="chevron-right" size={28} color="#666" />
        </TouchableOpacity>
      </View>

      {/* 3 card tổng */}
      <View style={styles.summaryRow}>
        <View style={[styles.card, { backgroundColor: '#E8F5E9' }]}>
          <Text style={styles.cardLabel}>Thu nhập</Text>
          <Text style={[styles.cardValue, { color: '#4CAF50' }]}>{income.toLocaleString()}đ</Text>
        </View>
        <View style={[styles.card, { backgroundColor: '#FFEBEE' }]}>
          <Text style={styles.cardLabel}>Chi tiêu</Text>
          <Text style={[styles.cardValue, { color: '#F44336' }]}>{expense.toLocaleString()}đ</Text>
        </View>
        <View style={[styles.card, { backgroundColor: balance >= 0 ? '#E3F2FD' : '#FFF3E0' }]}>
          <Text style={styles.cardLabel}>Tổng</Text>
          <Text style={[
            styles.cardValue,
            { color: balance >= 0 ? '#2196F3' : '#FF9800' }
          ]}>
            {balance.toLocaleString()}đ
          </Text>
        </View>
      </View>

      {/* Bộ lọc */}
      <View style={styles.filterRow}>
        {['all', 'income', 'expense'].map(type => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              filter === type && styles.filterButtonActive
            ]}
            onPress={() => setFilter(type as any)}
          >
            <Text style={[
              styles.filterText,
              filter === type && styles.filterTextActive
            ]}>
              {type === 'all' ? 'Tất cả' : type === 'income' ? 'Thu nhập' : 'Chi tiêu'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Danh sách giao dịch theo ngày */}
      <FlatList
        data={dates}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.dayCard}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayTitle}>
                {dayjs(item).format('DD/MM/YYYY (ddd)')}
              </Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{groupedByDate[item].length}</Text>
              </View>
            </View>
            {groupedByDate[item].map(tr => (
              <View key={tr.id} style={styles.transactionRow}>
                <Icon
                  name={tr.type === 'income' ? 'arrow-downward' : 'arrow-upward'}
                  size={20}
                  color={tr.type === 'income' ? '#4CAF50' : '#F44336'}
                />
                <Text style={styles.transactionText}>{tr.category}</Text>
                <Text style={[
                  styles.transactionAmount,
                  { color: tr.type === 'income' ? '#4CAF50' : '#F44336' }
                ]}>
                  {tr.amount.toLocaleString()}đ
                </Text>
              </View>
            ))}
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Bottom Bar */}
      <BottomBar
        activeTab={getActiveTab()}
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
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: 16,
    borderBottomWidth: 1, borderBottomColor: '#eee',
  },

  monthContainer: {
    flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center', paddingVertical: 12,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  monthText: { fontSize: 18, fontWeight: '600', marginHorizontal: 12, color: '#333' },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  card: {
    flex: 1,
    marginHorizontal: 6,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cardLabel: { fontSize: 14, color: '#555' },
  cardValue: { fontSize: 15, fontWeight: '700' },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  filterButtonActive: {
    backgroundColor: '#4CAF50',
  },
  filterText: { fontSize: 14, color: '#555' },
  filterTextActive: { color: '#fff', fontWeight: '600' },

  dayCard: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  dayTitle: { fontSize: 14, fontWeight: '600', color: '#333' },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },

  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  transactionText: { flex: 1, marginLeft: 8, fontSize: 14, color: '#333' },
  transactionAmount: { fontSize: 14, fontWeight: '600' },
  progressContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  progressContainerAlt: {  // ✅ đổi tên
    backgroundColor: "#fff",
    padding: 12,
    margin: 12,
    borderRadius: 10,
    elevation: 2,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    overflow: "hidden"
  },
  progressBarFill1: {
    height: 8,
    backgroundColor: "#0ade18ff"
  },
  progressBarFill2: {
    height: 8,
    backgroundColor: "#f0080cff"
  },
  progressText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4
  },


});
