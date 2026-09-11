import { create } from "zustand";

import { mockReviewTypes } from "@/mocks/review";
import type { ReviewTypeId } from "@/types/review";

// 유형별 일일 복습 XP / 일일 최대 XP (5개 유형 기준)
export const REVIEW_XP_PER_TYPE = 2;
export const MAX_DAILY_REVIEW_XP = 10;

type ReviewState = {
  // 오늘 XP를 받은 유형
  xpEarnedTypeIds: ReviewTypeId[];

  earnTodayXp: (typeId: ReviewTypeId) => void;
};

// 오늘 복습 XP 획득 상태 (유형 선택·복습 완료 공유)
export const useReviewStore = create<ReviewState>()((set) => ({
  xpEarnedTypeIds: mockReviewTypes
    .filter((reviewType) => reviewType.isXpEarnedToday)
    .map((reviewType) => reviewType.typeId),

  earnTodayXp: (typeId) =>
    set((state) => {
      // 오늘 이미 받은 유형은 추가 지급 없음
      if (state.xpEarnedTypeIds.includes(typeId)) return {};

      return { xpEarnedTypeIds: [...state.xpEarnedTypeIds, typeId] };
    }),
}));
