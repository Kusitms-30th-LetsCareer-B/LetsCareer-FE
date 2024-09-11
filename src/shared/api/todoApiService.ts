/** API 연동 관련 모듈, 변수 가져오기 */
import { AxiosError } from 'axios';
import { AxiosInstance, BASE_URL } from './axiosInstance.ts';

// API 연동 타입
import { Todos_URL, TodosCheck_URL,
    GetTodoByRecruitmentIdParamsType, GetTodoByRecruitmentIdResponseType, 
    PostTodoByRecruitmentIdParamsType, PostTodoByRecruitmentIdRequestType,
    DeleteTodoParamsType,
    UpdateTodoContentsParamsType, UpdateTodoContentsRequestType,
    UpdateTodoCheckParamsType    
 } from "./todoType.ts"



/** 백엔드와 API 연동 */
// 특정 기업의 투두 조회
// GET 요청 및 응답받기
export const getTodosById = async ({ recruitmentId, date }: GetTodoByRecruitmentIdParamsType) => {
    try {
        const response = await AxiosInstance.get(`${BASE_URL}${Todos_URL}`,
          // 쿼리 파라미터 설정:  recruitmentId, dste 전달
          {
            params: {
              recruitmentId,
              date,
            },
          }
        );
      
      // 백엔드 서버로부터 응답 데이터 반환
      return response.data;
  
    } catch (error) {
      console.error(`기업 ID ${recruitmentId}의 투두 리스트를 조회하는 중 오류 발생:`, error);
      throw error;
    }
};
  

// 추가
// POST 요청 및 응답받기
export const postTodo = async (
  { userId, recruitmentId }: PostTodoByRecruitmentIdParamsType, 
  { date, content }: PostTodoByRecruitmentIdRequestType) => {
  try {
    const response = await AxiosInstance.post(`${BASE_URL}${Todos_URL}`, 
      // Request Data 전달
      {
        date,
        content,
      },
      // 쿼리 파라미터 설정:  userId, recruitmentId 전달
      {
        params: {
          userId,
          recruitmentId,
        },
      }
    );
    
    
    // 백엔드 서버로부터 API의 응답 데이터 받은 후 리턴
    return response.data;

  } catch (error) {
    console.error('투두 생성 중 오류 발생:', error);
    throw error;
  }
};




// 삭제
// DELETE 요청 및 응답받기: 특정 투두 삭제
export const deleteTodo = async ({ todoId }: DeleteTodoParamsType) => {
  try {
    const response = await AxiosInstance.delete(`${BASE_URL}${Todos_URL}/${todoId}`,
      // 쿼리 파라미터 설정:  todoId 전달
      {
        params: {
          todoId
        },
      }
    );
    
    // 백엔드 서버로부터 응답 데이터 반환
    return response.data;

  } catch (error) {
    console.error(`투두 ID ${todoId}를 삭제하는 중 오류 발생:`, error);
    throw error;
  }
};


// 수정
// PATCH 요청 및 응답받기: 특정 투두 내용 수정
export const updateTodoContent = async ({ todoId, content, date }: UpdateTodoContentsParamsType & UpdateTodoContentsRequestType) => {
  try {
    const response = await AxiosInstance.patch(`${BASE_URL}${Todos_URL}/${todoId}`,
      // Request Data 전달
      {
        content,
        date
      },
      // 쿼리 파라미터 설정:  todoId 전달
      {
        params: {
          todoId
        },
      }
    );
    // 백엔드 서버로부터 응답 데이터 반환
    return response.data;

  } catch (error) {
    console.error(`투두 ID ${todoId}를 수정하는 중 오류 발생:`, error);
    throw error;
  }
};


// PATCH 요청 및 응답받기: 특정 투두의 체크(완료/미완료) 여부 수정
export const updateTodoCheck = async ({ todoId }: UpdateTodoCheckParamsType) => {
  try {
    const response = await AxiosInstance.patch(`${BASE_URL}${Todos_URL}/${todoId}${TodosCheck_URL}`,
      // 쿼리 파라미터 설정:  todoId 전달
      {
        params: {
          todoId
        },
      }
    );
    // 백엔드 서버로부터 응답 데이터 반환
    return response.data;

  } catch (error) {
    console.error(`투두 ID ${todoId}의 체크 여부를 반대값으로 수정하는 중 오류 발생:`, error);
    throw error;
  }
};
