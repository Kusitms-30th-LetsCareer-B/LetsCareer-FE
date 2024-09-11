/** API 연동 관련 모듈, 변수 가져오기 */
import { AxiosError } from 'axios';
import { AxiosInstance, BASE_URL } from '../../../shared/api/axiosInstance.ts';

// API 연동 타입
import { PersonalSchedule_URL, PersonalDateSchedule_URL, 
        GetPersonalScheduleParamsType, GetPersonalScheduleResponseType,
        GetPersonalDateScheduleParamsType, GetPersonalDateScheduleResponseType,
        PostPersonalScheduleParamsType, PostPersonalScheduleRequestType, 
        DeletePersonalScheduleParamsType,
        UpdatePersonalScheduleParamsType, UpdatePersonalScheduleRequestType } from "./personalScheduleType.ts"



/** 백엔드와 API 연동 */

// 조회
// Path: PersonalSchedule_URL
// GET 요청 및 응답받기
export const getPersonalMonthSchedule= async ({ userId, year, month }: GetPersonalScheduleParamsType) => {
    try {
      const response = await AxiosInstance.get(`${BASE_URL}${PersonalSchedule_URL}`,
      // 쿼리 파라미터 전달
      {
        params: {
          userId,
          year,
          month
        },
      }
      );
      
      // 백엔드 서버로부터 응답 데이터 반환
      return response.data;
  
    } catch (error) {
      console.error(`월별 개인 일정 (${year}년 ${month}월)를 조회하는 중 오류 발생:`, error);
      throw error;
    }
};

// 특정 날짜 조회
export const getPersonalDateSchedule = async ({ userId, date }: GetPersonalDateScheduleParamsType) => {
    try {
      const response = await AxiosInstance.get(`${BASE_URL}${PersonalDateSchedule_URL}`,
      // 쿼리 파라미터 전달
      {
        params: {
          userId,
          date
        },
      }
      );
      
      // 백엔드 서버로부터 응답 데이터 반환
      return response.data;
  
    } catch (error) {
      console.error(`일별 개인 일정 (${date})를 조회하는 중 오류 발생:`, error);
      throw error;
    }
};


// 추가
// Path: PersonalSchedule_URL
// POST 요청 및 응답받기
export const postPersonalSchedule = async (
  { userId }: PostPersonalScheduleParamsType, 
  { date, content }: PostPersonalScheduleRequestType) => {
  try {
    const response = await AxiosInstance.post(`${BASE_URL}${PersonalSchedule_URL}`, 
      // Request Data 전달
      {
        date,
        content,
      },
      // 쿼리 파라미터 전달
      {
        params: {
          userId
        },
      }
    );
    
    // 백엔드 서버로부터 API의 응답 데이터 받은 후 리턴
    return response.data;

  } catch (error) {
    console.error('개인일정 생성 중 오류 발생:', error);
    throw error;
  }
};



// 삭제
// Path: PersonalSchedule_URL/{personalScheduleId}
// DELETE 요청 및 응답받기: 특정 개인일정 삭제
export const deletePersonalSchedule= async ({ personalScheduleId }: DeletePersonalScheduleParamsType) => {
  try {
    const response = await AxiosInstance.delete(`${BASE_URL}${PersonalSchedule_URL}/${personalScheduleId}`,
    {
        params: {
            personalScheduleId
        },
    }
    );
    
    // 백엔드 서버로부터 응답 데이터 반환
    return response.data;

  } catch (error) {
    console.error(`개인일정 ID ${personalScheduleId}를 삭제하는 중 오류 발생:`, error);
    throw error;
  }
};


// 수정
// Path: PersonalSchedule_URL/{personalScheduleId}
// PATCH 요청 및 응답받기: 특정 루틴 수정
export const updatePersonalSchedule = async ({ personalScheduleId, content }: UpdatePersonalScheduleParamsType & UpdatePersonalScheduleRequestType) => {
  try {
    const response = await AxiosInstance.patch(`${BASE_URL}${PersonalSchedule_URL}/${personalScheduleId}`, 
      // Request Data 전달
      {
        content,
      },
      // 쿼리 파라미터 전달
      {
        params: {
          personalScheduleId
        },
      }
    );

    // 백엔드 서버로부터 응답 데이터 반환
    return response.data;

  } catch (error) {
    console.error(`개인일정 ID ${personalScheduleId}를 수정하는 중 오류 발생:`, error);
    throw error;
  }
};