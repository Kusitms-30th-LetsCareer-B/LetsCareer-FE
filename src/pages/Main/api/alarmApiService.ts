/** API 연동 관련 모듈, 변수 가져오기 */
import { AxiosError } from 'axios';
import { AxiosInstance, BASE_URL } from '../../../shared/api/axiosInstance.ts';

// API 연동 타입
import { Alarm_URL,
         GetAlarmParamsType } from "./alarmType.ts"


/** 백엔드와 API 연동 */
// GET 요청 및 응답받기
export const getAlarms = async ({ userId }: GetAlarmParamsType) => {
  try {
    const response = await AxiosInstance.get(`${BASE_URL}${Alarm_URL}`, 
      // 쿼리 파라미터 전달
      {
        params: { 
          userId
        },
      }
    );
    
    // 백엔드 서버로부터 API의 응답 데이터 받은 후 리턴
    return response.data;

  } catch (error) {
    console.error(`알림 리스트를 조회하는 중 오류 발생:`, error);
    throw error;
  }
};