import { useMemo } from "react";

import useUser from "@/hooks/useUser";
import { getMockRankingResponse } from "@/mocks/ranking";
import type { RankingResponse, RankingTab } from "@/types/ranking";

// 탭별 랭킹 조회 (로그인 사용자 기준 내 순위, 추후 tanstack-query, 탭별 쿼리 키 ["ranking", tab])
export default function useRanking(tab: RankingTab): RankingResponse {
  const { user } = useUser();

  return useMemo(() => getMockRankingResponse(tab, user), [tab, user]);
}
