/** 메인 홈: 채용 일정 종류별 현황 개수 */
export const StatusStageNum_URL = "/statuses/stage";

/** API Type */
// GET 파라미터
export interface GetStatusStageNumParamsType {
    userId: number;
}

// GET 응답:  백엔드로부터 받을 데이터
export interface GetStatusStageNumResponseType {
    total: number;
    document: number;
    interview: number;
    other: number;
}