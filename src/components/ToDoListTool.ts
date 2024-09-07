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


/** Date 컴포 형변환 함수 (날짜 형식 포맷팅 함수) */
// 형식: 2024년 09월
export const formatDate1 = (date: Date) => {
    const months = [
      '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'
    ];
    const month = months[date.getMonth()]; // 월을 배열에서 한국어로 변환
    const day = date.getDate(); // 일자 추출
    return `${month} ${day}일`;
};


// 형식: YYYY.MM.DD
export const formatDate2 = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };
