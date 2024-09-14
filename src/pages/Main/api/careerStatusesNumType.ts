/** 메인 홈: 채용 일정 상태별 현황 개수 */
export const StatusNum_URL = "/statuses";

/** API Type */
// GET 파라미터
export interface GetStatusNumParamsType {
    userId: number;
}

// GET 응답:  백엔드로부터 받을 데이터
export interface GetStatusNumResponseType {
    total: number;
    progress: number;
    passed: number;
    failed: number;
}