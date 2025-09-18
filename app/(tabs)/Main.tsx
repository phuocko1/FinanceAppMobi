// src/screens/Main.tsx
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  expenseCategories,
  handleCategoryPress,
  incomeCategories,
} from '../../src/utils/Category';
import {
  formatDay,
  formatNumber,
  goToNextDay,
  goToPreviousDay,
} from '../../src/utils/FormatUtils';
import BottomBar from '../components/BottomTabBar';
import MainScreenStyles from '../styles/MainScreenStyles';

// ✅ Thêm import router và usePathname
import { router, usePathname } from 'expo-router';

const Main = () => {
  const { initialBalance } = useLocalSearchParams<{ initialBalance?: string }>();

  const [isIncome, setIsIncome] = useState(false);
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('0');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'needs' | 'wants' | 'save'>('needs');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [balance, setBalance] = useState<number>(0);

  const handleChangeAmount = (val: string) => {
    const formatted = formatNumber(val);
    setAmount(formatted === '' ? '0' : formatted);
  };

  const handleSubmit = () => {
    if (!selectedCategory || !amount || amount === '0') {
      alert('Vui lòng chọn danh mục và nhập số tiền!');
      return;
    }
    const rawAmount = amount.replace(/\./g, '');
    alert(`Đã nhập: ${isIncome ? 'Tiền thu' : 'Tiền chi'} ${rawAmount} đ`);
  };

  const currentCategories = expenseCategories[activeTab];

  // ✅ Xác định tab đang active
  const pathname = usePathname();
  const getActiveTab = () => {
    if (pathname === '/calendar') return 'calendar';
    if (pathname === '/stats') return 'stats';
    if (pathname === '/settings') return 'settings';
    return 'home'; // mặc định là home khi ở '/'
  };

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <ScrollView style={MainScreenStyles.container}>
        {/* Tiêu đề: Tiền chi / Tiền thu */}
        <View style={[MainScreenStyles.header, { marginTop: 10 }]}>
          <TouchableOpacity
            style={[
              MainScreenStyles.tabButton,
              isIncome ? MainScreenStyles.tabInactive : MainScreenStyles.tabActive,
            ]}
            onPress={() => setIsIncome(false)}
          >
            <Text
              style={[
                MainScreenStyles.tabText,
                isIncome
                  ? MainScreenStyles.tabTextInactive
                  : MainScreenStyles.tabTextActive,
              ]}
            >
              Tiền chi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              MainScreenStyles.tabButton,
              isIncome ? MainScreenStyles.tabActive : MainScreenStyles.tabInactive,
            ]}
            onPress={() => setIsIncome(true)}
          >
            <Text
              style={[
                MainScreenStyles.tabText,
                isIncome
                  ? MainScreenStyles.tabTextActive
                  : MainScreenStyles.tabTextInactive,
              ]}
            >
              Tiền thu
            </Text>
          </TouchableOpacity>
        </View>

        {/* Ngày */}
        <View style={MainScreenStyles.dateRow}>
          <Text style={MainScreenStyles.label}>Ngày</Text>
          <View style={MainScreenStyles.dateContainer}>
            <TouchableOpacity
              onPress={() => setCurrentDate(goToPreviousDay(currentDate))}
              style={MainScreenStyles.arrowButton}
            >
              <Icon name="chevron-left" size={24} color="#4CAF50" />
            </TouchableOpacity>
            <Text style={MainScreenStyles.dateText}>{formatDay(currentDate)}</Text>
            <TouchableOpacity
              onPress={() => setCurrentDate(goToNextDay(currentDate))}
              style={MainScreenStyles.arrowButton}
            >
              <Icon name="chevron-right" size={24} color="#4CAF50" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Ghi chú */}
        <View style={MainScreenStyles.row}>
          <Text style={MainScreenStyles.label}>Ghi chú</Text>
          <TextInput
            style={MainScreenStyles.input}
            placeholder="Chưa nhập vào"
            value={note}
            onChangeText={setNote}
            multiline
            blurOnSubmit
          />
        </View>

        {/* Số tiền */}
        <View style={MainScreenStyles.row}>
          <Text style={MainScreenStyles.label}>Tiền {isIncome ? 'thu' : 'chi'}</Text>
          <View style={MainScreenStyles.amountContainer}>
            <TextInput
              style={MainScreenStyles.amountInput}
              value={amount}
              onChangeText={handleChangeAmount}
              keyboardType="number-pad"
              returnKeyType="done"
              blurOnSubmit
              placeholder="0"
              textAlign="right"
            />
            <Text style={MainScreenStyles.currency}>đ</Text>
          </View>
        </View>

        {/* Danh mục */}
        <View style={MainScreenStyles.categorySection}>
          {isIncome && <Text style={MainScreenStyles.sectionTitle}>Danh mục</Text>}

          {isIncome ? (
            <View style={MainScreenStyles.categoryGrid}>
              {incomeCategories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    MainScreenStyles.categoryButton,
                    selectedCategory === cat.id && MainScreenStyles.selectedCategory,
                  ]}
                  onPress={() => handleCategoryPress(cat.id, setSelectedCategory)}
                >
                  <Icon name={cat.icon} size={24} color={cat.color} />
                  <Text style={MainScreenStyles.categoryLabel}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <>
              {/* Tab 50-30-20 */}
              <View style={MainScreenStyles.header}>
                {(['needs', 'wants', 'save'] as const).map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    style={[
                      MainScreenStyles.tabButton,
                      activeTab === tab && MainScreenStyles.tabActive,
                    ]}
                    onPress={() => setActiveTab(tab)}
                  >
                    <Text
                      style={[
                        MainScreenStyles.tabText,
                        activeTab === tab
                          ? MainScreenStyles.tabTextActive
                          : MainScreenStyles.tabTextInactive,
                      ]}
                    >
                      {tab === 'needs' ? '50%' : tab === 'wants' ? '30%' : '20%'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Tiêu đề nhóm */}
              <Text style={MainScreenStyles.sectionTitle}>
                {activeTab === 'needs' && 'Danh Mục: Cần Thiết'}
                {activeTab === 'wants' && 'Danh Mục: Muốn'}
                {activeTab === 'save' && 'Danh Mục: Tiết kiệm'}
              </Text>

              {/* Lưới danh mục */}
              <View style={MainScreenStyles.categoryGrid}>
                {currentCategories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      MainScreenStyles.categoryButton,
                      selectedCategory === cat.id && MainScreenStyles.selectedCategory,
                    ]}
                    onPress={() => handleCategoryPress(cat.id, setSelectedCategory)}
                  >
                    <Icon name={cat.icon} size={24} color="#4CAF50" />
                    <Text style={MainScreenStyles.categoryLabel}>{cat.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </View>

        {/* Nút nhập */}
        <TouchableOpacity style={MainScreenStyles.submitButton} onPress={handleSubmit}>
          <Text style={MainScreenStyles.submitButtonText}>
            Nhập khoản {isIncome ? 'thu' : 'chi'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ✅ Bottom bar - đã sửa để điều hướng và highlight */}
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
};

export default Main;
