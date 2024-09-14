/** API 연동 관련 모듈, 변수 가져오기 */
import { AxiosError } from 'axios';
import { AxiosInstance, BASE_URL } from './axiosInstance.ts';

// API 연동 타입
import { Routines_URL, 
         PostRoutineParamsType, PostRoutineRequestType,
         GetRoutineByIdParamsType, GetRoutineByIdResponseType,
         DeleteRoutineByIdParamsType, 
         UpdateRoutineByIdParamsType, UpdateRoutineRequestType
 } from "./routinesType.ts"



/** 백엔드와 API 연동 */

// 조회
// GET 요청 및 응답받기
export const getRoutineById = async ({ routineId }: GetRoutineByIdParamsType) => {
  try {
    const response = await AxiosInstance.get(`${BASE_URL}${Routines_URL}/${routineId}`,
      // 쿼리 파라미터 설정:  routineId 전달
      {
        params: {
          routineId
        },
      }
    );
    
    // 백엔드 서버로부터 API의 응답 데이터 받은 후 리턴
    return response.data;

  } catch (error) {
    console.error(`루틴 ID ${routineId}를 조회하는 중 오류 발생:`, error);
    throw error;
  }
};


// 추가
// POST 요청 및 응답받기
export const postRoutine = async (
  { userId, recruitmentId }: PostRoutineParamsType, 
  { content, startDate, endDate }: PostRoutineRequestType) => {
  try {
    const response = await AxiosInstance.post(`${BASE_URL}${Routines_URL}`, 
      // Request Data 전달
      {
        content,
        startDate,
        endDate,
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
    console.error('루틴 생성 중 오류 발생:', error);
    throw error;
  }
};


// 삭제
// DELETE 요청 및 응답받기: 특정 루틴 삭제
export const deleteRoutineById = async ({ routineId }: DeleteRoutineByIdParamsType) => {
  try {
    const response = await AxiosInstance.delete(`${BASE_URL}${Routines_URL}/${routineId}`,
      // 쿼리 파라미터 설정:  routineId 전달
      {
        params: {
          routineId
        },
      }
    );
    
    // 백엔드 서버로부터 API의 응답 데이터 받은 후 리턴
    return response.data;

  } catch (error) {
    console.error(`루틴 ID ${routineId}를 삭제하는 중 오류 발생:`, error);
    throw error;
  }
};


// 수정
// PATCH 요청 및 응답받기: 특정 루틴 수정
export const updateRoutineById = async ({ routineId, content, startDate, endDate }: UpdateRoutineByIdParamsType & UpdateRoutineRequestType) => {
  try {
    const response = await AxiosInstance.patch(`${BASE_URL}${Routines_URL}/${routineId}`, 
      // Request Data 전달
      {
        content,
        startDate,
        endDate,
      },
      // 쿼리 파라미터 설정:  routineId 전달
      {
        params: {
          routineId,
        },
      }
    );

    // 백엔드 서버로부터 API의 응답 데이터 받은 후 리턴
    return response.data;

  } catch (error) {
    console.error(`루틴 ID ${routineId}를 수정하는 중 오류 발생:`, error);
    throw error;
  }
};