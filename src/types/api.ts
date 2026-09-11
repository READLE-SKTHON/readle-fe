// 공통 API 응답 형식 (성공 시 code 200)
export interface ApiResponse<T> {
  success: boolean;
  code: number | string;
  message: string;
  data: T;
}

// 공통 에러 응답 형식 (code 예: R001)
export interface ApiErrorResponse {
  success: false;
  code: string;
  message: string;
  data: null;
}
