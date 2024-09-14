/** 기업 채용 일정 */
export const Recruitmnets_URL = "/recruitments";


/** API Types */

// POST 파라미터
export interface PostRecruScheduleParamsType {
  userId: number;
};

// POST 요청:  백엔드에 추가할 데이터
export interface PostRecruScheduleRequestType {
  companyName: string;
  isFavorite: boolean;
  task: string;
  isRemind: boolean;
  announcementUrl: string;
  stageStartDate: string;
  stageEndDate: string;
}

// POST 응답:  null 값을 응답받음
