import { useMemo } from "react";

import type { RankingResponse } from "@/types/ranking";

// 포디움 인원 / 4위 이하 목록 표시 개수 (4~7위)
const PODIUM_COUNT = 3;
const LIST_VISIBLE_COUNT = 4;

// 포디움 · 4위 이하 목록 · 표시 범위 밖 내 순위 분리
export default function useRankingDisplay({ rankings, myRanking }: RankingResponse) {
  return useMemo(() => {
    const lastVisibleRank = PODIUM_COUNT + LIST_VISIBLE_COUNT;
    const isMyRankOutOfRange = !!myRanking && myRanking.rank > lastVisibleRank;

    return {
      podium: rankings.slice(0, PODIUM_COUNT),

      // 내 순위가 범위 밖이면 마지막 칸을 내 행으로 (4~6위 + 내 행)
      listItems: rankings.slice(PODIUM_COUNT, lastVisibleRank - (isMyRankOutOfRange ? 1 : 0)),
      outOfRangeMyRanking: isMyRankOutOfRange ? myRanking : null,
    };
  }, [rankings, myRanking]);
}
