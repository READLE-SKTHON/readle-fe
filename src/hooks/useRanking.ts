import { mockRankingResponses } from "@/mocks/ranking";
import type { RankingResponse, RankingTab } from "@/types/ranking";

// 탭별 랭킹 조회 (추후 tanstack-query, 탭별 쿼리 키 ["ranking", tab])
export default function useRanking(tab: RankingTab): RankingResponse {
  return mockRankingResponses[tab];
}
