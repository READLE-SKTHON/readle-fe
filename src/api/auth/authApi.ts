import api from "@/api/axios";
import type { ApiResponse } from "@/types/api";
import type { LoginByNameRequest, LoginResponse } from "@/types/auth";

// 닉네임+학교 로그인 (비밀번호 없음)
export const loginByName = async (request: LoginByNameRequest) => {
  const { data } = await api.post<ApiResponse<LoginResponse>>("/api/auth/login/by-name", request);

  return data.data;
};
