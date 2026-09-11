import api from "@/api/axios";

import type { ApiResponse } from "@/types/api";

import type {
  SubmitAnswerRequest,
  SubmitAnswerResult,
  TodayTraining,
  TodayTrainingResult,
} from "@/types/training";

export const getTodayTraining = async (userId: number) => {
  const response = await api.get<ApiResponse<TodayTraining>>("/api/training/today", {
    params: {
      userId,
    },
  });

  return response.data.data;
};

export const submitTrainingAnswer = async (
  userId: number,
  questionId: number,
  body: SubmitAnswerRequest,
) => {
  const response = await api.post<ApiResponse<SubmitAnswerResult>>(
    `/api/training/questions/${questionId}/submit`,
    body,
    {
      params: {
        userId,
      },
    },
  );

  return response.data.data;
};

export const getTodayTrainingResult = async (userId: number) => {
  const response = await api.get<ApiResponse<TodayTrainingResult>>("/api/training/result/today", {
    params: {
      userId,
    },
  });

  return response.data.data;
};
