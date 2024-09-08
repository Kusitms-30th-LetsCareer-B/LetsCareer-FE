export const URLCalendarMonthRecruitTodo = "/calendars/recruitment";

/** API Type */
// GET 파라미터
export interface GetParamsCalendarMonthRecruitTodoType {
    userId: number;
    year: string;
    month: string;
};

// GET 요청
export interface GetRequestCalendarMonthRecruitTodoType {
    personalScheduleId: number;
    date: Date;
    contents: string;
}