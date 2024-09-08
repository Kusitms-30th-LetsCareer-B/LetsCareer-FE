/** API 연동 관련 모듈, 변수 가져오기 */
import { AxiosError } from "axios";
import { AxiosInstance, BASE_URL } from "../../../shared/api/axiosInstance";

// 채용 일정 등록 API 함수
export const registerRecruitmentSchedule = async (
  userId: number,
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
    const response = await AxiosInstance.post(`${BASE_URL}/recruitments`, {
      userId,
      ...scheduleData,
    });
    return response.data;
  } catch (error) {
    console.error("채용 일정 등록 중 오류 발생:", error);
    throw error;
  }
};

// 기업 일정 가져오기 API 함수
export const getRecruitmentSchedules = async (userId: number) => {
  try {
    const response = await AxiosInstance.get(`${BASE_URL}/recruitments`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("채용 일정 목록 가져오기 중 오류 발생:", error);
    throw error;
  }
};

// 일정 완료 상태 업데이트 API 함수
export const updateCompletedStatus = async (
  recruitmentId: number,
  updatedCompleted: boolean[],
) => {
  try {
    const response = await AxiosInstance.post(
      `${BASE_URL}/recruitments/${recruitmentId}/update-completed`,
      {
        completed: updatedCompleted,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Completed 상태 업데이트 중 오류 발생:", error);
    throw error;
  }
};
