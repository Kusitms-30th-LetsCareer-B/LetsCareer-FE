/** API 연동 관련 모듈, 변수 가져오기 */
import { AxiosError } from "axios";
import { AxiosInstance, BASE_URL } from "../../../shared/api/axiosInstance.ts";

// API 연동 타입
import {
  RecruitmentStatus_URL,
  GetParamsRecruitmentStatusType,
} from "./careerRecruitmentsStatusType.ts";

/** 조회 */
// GET 요청 및 응답받기 (백엔드와 API 연동)
export const getCareerList = async ({
  userId,
  page,
}: GetParamsRecruitmentStatusType) => {
  try {
    const response = await AxiosInstance.get(
      `${BASE_URL}${RecruitmentStatus_URL}`,
      {
        // 쿼리 파라미터로 userId와 page 전달
        params: { userId, page },
      },
    );

    // 백엔드 서버로부터 API의 응답 데이터 받은 후 반환
    return response.data;
  } catch (error) {
    console.error("유저의 채용 일정 리스트를 가져오는 중 오류 발생:", error);
    throw error;
  }
};
