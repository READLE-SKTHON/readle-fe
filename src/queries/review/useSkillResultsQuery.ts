import { useQuery } from "@tanstack/react-query";

import { getSkillResults } from "@/api/review/reviewApi";
import useUser from "@/hooks/useUser";
import { reviewKeys } from "@/queries/review/reviewKeys";

// 능력치 결과 조회 (복습 메인 내 문해력 능력치)
export default function useSkillResultsQuery() {
  const { user } = useUser();

  return useQuery({
    queryKey: reviewKeys.skills(user.id),
    queryFn: () => getSkillResults(user.id),
  });
}
