/** 메인 홈: 총 채용 일정 현황 */
export const RecruitmentStatus_URL = "/recruitments";

/** API Type */
// GET 파라미터
export interface GetParamsRecruitmentStatusType {
  userId: number;
  page: string;
}

// GET 요청
export interface GetRequestRecruitmentStatusType {
  recruitmentId: number;
  companyName: string;
  task: string;
  stageName: string;
  status: string;
  endDate: string;
  daysUntilEnd: number;
}
