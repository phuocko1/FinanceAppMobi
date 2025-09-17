// src/screens/Main.tsx
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomBar from '../components/BottomTabBar';
import MainScreenStyles from '../styles/MainScreenStyles';
import {
  expenseCategories,
  handleCategoryPress,
  incomeCategories,
} from '../utils/Category';
import {
  formatDay,
  formatNumber,
  goToNextDay,
  goToPreviousDay,
} from '../utils/FormatUtils';

const Main = ({ route }: any) => {
  const [isIncome, setIsIncome] = useState(false);
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('0');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'needs' | 'wants' | 'save'>('needs');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [initialBalance, setInitialBalance] = useState<number>(0);

  // Lấy số dư ban đầu từ route
  useEffect(() => {
    if (route.params?.initialBalance) {
      setInitialBalance(route.params.initialBalance);
    }
  }, [route.params]);

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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={MainScreenStyles.container}>
        {/* Header: Hiển thị số dư ban đầu */}
        <View style={[MainScreenStyles.header, { marginTop: 0 }]}>
          <Text style={[MainScreenStyles.tabText, { fontSize: 16, fontWeight: '600' }]}>
            Số dư ban đầu: {formatNumber(initialBalance.toString())} đ
          </Text>
        </View>

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
              <Icon name="chevron-left" size={24} color="#FF9800" />
            </TouchableOpacity>
            <Text style={MainScreenStyles.dateText}>{formatDay(currentDate)}</Text>
            <TouchableOpacity
              onPress={() => setCurrentDate(goToNextDay(currentDate))}
              style={MainScreenStyles.arrowButton}
            >
              <Icon name="chevron-right" size={24} color="#FF9800" />
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
                    <Icon name={cat.icon} size={24} color="#FF9800" />
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

      {/* Bottom bar */}
      <BottomBar
        onTabPress={(tab) => {
          if (tab === 'home') alert('Trang chủ');
          if (tab === 'calendar') alert('Mở lịch');
          if (tab === 'stats') alert('Mở thống kê');
          if (tab === 'settings') alert('Mở cài đặt');
        }}
      />
    </View>
  );
};

export default Main;