import { AxiosError } from 'axios';

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T | null;
}

export const handleApiError = (error: AxiosError): ApiResponse<null> => {
  if (error.response) {
    const data = error.response.data as ApiResponse<null>;
    console.error('API Error:', data.message);
    alert(`Error: ${data.message}`);
    return {
      code: data.code || error.response.status || 500,
      message: data.message || '서버 에러',
      data: null,
    };
  } else if (error.request) {
    console.error('API Error: No response received from the server.');
    alert('Error: No response received from the server.');
    return {
      code: 503,
      message: '네트워크 에러: 서버에 응답이 없습니다.',
      data: null,
    };
  } else {
    console.error('API Error:', error.message);
    alert(`Error: ${error.message}`);
    return {
      code: 500,
      message: error.message || '알 수 없는 에러가 발생했습니다.',
      data: null,
    };
  }
};
