/** 월별 채용 일정 */
export const CalendarMonthRecruitments_URL = "/calendars/recruitment";

/** API Type */
// GET 파라미터
export interface GetCalendarMonthRecruitmentsParamsType {
    userId: number;
    year: string;
    month: string;
};

// GET 요청: 없음

// GET 응답:  백엔드로부터 받을 데이터
export interface GetCalendarMonthRecruitmentsResponseType {
    scheduleId: number;
    date: Date;
    filter: string
    companyName: string;
    recruitmentId: number;
}