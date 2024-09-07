// Axios 라이브러리 가져오기
import axios from 'axios';

// 환경 변수에서 API URL을 가져옵니다.
//export const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
export const BASE_URL = 'https://letscareer.shop' // 정적으로 설정 (임시용)

/// Axios 인스턴스 생성
export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10초
  headers: {
    'Content-Type': 'application/json',  // JSON 형식
  },
});


