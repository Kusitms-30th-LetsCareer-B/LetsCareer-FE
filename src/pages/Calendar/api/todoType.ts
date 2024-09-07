export const URL = "/todos"
export const URLAllCompany = "/groupedByCompany"
export const URLCheck = "/check"
export const URLDelay = "/delay"


// 채용 일정 타입
/*
export interface RecruitmentlSchedule {
  recruitmentScheduleId: number;
  date: string;
  content: string;
}
*/

// Todo 타입 정의
export interface Todo {
  todoId: number;
  content: string;
  isCompleted: boolean;
  date: string;
  recruitmentId: number;
  isRoutine: boolean | null;
}

// GET /todos request parameters
export interface GetTodosParams {
  recruitmentId: number;
  date: string;
}

// GET /todos response type
export interface GetTodosResponse {
  code: number;
  message: string;
  data: {
    todos: Todo[];
  };
}

// POST /todos request body
export interface PostTodoRequest {
  date: string;
  content: string;
}

// POST /todos response type
export interface PostTodoResponse {
  code: number;
  message: string;
  data: null;
}

// GET /todos/groupedByCompany request parameters
export interface GetGroupedByCompanyParams {
  userId: number;
  date: string;
}

// GET /todos/groupedByCompany response type
export interface GetGroupedByCompanyResponse {
  code: number;
  message: string;
  data: {
    companyName: string;
    todos: Todo[];
  }[];
}

// DELETE /todos/{todoId} response type
export interface DeleteTodoResponse {
  code: number;
  message: string;
  data: null;
}

// PATCH /todos/{todoId} request body
export interface PatchTodoRequest {
  content: string;
  date: string;
}

// PATCH /todos/{todoId} response type
export interface PatchTodoResponse {
  code: number;
  message: string;
  data: null;
}

// PATCH /todos/{todoId}/check response type
export interface CheckTodoResponse {
  code: number;
  message: string;
  data: null;
}

// PATCH /todos/{todoId}/delay response type
export interface DelayTodoResponse {
  code: number;
  message: string;
  data: null;
}
