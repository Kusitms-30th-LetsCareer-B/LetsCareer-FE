/* 로그인 정보 받기 */
export interface userInfo {
  userId: number;
  userName: string;
}

/* 유저 관련 URL */
export const URL = "/user";

/* 사용자 정보를 가져오는 함수 */
import axios from "axios";
import { BASE_URL } from "./axiosInstance.ts";

export const fetchUserInfo = async (userId: number): Promise<userInfo> => {
  try {
    const response = await axios.get<userInfo>(`${BASE_URL}${URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

/**
 * 
 * 
// 함수 호출 예시
fetchUserInfo(1)
  .then(user => console.log('User Info:', user))
  .catch(error => console.error('Error:', error));
 */
