import { isAxiosError } from "axios";

import type { ApiErrorResponse } from "@/types/api";

// 서버 응답이 없거나 형식이 다를 때 안내 문구
const DEFAULT_ERROR_MESSAGE = "요청을 처리하지 못했어요.\n잠시 후 다시 시도해주세요.";

// 서버 에러 코드·메시지 추출 (네트워크 오류 등은 기본 문구)
export const getApiError = (error: unknown) => {
  const data = isAxiosError<ApiErrorResponse>(error) ? error.response?.data : undefined;

  if (data && typeof data.message === "string") {
    return { code: data.code, message: data.message };
  }

  return { code: null, message: DEFAULT_ERROR_MESSAGE };
};
