import { useQuery } from "@tanstack/react-query";

import { getReviewCategories } from "@/api/review/reviewApi";
import useUser from "@/hooks/useUser";
import { reviewKeys } from "@/queries/review/reviewKeys";

// 유형별 틀린 문제 개수 조회
export default function useReviewCategoriesQuery() {
  const { user } = useUser();

  return useQuery({
    queryKey: reviewKeys.categories(user.id),
    queryFn: () => getReviewCategories(user.id),
  });
}
