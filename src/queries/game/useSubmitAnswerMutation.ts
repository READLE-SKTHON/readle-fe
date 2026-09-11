import { useMutation, useQueryClient } from "@tanstack/react-query";

import { submitAnswer } from "@/api/game/gameApi";
import useUser from "@/hooks/useUser";
import { gameKeys } from "@/queries/game/gameKeys";
import { useGameStore } from "@/stores/useGameStore";
import type { SubmitAnswerRequest } from "@/types/game";
import { getApiError } from "@/utils/getApiError";

// 이미 제출한 문제 에러 코드
export const DUPLICATE_SUBMIT_CODE = "R012";

type SubmitAnswerVariables = {
  order: number;
  request: SubmitAnswerRequest;
};

// 답안 제출 (성공·중복 제출 시 제출 완료 기록)
export default function useSubmitAnswerMutation(gameRoomId: number) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const markSubmitted = useGameStore((state) => state.markSubmitted);

  return useMutation({
    mutationFn: ({ order, request }: SubmitAnswerVariables) =>
      submitAnswer(user.id, gameRoomId, order, request),

    onSuccess: (_, { order }) => {
      markSubmitted(order);

      // 제출 현황 즉시 반영
      queryClient.invalidateQueries({ queryKey: gameKeys.status(gameRoomId, user.id) });
    },

    onError: (error, { order }) => {
      if (getApiError(error).code === DUPLICATE_SUBMIT_CODE) markSubmitted(order);
    },
  });
}
