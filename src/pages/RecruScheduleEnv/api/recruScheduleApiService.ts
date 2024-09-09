/** API 연동 관련 모듈, 변수 가져오기 */
import { AxiosError } from "axios";
import { AxiosInstance, BASE_URL } from "../../../shared/api/axiosInstance";

import axios from "axios";

// 채용 일정 등록 API
export const registerSchedule = async (
  userId: number, // URL 파라미터로 전달할 userId
  scheduleData: {
    companyName: string;
    isFavorite: boolean;
    task: string;
    isRemind: boolean;
    announcementUrl: string;
    stageStartDate: string;
    stageEndDate: string;
  },
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/recruitments`,
      scheduleData,
      {
        params: { userId }, // userId를 쿼리 파라미터로 전달
      },
    );
    return response.data; // 서버에서 받은 응답 데이터 반환
  } catch (error) {
    console.error("채용 일정 등록 중 오류 발생:", error);
    throw error;
  }
};
