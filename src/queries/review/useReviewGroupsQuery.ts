import { useQuery } from "@tanstack/react-query";

import { getReviewGroups } from "@/api/review/reviewApi";
import useUser from "@/hooks/useUser";
import { reviewKeys } from "@/queries/review/reviewKeys";
import type { QuestionMainCategory } from "@/types/game";

// 날짜·세부 유형별 틀린 문제 묶음 조회
export default function useReviewGroupsQuery(mainCategory: QuestionMainCategory) {
  const { user } = useUser();

  return useQuery({
    queryKey: reviewKeys.groups(user.id, mainCategory),
    queryFn: () => getReviewGroups(user.id, mainCategory),
  });
}
