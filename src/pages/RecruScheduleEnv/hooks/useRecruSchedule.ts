// src/hooks/useCalendar.tsx
import { useState } from "react";

// 페이지 전환 이벤트
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../Path.ts";

const useRecruSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 선택된 날짜
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null); // 호버된 날짜

  // 페이지 전환 이벤트
  const navigate = useNavigate();

  // 달력에 표시할 날짜 배열 생성 함수
  // 현재 달력에 이전/다음 달 날짜 채움
  const getDates = () => {
    const dates = [];
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );
    const lastDayOfPrevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0,
    );

    // 첫 주를 이전 달의 마지막 날짜로 채우기
    for (let i = firstDayOfMonth.getDay() - 1; i >= 0; i--) {
      dates.push(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          lastDayOfPrevMonth.getDate() - i,
        ),
      );
    }

    // 현재 월의 날짜 채우기
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      dates.push(new Date(currentYear, currentMonth, i));
    }

    // 다음 달의 날짜를 채워서 달력을 완성
    const totalCells = 42; // 7x6 그리드(일단 6주로 채우기)
    const remainingCells = totalCells - dates.length;

    for (let i = 1; i <= remainingCells; i++) {
      const nextMonthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        i,
      );
      // 추가할 날짜가 다음 달 일요일이면 그만
      // 다음 달 한 주가 쓸데없이 추가됨.
      if (nextMonthDate.getDay() == 0) break;
      dates.push(nextMonthDate);
    }

    return dates;
  };

  // 달력에 표시할 현재 달 날짜 배열 생성 함수
  // 현재 달력에 이전/다음 달 날짜 안 채움
  const getCurrentDates = () => {
    const dates = [];
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );

    // 첫 주를 공백으로 채우기
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      dates.push(null);
    }

    // 현재 월의 날짜 채우기
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      dates.push(new Date(currentYear, currentMonth, i));
    }

    return dates;
  };

  // 이전 달로 이동하는 함수
  const handlePrevMonth = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  // 다음 달로 이동하는 함수
  const handleNextMonth = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  // 날짜 마우스 오버 핸들러
  const handleDateMouseOver = (date: Date | null) => {
    setHoveredDate(date);
  };

  // 날짜 마우스 아웃 핸들러
  const handleDateMouseOut = () => {
    setHoveredDate(null);
  };

  // 전체 일정 보기 이벤트 핸들러
  const handleAllSchedule = () => {
    // 전체 일정 보기 로직 추가
  };

  // 새 채용 일정 추가하기 이벤트 핸들러
  const handleNewSchedule = () => {
    // 새 일정 추가 로직 추가
    navigate(PATHS.RECRU_SCHEDULE_ENV_PATH);
  };

  return {
    currentDate,
    selectedDate,
    hoveredDate,
    getDates,
    getCurrentDates,
    handlePrevMonth,
    handleNextMonth,
    handleDateClick,
    handleDateMouseOver,
    handleDateMouseOut,
    handleAllSchedule,
    handleNewSchedule,
  };
};

export default useRecruSchedule;
