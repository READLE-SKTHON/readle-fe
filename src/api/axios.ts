import axios from "axios";

import { useUserStore } from "@/stores/useUserStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 로그인 사용자 식별 헤더 추가 (서버 인증용)
api.interceptors.request.use((config) => {
  const userId = useUserStore.getState().user?.id;

  if (userId) config.headers.set("X-USER-ID", userId);

  return config;
});

export default api;
