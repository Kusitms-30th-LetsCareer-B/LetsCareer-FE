export const URL = "/calendars/personal";

// 개인 일정 타입
export interface PersonalSchedule {
  personalScheduleId: number;
  date: string;
  content: string;
}

// GET request parameters
export interface GetPersonalScheduleParams {
  userId: number;
  year: string;
  month: string;
}

// GET response type
export interface GetPersonalScheduleResponse {
  code: number;
  message: string;
  data: PersonalSchedule[];
}

// POST request body
export interface PostPersonalScheduleRequest {
  userId: number;
  date: string;
  content: string;
}

// POST response type
export interface PostPersonalScheduleResponse {
  code: number;
  message: string;
  data: null;
}
