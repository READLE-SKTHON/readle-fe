import type { QuizCategory } from "@/types/quiz";
import type { ReviewTypeId } from "@/types/review";

type ReviewTypeConfig = {
  typeId: ReviewTypeId;
  subType: string;
};

// 혼자 문제풀기 문제 분류별 훈련하기 유형·세부 유형 (오답 저장 기준)
export const QUIZ_REVIEW_TYPE_CONFIG: Record<QuizCategory, ReviewTypeConfig> = {
  MAIN_IDEA: {
    typeId: "MAIN_IDEA",
    subType: "요지",
  },

  FACT_CHECK: {
    typeId: "INFORMATION",
    subType: "일치/불일치",
  },

  SUMMARY: {
    typeId: "INFORMATION",
    subType: "근거찾기",
  },

  INFERENCE: {
    typeId: "INFERENCE",
    subType: "이어질 내용 유추",
  },
};
