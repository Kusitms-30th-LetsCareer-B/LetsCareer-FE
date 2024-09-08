/** API 연동 관련 모듈, 변수 가져오기 */
import { AxiosError } from 'axios';
import { AxiosInstance, BASE_URL } from '../../../shared/api/axiosInstance.ts';

// API 연동 타입
import { URLCalendarMonthRecruitTodo, GetParamsCalendarMonthRecruitTodoType } from "./calendarMonthRecruitTodoType.ts"


// GET 응답, 백엔드와 API 연동
export const getResponseCalendarMonthRecruitTodoList = async ({ userId, year, month }: GetParamsCalendarMonthRecruitTodoType) => {
  try {
    const response = await AxiosInstance.get(`${BASE_URL}${URLCalendarMonthRecruitTodo}`, {
      params: { userId, year, month }, // 쿼리 파라미터로 userId와 date 전달
    });
    return response.data; // API의 응답 데이터를 반환

  } catch (error) {
    console.error(`캘린더 ${year}년 ${month}월 투두 리스트를 가져오는 중 오류 발생:`, error);
    throw error;
  }
};