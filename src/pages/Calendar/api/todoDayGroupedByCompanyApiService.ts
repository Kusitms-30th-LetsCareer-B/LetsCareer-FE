/** API 연동 관련 모듈, 변수 가져오기 */
import { AxiosError } from 'axios';
import { AxiosInstance, BASE_URL } from '../../../shared/api/axiosInstance.ts';

// API 연동 타입
import { TodoDayGroupedByCompany_URL, GetTodoListDayGroupedByCompanyParamsType } from "./todoDayGroupedByCompanyType.ts"


/** 조회 */
// GET 요청 및 응답받기 (백엔드와 API 연동)
export const getTodoListDayGroupedByCompany = async ({ userId, date }: GetTodoListDayGroupedByCompanyParamsType) => {
  try {
    const response = await AxiosInstance.get(`${BASE_URL}${TodoDayGroupedByCompany_URL}`, 
      // 쿼리 파라미터로 userId, date 전달
      {
        params: { userId, date },
      }
    );
    
    // 백엔드 서버로부터 API의 응답 데이터 받은 후 반환
    return response.data;

  } catch (error) {
    console.error(`캘린더 ${date} 날짜의 투두 리스트를 가져오는 중 오류 발생:`, error);
    throw error;
  }
};