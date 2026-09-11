import { useQuery } from "@tanstack/react-query";

import { getTotalRanking } from "@/api/ranking/rankingApi";
import useUser from "@/hooks/useUser";
import { rankingKeys } from "@/queries/ranking/rankingKeys";
import { toTotalRanking } from "@/utils/toRankingResponse";

// 전체 랭킹 조회 (내 항목 닉네임 기준 판단)
export default function useTotalRankingQuery(enabled: boolean) {
  const { user } = useUser();

  return useQuery({
    queryKey: rankingKeys.total(user.id),
    queryFn: () => getTotalRanking(user.id),
    enabled,
    select: (response) => toTotalRanking(response, user.nickname),
  });
}
