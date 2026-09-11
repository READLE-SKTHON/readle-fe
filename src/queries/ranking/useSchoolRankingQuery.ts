import { useQuery } from "@tanstack/react-query";

import { getSchoolRanking } from "@/api/ranking/rankingApi";
import useUser from "@/hooks/useUser";
import { rankingKeys } from "@/queries/ranking/rankingKeys";
import { toSchoolRanking } from "@/utils/toRankingResponse";

// 학교별 랭킹 조회 (내 학교 로그인 학교 이름 기준 판단)
export default function useSchoolRankingQuery(enabled: boolean) {
  const { user } = useUser();

  return useQuery({
    queryKey: rankingKeys.school(user.id),
    queryFn: () => getSchoolRanking(user.id),
    enabled,
    select: (response) => toSchoolRanking(response, user.school),
  });
}
