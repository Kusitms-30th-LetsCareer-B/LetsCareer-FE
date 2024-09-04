// 컴포 파라미터(props) 타입 정의
interface TodoListProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

// TodoList 컴포넌트
const useTodoList = ({selectedDate, setSelectedDate}: TodoListProps) => {
  
  // 이전 일자로 이동하는 함수
  const handlePrevDay = () => {
    if (selectedDate) {
      const prevDay = new Date(selectedDate);
      prevDay.setDate(selectedDate.getDate() - 1);
      setSelectedDate(prevDay);
    }
  };

  // 다음 일자로 이동하는 함수
  const handleNextDay = () => {
    if (selectedDate) {
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);
      setSelectedDate(nextDay);
    }
  };

  

  // 날짜 형식을 'YYYY.MM.DD'로 포맷팅하는 함수
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };


  return {
    handlePrevDay,
    handleNextDay,
    formatDate
  };
};

export default useTodoList;
