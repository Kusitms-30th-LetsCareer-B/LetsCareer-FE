// 채용 일정 Props 타입
export interface RecruitmentScheduleListProps {
  selectedDate: Date | null;  // Date 또는 null 허용
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;  // 상태 업데이트도 null 허용
}

// 개인 일정 Props 타입
export interface PersonalScheduleListProps {
    selectedDate: Date | null;  // Date 또는 null 허용
    setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;  // 상태 업데이트도 null 허용
}

// 투두리스트 Props 타입
export interface TodoListProps {
  //recruitmentId: number;
  selectedDate: Date | null;  // Date 또는 null 허용
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;  // 상태 업데이트도 null 허용
}