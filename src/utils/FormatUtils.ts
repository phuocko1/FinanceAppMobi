// utils/FormatUtils.ts

// Định dạng ngày: DD/MM/YYYY (Thứ)
export const formatDay = (date: Date) => {
  const days = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'];
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  const dayOfWeek = days[date.getDay()];
  return `${d}/${m}/${y} (${dayOfWeek})`;
};

// Chuyển sang ngày trước
export const goToPreviousDay = (currentDate: Date) =>
  new Date(currentDate.setDate(currentDate.getDate() - 1));

// Chuyển sang ngày tiếp theo
export const goToNextDay = (currentDate: Date) =>
  new Date(currentDate.setDate(currentDate.getDate() + 1));

// Định dạng số: 100000 -> 100.000
export const formatNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
