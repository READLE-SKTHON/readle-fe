import api from "@/api/axios";
import type { ApiResponse } from "@/types/api";
import type { QuestionMainCategory } from "@/types/game";
import type {
  ReviewCategoriesResponse,
  ReviewGroupsResponse,
  ReviewResultResponse,
  StartReviewRequest,
  StartReviewResponse,
  SubmitReviewAnswerRequest,
  SubmitReviewAnswerResponse,
} from "@/types/review";

// 유형별 틀린 문제 개수 조회 (5개 유형 전부)
export const getReviewCategories = async (userId: number) => {
  const { data } = await api.get<ApiResponse<ReviewCategoriesResponse>>("/api/review/categories", {
    params: { userId },
  });

  return data.data;
};

// 날짜·세부 유형별 틀린 문제 묶음 조회 (선택한 유형 기준)
export const getReviewGroups = async (userId: number, mainCategory: QuestionMainCategory) => {
  const { data } = await api.get<ApiResponse<ReviewGroupsResponse>>(
    `/api/review/${mainCategory}/groups`,
    { params: { userId } },
  );

  return data.data;
};

// 복습 시작 (틀린 문제 복기 + 같은 세부 유형 다른 기사 문제)
export const startReview = async (userId: number, request: StartReviewRequest) => {
  const { data } = await api.post<ApiResponse<StartReviewResponse>>("/api/review/start", request, {
    params: { userId },
  });

  return data.data;
};

// 복습 문제 답안 제출 (정답 시 1XP)
export const submitReviewAnswer = async (
  userId: number,
  reviewSessionId: number,
  questionId: number,
  request: SubmitReviewAnswerRequest,
) => {
  const { data } = await api.post<ApiResponse<SubmitReviewAnswerResponse>>(
    `/api/review/${reviewSessionId}/questions/${questionId}/submit`,
    request,
    { params: { userId } },
  );

  return data.data;
};

// 복습 결과 조회 (세션에서 푼 문제 기준 정답률)
export const getReviewResult = async (userId: number, reviewSessionId: number) => {
  const { data } = await api.get<ApiResponse<ReviewResultResponse>>(
    `/api/review/${reviewSessionId}/result`,
    { params: { userId } },
  );

  return data.data;
};
