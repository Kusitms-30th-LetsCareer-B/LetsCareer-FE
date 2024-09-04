// src/hooks/useCalendar.tsx
import { useState } from "react";

const useDatePicker = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // DatePicker 열림/닫힘 상태
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 선택된 날짜 상태

  const handleOpenDatePicker = () => {
    setIsDatePickerOpen(true); // DatePicker 열기
  };

  const handleCloseDatePicker = () => {
    setIsDatePickerOpen(false); // DatePicker 닫기
  };

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date); // 선택된 날짜 설정
    setIsDatePickerOpen(false); // DatePicker 닫기
  };

  return {
    isDatePickerOpen,
    selectedDate,
    handleOpenDatePicker,
    handleCloseDatePicker,
    handleDateSelected,
  };
};

export default useDatePicker;
