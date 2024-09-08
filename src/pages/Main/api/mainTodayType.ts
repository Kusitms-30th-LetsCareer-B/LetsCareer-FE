export const URLMainTodayURL = "/todos/groupedByCompany";

/** 메인 홈, 채용 일정 현황 API Type */
// GET 파라미터
export interface GetParamsMainTodayType {
    userId: number;
    date: Date;
}

// GET 요청
export interface GetRequestMainTodayType {
    companyName: string;
    todos: Todo[];
}
export interface Todo {
    todoId: number;
    content: string;
    isCompleted: boolean;
    date: string;
    recruitmentId: number;
    isRoutine: boolean;
  }