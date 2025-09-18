// utils/Category.ts
export const handleCategoryPress = (
  categoryId: string,
  setSelectedCategory: (id: string) => void
) => {
  setSelectedCategory(categoryId);
};

// Danh mục tiền thu
export const incomeCategories = [
  { id: 'salary', label: 'Tiền lương', icon: 'attach-money', color: '#4CAF50' },
  { id: 'allowance', label: 'Tiền phụ cấp', icon: 'local-grocery-store', color: '#4CAF50' },
  { id: 'bonus', label: 'Tiền thưởng', icon: 'card-giftcard', color: '#4CAF50' },
  { id: 'side_income', label: 'Thu nhập phụ', icon: 'account-balance', color: '#4CAF50' },
  { id: 'investment', label: 'Đầu tư', icon: 'trending-up', color: '#4CAF50' },
  { id: 'other_income', label: 'Thu nhập tạm...', icon: 'group', color: '#4CAF50' },
  { id: 'edit_income', label: 'Chỉnh sửa >', icon: 'edit', color: '#4CAF50' },
];

// Danh mục tiền chi (50-30-20)
export const expenseCategories = {
  needs: [
    { id: 'food', label: 'Ăn uống', icon: 'restaurant' },
    { id: 'rent', label: 'Tiền nhà', icon: 'home' },
    { id: 'electricity', label: 'Tiền điện', icon: 'bolt' },
    { id: 'water', label: 'Tiền nước', icon: 'opacity' },
    { id: 'transport', label: 'Đi lại', icon: 'train' },
    { id: 'medical', label: 'Y tế', icon: 'medical-services' },
    { id: 'communication', label: 'Phí liên lạc', icon: 'phone' },
    { id: 'shopping', label: 'Chi tiêu', icon: 'local-grocery-store' },
  ],
  wants: [
    { id: 'clothing', label: 'Quần áo', icon: 'checkroom' },
    { id: 'beauty', label: 'Mỹ phẩm', icon: 'brush' },
    { id: 'entertainment', label: 'Phí giao lưu', icon: 'celebration' },
    { id: 'education', label: 'Giáo dục', icon: 'book' },
    { id: 'gift', label: 'Quà tặng', icon: 'card-giftcard' },
    { id: 'travel', label: 'Du lịch', icon: 'flight-takeoff' },
    { id: 'coffee', label: 'Cà phê', icon: 'local-cafe' },
    { id: 'movie', label: 'Phim ảnh', icon: 'movie' },
  ],
  save: [
    { id: 'emergency', label: 'Dự phòng', icon: 'shield' },
    { id: 'invest', label: 'Đầu tư', icon: 'trending-up' },
    { id: 'debt', label: 'Trả nợ', icon: 'attach-money' },
    { id: 'retire', label: 'Hưu trí', icon: 'account-balance' },
    { id: 'gift_save', label: 'Quà tặng', icon: 'card-giftcard' },
    { id: 'charity', label: 'Từ thiện', icon: 'favorite' },
    { id: 'other_save', label: 'Khác', icon: 'more-horiz' },
    { id: 'goal', label: 'Mục tiêu', icon: 'flag' },
  ],
};
