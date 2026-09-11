import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { StartReviewResponse } from "@/types/review";

type ReviewState = {
  // 진행 중인 복습 세션 (복습 시작 응답)
  session: StartReviewResponse | null;

  setSession: (session: StartReviewResponse) => void;
  clearSession: () => void;
};

// 복습 세션 정보 (세부 유형 선택 → 문제 풀이 → 결과 공유, 새로고침 유지)
export const useReviewStore = create<ReviewState>()(
  persist(
    (set) => ({
      session: null,

      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),
    }),

    // 탭 단위 저장소 (탭 닫으면 초기화)
    { name: "readle-review-session", storage: createJSONStorage(() => sessionStorage) },
  ),
);
