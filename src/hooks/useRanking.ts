import { useMemo } from "react";

import useUser from "@/hooks/useUser";
import { getMockFriendRanking } from "@/mocks/ranking";
import useSchoolRankingQuery from "@/queries/ranking/useSchoolRankingQuery";
import useTotalRankingQuery from "@/queries/ranking/useTotalRankingQuery";
import type { RankingResponse, RankingTab } from "@/types/ranking";
import { getApiError } from "@/utils/getApiError";

// 랭킹 수신 전 빈 목록
const EMPTY_RANKING: RankingResponse = { rankings: [], myRanking: null };

// 탭별 랭킹 조회 (전체·학교 서버 조회, 친구 API 미제공으로 목데이터)
export default function useRanking(tab: RankingTab) {
  const { user } = useUser();

  const totalQuery = useTotalRankingQuery(tab === "TOTAL");
  const schoolQuery = useSchoolRankingQuery(tab === "SCHOOL");

  const friendRanking = useMemo(() => getMockFriendRanking(user), [user]);

  if (tab === "FRIEND") {
    return { ranking: friendRanking, isPending: false, errorMessage: null, retry: () => {} };
  }

  const query = tab === "TOTAL" ? totalQuery : schoolQuery;

  return {
    ranking: query.data ?? EMPTY_RANKING,
    isPending: query.isPending,

    // 조회 실패 안내 문구 (받아온 랭킹 없을 때만)
    errorMessage: query.isError && !query.data ? getApiError(query.error).message : null,

    retry: () => {
      query.refetch();
    },
  };
}
