import { create } from "zustand";
import { persist } from "zustand/middleware";

import { QUIZ_REVIEW_TYPE_CONFIG } from "@/config/reviewTypeConfig";
import { mockReviewTypes, mockWrongAnswers } from "@/mocks/review";
import type { News } from "@/types/news";
import type { Quiz } from "@/types/quiz";
import type { ReviewTypeId, ReviewWrongAnswer } from "@/types/review";
import { getToday } from "@/utils/getToday";

// 유형별 일일 복습 XP / 일일 최대 XP (5개 유형 기준)
export const REVIEW_XP_PER_TYPE = 2;
export const MAX_DAILY_REVIEW_XP = 10;

type ReviewState = {
  // 오늘 XP를 받은 유형
  xpEarnedTypeIds: ReviewTypeId[];

  // XP 획득 날짜 (날짜 변경 시 획득 유형 초기화)
  xpEarnedDate: string;

  // 혼자 문제풀기 오답 (훈련하기 유형별 정리)
  wrongAnswers: ReviewWrongAnswer[];

  earnTodayXp: (typeId: ReviewTypeId) => void;
  saveWrongAnswer: (quiz: Quiz, news: News) => void;
  completeReview: (quizIds: number[]) => void;
};

// 전날 복습 완료 오답 정리 (복습 전 오답은 날짜 변경 후에도 유지)
const keepTodayAnswers = (wrongAnswers: ReviewWrongAnswer[]) => {
  const today = getToday();

  return wrongAnswers.filter(({ reviewedDate }) => reviewedDate === null || reviewedDate === today);
};

// 오늘 복습 XP 획득·오답 저장 상태 (혼자 문제풀기·유형 선택·복습 완료 공유, 새로고침 유지)
export const useReviewStore = create<ReviewState>()(
  persist(
    (set) => ({
      xpEarnedTypeIds: mockReviewTypes
        .filter((reviewType) => reviewType.isXpEarnedToday)
        .map((reviewType) => reviewType.typeId),
      xpEarnedDate: getToday(),
      wrongAnswers: mockWrongAnswers,

      earnTodayXp: (typeId) =>
        set((state) => {
          const today = getToday();

          // 날짜 변경 시 획득 유형 초기화
          const earnedTypeIds = state.xpEarnedDate === today ? state.xpEarnedTypeIds : [];

          // 오늘 이미 받은 유형은 추가 지급 없음
          if (earnedTypeIds.includes(typeId)) return {};

          return { xpEarnedTypeIds: [...earnedTypeIds, typeId], xpEarnedDate: today };
        }),

      saveWrongAnswer: (quiz, news) =>
        set((state) => {
          const { typeId, subType } = QUIZ_REVIEW_TYPE_CONFIG[quiz.category];

          // 같은 문제 다시 틀린 경우 복습 전 상태로 교체
          const wrongAnswers = keepTodayAnswers(state.wrongAnswers).filter(
            (wrongAnswer) => wrongAnswer.quiz.quizId !== quiz.quizId,
          );

          return {
            wrongAnswers: [
              ...wrongAnswers,
              { quiz: { ...quiz, news }, typeId, subType, reviewedDate: null },
            ],
          };
        }),

      completeReview: (quizIds) =>
        set((state) => {
          const today = getToday();

          return {
            wrongAnswers: keepTodayAnswers(state.wrongAnswers).map((wrongAnswer) =>
              quizIds.includes(wrongAnswer.quiz.quizId)
                ? { ...wrongAnswer, reviewedDate: today }
                : wrongAnswer,
            ),
          };
        }),
    }),

    // 브라우저 저장소 키
    { name: "readle-review" },
  ),
);
