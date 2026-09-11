import api from "@/api/axios";
import type { ApiResponse } from "@/types/api";
import type { SchoolRankingResponse, TotalRankingResponse } from "@/types/ranking";

// 전체 랭킹 조회 (상위 7명 + 7등 밖이면 내 순위)
export const getTotalRanking = async (userId: number) => {
  const { data } = await api.get<ApiResponse<TotalRankingResponse>>("/api/ranking/all", {
    params: { userId },
  });

  return data.data;
};

// 학교별 랭킹 조회 (상위 7개교 + 목록 밖이면 내 학교 순위)
export const getSchoolRanking = async (userId: number) => {
  const { data } = await api.get<ApiResponse<SchoolRankingResponse>>("/api/ranking/school", {
    params: { userId },
  });

  return data.data;
};
