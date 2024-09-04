import React, { useMemo, useCallback } from 'react';
import checkedBox from "../assets/checkSquareChecked.png"
import blankedBox from "../assets/checkSquareBlanked.png"

// 컴포 파라미터(props) 타입 정의
interface TodoListProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

// TodoList 컴포넌트
export const useTodoList = ({selectedDate, setSelectedDate}: TodoListProps) => {

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

  
  /**
   * 특정 id와 index에 따라 이미지를 반환하고 상태를 토글하는 커스텀 훅
   * @param id - 아이디
   * @param index - 현재 스케줄의 인덱스
   * @param completed - 완료 상태 배열
   * @param setCompleted - 완료 상태 배열을 업데이트하는 함수
   * @returns object - 이미지 경로와 상태를 토글하는 함수
   */
  const useCompletedImage = (
    id: number,
    index: number,
    completed: boolean[],
    setCompleted: (newCompleted: boolean[]) => void
  ) => {

    // completed 상태에 따라 이미지를 선택
    const imageSrc = useMemo(() => {
      return completed[index] ? checkedBox : blankedBox;
    }, [id, index, completed]);

    // 상태를 반전시키는 함수
    const toggleCompleted = useCallback(() => {
      const newCompleted = [...completed];
      newCompleted[index] = !newCompleted[index];
      setCompleted(newCompleted);
    }, [id, index, completed, setCompleted]);
    
    // 이미지와 토글 여부를 반환
    return { imageSrc, toggleCompleted };
  };


  return {
    handlePrevDay,
    handleNextDay,
    formatDate,
    useCompletedImage
  };
};



// TodoListCounting 컴포넌트
export const useTodoCounting = () => {
  // 커스텀 훅 정의
    /**
     * 특정 회사의 완료되지 않은 스케줄 개수를 반환하는 훅
     * @param completed - 스케줄의 완료 상태를 나타내는 boolean 배열
     * @returns 완료되지 않은 스케줄의 개수
     */
    const useCountIncomplete = (completed: boolean[]) => {
      const countIncomplete = useMemo(() => {
      return completed.filter((item) => !item).length;
      }, [completed]);

      return countIncomplete;
  };



  /**
   * 모든 회사의 미완료 스케줄 수의 총합을 계산하는 훅
   * @param companies - 회사 리스트
   * @returns totalCount - 미완료 스케줄의 총합
   */
  const useTotalIncompleteCount = (companies: Company[]) => {
    // useMemo를 사용하여 companies가 변경될 때만 계산되도록 최적화
    const totalCount = useMemo(() => {
      return companies.reduce((acc, company) => {
        const incompleteCount = useCountIncomplete(company.completed);
        return acc + incompleteCount;
      }, 0);
    }, [companies]);

    return totalCount;
  };


  return {
    useCountIncomplete,
    useTotalIncompleteCount
  };
};

