/** 메인 홈: 채용 일정 종류별 현황 개수 */
export const StatusStageNum_URL = "/statuses/stage";

/** API Type */
// GET 파라미터
export interface GetParamsStatusStageNumType {
    userId: number;
}

// GET 요청
export interface GetRequestStatusStageNumType {
    total: number;
    document: number;
    interview: number;
    other: number;
}