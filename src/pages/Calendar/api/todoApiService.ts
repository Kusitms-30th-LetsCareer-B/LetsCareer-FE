/** API 연동 관련 모듈, 변수 가져오기 */
import { AxiosError } from "axios";
import { AxiosInstance, BASE_URL } from "../../../shared/api/axiosInstance";

/** 에러 처리 관련 */
import { handleApiError } from "./errorHandler";
import {
  URL,
  URLAllCompany,
  URLCheck,
  URLDelay,
  GetTodosParams,
  GetTodosResponse,
  PostTodoRequest,
  PostTodoResponse,
  GetGroupedByCompanyParams,
  GetGroupedByCompanyResponse,
  DeleteTodoResponse,
  PatchTodoRequest,
  PatchTodoResponse,
  CheckTodoResponse,
  DelayTodoResponse,
} from "./todoType";

// GET /todos
export const getTodos = async (
  params: GetTodosParams,
): Promise<GetTodosResponse> => {
  try {
    const response = await AxiosInstance.get<GetTodosResponse>(
      `${BASE_URL}${URL}`,
      { params },
    );
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
};

// POST /todos
export const addTodo = async (
  userId: number,
  recruitmentId: string,
  todoData: PostTodoRequest,
): Promise<PostTodoResponse> => {
  try {
    const response = await AxiosInstance.post<PostTodoResponse>(
      `${BASE_URL}${URL}`,
      todoData,
      {
        params: { userId, recruitmentId },
      },
    );
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
};

// GET /todos/groupedByCompany
export const getGroupedByCompanyTodos = async (
  params: GetGroupedByCompanyParams,
): Promise<GetGroupedByCompanyResponse> => {
  try {
    const response = await AxiosInstance.get<GetGroupedByCompanyResponse>(
      `${BASE_URL}${URL}${URLAllCompany}`,
      { params },
    );
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
};

// DELETE /todos/{todoId}
export const deleteTodo = async (
  todoId: number,
): Promise<DeleteTodoResponse> => {
  try {
    const response = await AxiosInstance.delete<DeleteTodoResponse>(
      `${BASE_URL}${URL}/${todoId}`,
    );
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
};

// PATCH /todos/{todoId}
export const updateTodo = async (
  todoId: number,
  todoData: PatchTodoRequest,
): Promise<PatchTodoResponse> => {
  try {
    const response = await AxiosInstance.patch<PatchTodoResponse>(
      `${BASE_URL}${URL}/${todoId}`,
      todoData,
    );
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
};

// PATCH /todos/{todoId}/check
export const checkTodo = async (todoId: number): Promise<CheckTodoResponse> => {
  try {
    const response = await AxiosInstance.patch<CheckTodoResponse>(
      `${BASE_URL}${URL}/${todoId}${URLCheck}`,
    );
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
};

// PATCH /todos/{todoId}/delay
export const delayTodo = async (todoId: number): Promise<DelayTodoResponse> => {
  try {
    const response = await AxiosInstance.patch<DelayTodoResponse>(
      `${BASE_URL}${URL}/${todoId}${URLDelay}`,
    );
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
};
