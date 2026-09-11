import { QUIZ_REVIEW_TYPE_CONFIG } from "@/config/reviewTypeConfig";
import { mockReviewTypes } from "@/mocks/review";
import type { QuizCategory } from "@/types/quiz";

// 혼자 문제풀기 문제 유형 태그 (훈련하기 유형·세부 유형 기준, 예: 핵심파악 | 요지)
export const getQuizTag = (category: QuizCategory) => {
  const { typeId, subType } = QUIZ_REVIEW_TYPE_CONFIG[category];

  const typeName = mockReviewTypes.find((reviewType) => reviewType.typeId === typeId)?.name ?? "";

  return { type: typeName, subtype: subType };
};
