/** 월별 개인 일정 */
export const CalendarMonthPersonalWorks_URL = "/calendars/personal";

/** API Type */
// GET 파라미터
export interface GetCalendarMonthPersonalWorksParamsType {
    userId: number;
    year: string;
    month: string;
};

// GET 응답:  백엔드로부터 받을 데이터
export interface GetCalendarMonthPersonalWorksResponseType {
    personalScheduleId: number;
    date: Date;
    content: string;
}


// POST 파라미터
export interface PostCalendarMonthPersonalWorksParamsType {
    userId: number;
};


// POST 요청
export interface PostCalendarMonthPersonalWorksRequestType {
    date: Date;
    content: string;
}


// DELETE 파라미터


// DELETE 요청