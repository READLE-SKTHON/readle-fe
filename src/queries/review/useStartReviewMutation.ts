import { useMutation } from "@tanstack/react-query";

import { startReview } from "@/api/review/reviewApi";
import useUser from "@/hooks/useUser";
import { useReviewStore } from "@/stores/useReviewStore";
import type { StartReviewRequest } from "@/types/review";

// 복습 시작 (성공 시 복습 세션 저장)
export default function useStartReviewMutation() {
  const { user } = useUser();
  const setSession = useReviewStore((state) => state.setSession);

  return useMutation({
    mutationFn: (request: StartReviewRequest) => startReview(user.id, request),
    onSuccess: (session) => setSession(session),
  });
}
