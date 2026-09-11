import { skipToken, useQuery } from "@tanstack/react-query";

import { getReviewResult } from "@/api/review/reviewApi";
import useUser from "@/hooks/useUser";
import { reviewKeys } from "@/queries/review/reviewKeys";

// 복습 결과 조회 (세션 없으면 요청 안 함)
export default function useReviewResultQuery(reviewSessionId: number | null) {
  const { user } = useUser();

  return useQuery({
    queryKey: reviewKeys.result(user.id, reviewSessionId ?? 0),
    queryFn: reviewSessionId === null ? skipToken : () => getReviewResult(user.id, reviewSessionId),
  });
}
