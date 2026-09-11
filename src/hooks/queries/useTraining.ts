import { isAxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getTodayTraining, getTodayTrainingResult, submitTrainingAnswer } from "@/api/training";

import { useUserStore } from "@/stores/useUserStore";

import type { SubmitAnswerRequest } from "@/types/training";

// 오늘 문제 + 기사 조회
export const useTodayTraining = () => {
  const userId = useUserStore((state) => state.user?.id);

  return useQuery({
    queryKey: ["training", "today", userId],
    queryFn: () => getTodayTraining(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) =>
      !(
        isAxiosError(error) &&
        error.response?.status === 404 &&
        error.response.data?.code === "AN001"
      ) && failureCount < 2,
  });
};

// 답안 제출
export const useSubmitTrainingAnswer = () => {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.user?.id);

  return useMutation({
    mutationFn: async ({ questionId, body }: { questionId: number; body: SubmitAnswerRequest }) => {
      if (userId == null) throw new Error("로그인이 필요합니다.");
      const result = await submitTrainingAnswer(userId, questionId, body);
      if (!["correct", "incorrect", "insufficient_reasoning"].includes(result.resultStatus))
        throw new Error("채점 결과를 확인할 수 없습니다.");
      return result;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["training", "result", "today", userId] });
    },
  });
};

// 오늘 최종 결과
export const useTodayTrainingResult = () => {
  const userId = useUserStore((state) => state.user?.id);

  return useQuery({
    queryKey: ["training", "result", "today", userId],
    queryFn: () => getTodayTrainingResult(userId!),
    enabled: !!userId,
    retry: (failureCount, error) =>
      !(isAxiosError(error) && error.response?.data?.code === "AN001") && failureCount < 3,
  });
};
