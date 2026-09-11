import axios from "axios";

import { useUserStore } from "@/stores/useUserStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const userId = useUserStore.getState().user?.id;

  if (userId) {
    config.headers["X-USER-ID"] = String(userId);
  }

  return config;
});

export default api;
