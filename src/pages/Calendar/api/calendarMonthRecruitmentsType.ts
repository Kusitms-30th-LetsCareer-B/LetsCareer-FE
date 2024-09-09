/** 월별 채용 일정 */
export const CalendarMonthRecruitments_URL = "/calendars/recruitment";

/** API Type */
// GET 파라미터
export interface GetParamsCalendarMonthRecruitmentsType {
    userId: number;
    year: string;
    month: string;
};

// GET 요청
export interface GetRequestCalendarMonthRecruitmentsType {
    scheduleId: number;
    date: Date;
    filter: string
    companyName: string;
}