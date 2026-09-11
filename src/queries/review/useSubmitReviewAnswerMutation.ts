import { useMutation } from "@tanstack/react-query";

import { submitReviewAnswer } from "@/api/review/reviewApi";
import useUser from "@/hooks/useUser";
import type { SubmitReviewAnswerRequest } from "@/types/review";

type SubmitReviewAnswerVariables = {
  questionId: number;
  request: SubmitReviewAnswerRequest;
};

// 복습 문제 답안 제출 (서버 채점, 정답 시 1XP 지급)
export default function useSubmitReviewAnswerMutation(reviewSessionId: number) {
  const { user } = useUser();

  return useMutation({
    mutationFn: ({ questionId, request }: SubmitReviewAnswerVariables) =>
      submitReviewAnswer(user.id, reviewSessionId, questionId, request),
  });
}
