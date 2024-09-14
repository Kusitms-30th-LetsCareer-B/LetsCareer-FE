/** API 연동 관련 모듈, 변수 가져오기 */
import { AxiosError } from 'axios';
import { AxiosInstance, BASE_URL } from '../../../shared/api/axiosInstance.ts';

// API 연동 타입
import { CalendarMonthPersonalWorks_URL, 
         GetCalendarMonthPersonalWorksParamsType,
         PostCalendarMonthPersonalWorksParamsType,
         PostCalendarMonthPersonalWorksRequestType} from "./calendarMonthPersonalWorksType.ts"


/** 백엔드와 API 연동 */
// 조회
// GET 요청 및 응답받기
export const getCalendarMonthPersonalWorksList = async ({ userId, year, month }: GetCalendarMonthPersonalWorksParamsType) => {
  try {
    const response = await AxiosInstance.get(`${BASE_URL}${CalendarMonthPersonalWorks_URL}`, 
      // 쿼리 파라미터 전달
      {
        params: { userId, year, month },
      }
    );

    // 백엔드 서버로부터 API의 응답 데이터 받은 후 리턴
    return response.data;
    
  } catch (error) {
    // 이 부분은 나중에 errorHandler.ts 만들어서 에러별로 다르게 처리 가능
    console.error(`캘린더 ${year}년 ${month}월 투두 리스트를 가져오는 중 오류 발생:`, error);
    // 에러를 반환해서(던져서) 컴포넌트에서 처리해도 됨
    throw error;
  }
};


// 추가
// POST 요청 및 응답받기 (백엔드와 API 연동)
export const postCalendarPersonalWorksList = async (
  {userId}: PostCalendarMonthPersonalWorksParamsType,
  {date, content}: PostCalendarMonthPersonalWorksRequestType) => {
  try {
    const response = await AxiosInstance.post(`${BASE_URL}${CalendarMonthPersonalWorks_URL}`, 
      // Request Data 전달
      {
        date,
        content,
      },
      // 쿼리 파라미터 전달
      {
        params: { userId },
      }
    );
    
    // 백엔드 서버로부터 API의 응답 데이터 받은 후 리턴
    return response.data;

  } catch (error) {
    // 이 부분은 나중에 errorHandler.ts 만들어서 에러별로 다르게 처리 가능 // handleApiError(error as AxiosError);
    console.error(`캘린더 개인 일정 리스트를 추가하는 중 오류 발생:`, error);
    
    // 에러를 반환해서(던져서) 컴포넌트에서 처리해도 됨
    throw error;
  }
};


