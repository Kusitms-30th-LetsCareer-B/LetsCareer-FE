/** 메인 홈: 총 채용 일정 현황 */
export const RecruitmentStatus_URL = "/recruitments";


/** API Type */
// GET 파라미터
export interface GetRecruitmentStatusParamsType {
  userId: number;
  page: string;
}

// GET 응답:  백엔드로부터 받을 데이터
export interface GetRecruitmentStatusResponseType {
  recruitmentId: number;
  companyName: string;
  task: string;
  stageName: string;
  status: string;
  endDate: string;
  daysUntilEnd: number;
}
