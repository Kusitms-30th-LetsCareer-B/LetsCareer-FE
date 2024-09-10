/** 개인 일정 조작 */
export const PersonalSchedule_URL = "/calendars/personal";


/** API Types */
/*
// GET 파라미터
export interface GetPersonalScheduleParamsType {
    
}

// GET 응답:  백엔드로부터 받을 데이터
export interface GetPersonalScheduleResponseType {
    
}
*/

// POST 파라미터
export interface PostPersonalScheduleParamsType {
    userId: number;
    recruitmentId: number;  // 기업 ID
};

// 루틴 생성
// POST 요청:  백엔드에 추가할 데이터
export interface PostPersonalScheduleRequestType {
    content: string;
    startDate: string;
    endDate: string;
}

// POST 응답:  null 값을 응답받음


/** 특정 루틴 삭제 */
// DELETE 파라미터
export interface DeletePersonalScheduleParamsType {
    routineId: number;  // 루틴 ID
}

// DELETE 응답:  null 값을 응답받음



/** 특정 루틴 수정 */
// PATCH 파라미터
export interface UpdatePersonalScheduleParamsType {
    routineId: number;  // 루틴 ID
}

// PATCH 요청: 수정할 데이터를 담는 타입
export interface UpdatePersonalScheduleRequestType {
    content: string;    // 루틴 내용
    startDate: string;  // 시작 날짜
    endDate: string;    // 종료 날짜
}

// PATCH 응답:  null 값을 응답받음
