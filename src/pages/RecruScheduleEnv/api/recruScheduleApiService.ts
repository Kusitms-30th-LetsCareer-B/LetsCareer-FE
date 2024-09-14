/** API 연동 관련 모듈, 변수 가져오기 */
import { AxiosError } from "axios";
import { AxiosInstance, BASE_URL } from "../../../shared/api/axiosInstance";

import { Recruitmnets_URL, PostRecruScheduleParamsType, PostRecruScheduleRequestType } from "./recruScheduleType";


// 채용 일정 등록
// POST 요청 및 응답받기
export const postRecruSchedule = async (
  { userId }: PostRecruScheduleParamsType, 
  { companyName, isFavorite, task, isRemind, announcementUrl, stageStartDate, stageEndDate }: PostRecruScheduleRequestType) => {
  try {
    const response = await AxiosInstance.post(`${BASE_URL}${Recruitmnets_URL}`,
      // Request Data 전달
      { 
        companyName, isFavorite, task, isRemind, announcementUrl, stageStartDate, stageEndDate
      },
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
    console.error("채용 일정 등록 중 오류 발생:", error);
    throw error;
  }
};
