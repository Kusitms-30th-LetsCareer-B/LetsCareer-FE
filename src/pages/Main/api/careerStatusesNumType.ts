/** 메인 홈: 채용 일정 상태별 현황 개수 */
export const StatusNum_URL = "/statuses";

/** API Type */
// GET 파라미터
export interface GetParamsStatusNumType {
    userId: number;
}

// GET 요청
export interface GetRequestStatusNumType {
    total: number;
    progress: number;
    passed: number;
    failed: number;
}