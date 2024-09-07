/** API 연동 관련 모듈, 변수 가져오기 */
import { AxiosError } from 'axios';
import { AxiosInstance, BASE_URL } from '../../../shared/api/axiosInstance';


/** 에러 처리 관련 */
import { handleApiError } from './errorHandler';


/** API Type 관련 */
import {
  URL,
  GetPersonalScheduleParams,
  GetPersonalScheduleResponse,
  PostPersonalScheduleRequest,
  PostPersonalScheduleResponse,
} from './personalType';



/** API 호출 모듈화: 엔드포인트 2가지 */
// Function to fetch personal schedules (GET request)
export const getPersonalSchedules = async (
  params: GetPersonalScheduleParams
): Promise<GetPersonalScheduleResponse> => {
  try {
    const response = await AxiosInstance.get<GetPersonalScheduleResponse>(`${BASE_URL}${URL}`, { params });
    return response.data;
    
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error; // Re-throw error to handle in the component
  }
};

// Function to add a personal schedule (POST request)
export const addPersonalSchedule = async (
  userId: number,
  scheduleData: PostPersonalScheduleRequest
): Promise<PostPersonalScheduleResponse> => {
  try {
    const response = await AxiosInstance.post<PostPersonalScheduleResponse>(
      `${BASE_URL}${URL}`,
      scheduleData,
      {
        params: { userId }, // userId를 쿼리 파라미터로 전달
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error; // 에러를 다시 던져서 컴포넌트에서 처리할 수 있게 함
  }
};
