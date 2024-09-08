/** API 연동 관련 모듈, 변수 가져오기 */
import { AxiosError } from 'axios';
import { AxiosInstance, BASE_URL } from '../../../shared/api/axiosInstance.ts';

// API 연동 타입
import { URLRecruitmentStatusURL, GetParamsRecruitmentStatusType } from "./careerRecruitmentsStatusType.ts"

// GET API 연동, 응답
export const getCareerList = async ({ userId, page }: GetParamsRecruitmentStatusType) => {
  try {
    const response = await AxiosInstance.get(`${BASE_URL}${URLRecruitmentStatusURL}`, {
      params: { userId, page }, // 쿼리 파라미터로 userId와 page 전달
    });
    return response.data; // API의 응답 데이터를 반환
  } catch (error) {
    console.error('유저의 채용 일정 리스트를 가져오는 중 오류 발생:', error);
    throw error;
  }
};


