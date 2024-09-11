/** 개인 일정 조작 */
export const PersonalSchedule_URL = "/calendars/personal";
export const PersonalDateSchedule_URL = "/calendars/personal/date";

/** API Types */
/** 전체 월별 개인일정 조회 */
export interface GetPersonalScheduleParamsType {
    userId: number;
    year: string;
    month: string;
}

// GET 응답:  백엔드로부터 받을 데이터
export interface GetPersonalScheduleResponseType {
    personalScheduleId: number;
    date: string;
    content: string;
}


/** 특정 날짜의 개인일정 조회 */
// GET 파라미터
export interface GetPersonalDateScheduleParamsType {
    userId: number;
    date: string;
}

// GET 응답:  백엔드로부터 받을 데이터
export interface GetPersonalDateScheduleResponseType {
    personalScheduleId: number;
    date: string;
    content: string;
}



/** 개인일정 생성 */
// POST 파라미터
export interface PostPersonalScheduleParamsType {
    userId: number;
};

// 개인 일정 생성
// POST 요청:  백엔드에 추가할 데이터
export interface PostPersonalScheduleRequestType {
    date: string;
    content: string;
}

// POST 응답:  null 값을 응답받음


/** 특정 개인일정 삭제 */
// DELETE 파라미터
export interface DeletePersonalScheduleParamsType {
    personalScheduleId: number;
}

// DELETE 응답:  null 값을 응답받음



/** 특정 개인일정 수정 */
// PATCH 파라미터
export interface UpdatePersonalScheduleParamsType {
    personalScheduleId: number;  // 수정할 개인일정 ID
}

// PATCH 요청: 수정할 데이터를 담는 타입
export interface UpdatePersonalScheduleRequestType {
    content: string;  // 개인일정 내용
}

// PATCH 응답:  null 값을 응답받음
