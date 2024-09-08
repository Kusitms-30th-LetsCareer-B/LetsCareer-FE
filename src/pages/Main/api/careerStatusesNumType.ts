export const URLStatusNumURL = "/statuses";

/** 메인 홈, 채용 일정 현황 API Type */
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