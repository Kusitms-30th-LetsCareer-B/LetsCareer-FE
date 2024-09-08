export const URLCalendarMonthPersonalTodo = "/calendars/personal";

/** API Type */
// GET 파라미터
export interface GetParamsCalendarMonthPersonalTodoType {
    userId: number;
    year: string;
    month: string;
};

// GET 요청
export interface GetRequestCalendarMonthPersonalTodoType {
    personalScheduleId: number;
    date: Date;
    contents: string;
}


// POST 파라미터
export interface PostParamsCalendarMonthPersonalTodoType {
    userId: number;
};


// POST 요청
export interface PostRequestCalendarMonthPersonalTodoType {
    date: Date;
    contents: string;
}


// DELETE 파라미터


// DELETE 요청