// app/styles/MainScreenStyles.ts
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

// Hàm scale theo chiều ngang
const scale = (size: number) => (width / 375) * size; 
// 375 = width chuẩn iPhone 11 → lấy làm chuẩn scale

const MainScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: scale(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(16),
    gap: scale(12),
  },
  tabButton: {
    flex: 1,
    paddingVertical: scale(12),
    borderRadius: scale(12),
    alignItems: 'center',
    borderWidth: 1,
  },
  tabActive: {
    backgroundColor: '#4CAF50', // đổi từ cam sang xanh lá
    borderColor: '#4CAF50',
  },
  tabInactive: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
  },
  tabText: {
    fontSize: scale(16),
    fontWeight: '600',
  },
  tabTextActive: { color: '#fff' },
  tabTextInactive: { color: '#555' },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  label: {
    width: scale(80),
    fontSize: scale(16),
    fontWeight: '500',
    color: '#333',
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(12),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: scale(8),
    backgroundColor: '#fff',
  },
  arrowButton: { padding: scale(4) },
  dateText: { fontSize: scale(16), color: '#333' },

  input: {
    flex: 1,
    height: scale(40),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: scale(8),
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
    fontSize: scale(16),
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: scale(8),
    backgroundColor: '#fff',
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
  },
  amountInput: {
    flex: 1,
    fontSize: scale(16),
    textAlign: 'right',
  },
  currency: { fontSize: scale(16), color: '#666' },

  categorySection: { marginTop: scale(10) },
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#333',
    marginBottom: scale(12),
    textAlign: 'left',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(12),
  },
  categoryButton: {
    width: (width - scale(64)) / 3, // chia 3 cột auto fit màn hình
    padding: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: scale(8),
    backgroundColor: '#fff',
  },
  selectedCategory: {
    borderColor: '#4CAF50', // đổi từ cam sang xanh lá
    backgroundColor: '#E8F5E9', // xanh lá nhạt thay vì #FFF8E1
  },
  categoryLabel: {
    fontSize: scale(14),
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    marginTop: scale(6),
  },
  submitButton: {
    marginTop: scale(30),
    backgroundColor: '#4CAF50', // đổi từ cam sang xanh lá
    padding: scale(16),
    borderRadius: scale(12),
    alignItems: 'center',
    marginBottom: scale(80),
  },
  submitButtonText: {
    color: '#fff',
    fontSize: scale(18),
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
  },
});

export default MainScreenStyles;
