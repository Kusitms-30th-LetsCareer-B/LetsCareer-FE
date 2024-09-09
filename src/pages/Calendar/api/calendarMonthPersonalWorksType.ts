/** 월별 개인 일정 */
export const CalendarMonthPersonalWorks_URL = "/calendars/personal";

/** API Type */
// GET 파라미터
export interface GetParamsCalendarMonthPersonalWorksType {
  userId: number;
  year: string;
  month: string;
}

// GET 요청
export interface GetRequestCalendarMonthPersonalWorksType {
  personalScheduleId: number;
  date: Date;
  content: string;
}

// POST 파라미터
export interface PostParamsCalendarMonthPersonalWorksType {
  userId: number;
}

// POST 요청
export interface PostRequestCalendarMonthPersonalWorksType {
  date: Date;
  content: string;
}

export interface PostCalendarMonthPersonalWorksType
  extends PostParamsCalendarMonthPersonalWorksType,
    PostRequestCalendarMonthPersonalWorksType {}

// DELETE 파라미터

// DELETE 요청
