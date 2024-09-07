/** 이 훅은 MainTodoList와 CalendarTodoList 컴포에서 공용으로 사용 */
import React, { useMemo, useCallback } from 'react';
import checkedBox from "../assets/checkSquareChecked.png"
import blankedBox from "../assets/checkSquareBlanked.png"

// ToDoList 관련 Tools 임포트
import { RecruitmentScheduleListProps } from "../../components/ToDoListTool"


// TodoList 컴포넌트
export const useTodoList = ({selectedDate, setSelectedDate}: RecruitmentScheduleListProps) => {

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
    useCompletedImage
  };
};



// Company 인터페이스 정의
export interface Company {
  id: number; // 회사의 고유 ID
  name: string; // 회사 이름
  schedules: string[]; // 회사의 스케줄 목록
  completed: boolean[]; // 각 스케줄의 완료 상태를 나타내는 불리언 배열
}

// TodoListCounting 컴포넌트
// 커스텀 훅 정의
/**
 * 특정 회사의 완료되지 않은 스케줄 개수를 반환하는 훅
 * @param completed - 스케줄의 완료 상태를 나타내는 boolean 배열
 * @returns 완료되지 않은 스케줄의 개수
 */
// 특정 배열의 완료되지 않은 항목의 개수를 계산하는 훅
export const useCountIncomplete = (completed: boolean[]) => {
  const countIncomplete = useMemo(() => {
    return completed.filter((item) => !item).length;
  }, [completed]);

  return countIncomplete;
};

// 모든 회사의 미완료 스케줄 수의 총합을 계산하는 훅
export const useTotalCountIncomplete = (companies: Company[]) => {
  // Calculate incomplete counts for all companies outside useMemo
  const incompleteCounts = companies.map(company => useCountIncomplete(company.completed));

  // Use useMemo only for summing the incomplete counts
  const totalCount = useMemo(() => {
    return incompleteCounts.reduce((acc, count) => acc + count, 0);
  }, [incompleteCounts]);

  return totalCount;
};
