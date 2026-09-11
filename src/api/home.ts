import api from "@/api/axios";

import type { ApiResponse } from "@/types/api";
import type { HomeResponse } from "@/types/home";

export const getHome = async (userId: number) => {
  const response = await api.get<ApiResponse<HomeResponse>>("/api/home", {
    params: { userId },
  });

  return response.data.data;
};
