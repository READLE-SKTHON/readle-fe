import { create } from "zustand";

import type { GameAnswer, GamePhase, GameQuestion, GameStatusResponse } from "@/types/game";
import { toGameQuestion } from "@/utils/toGameQuestion";

type GameData = {
  // 진행 중인 판 번호 (한 판 더하기 시 증가)
  round: number | null;

  phase: GamePhase | null;
  currentOrder: number | null;

  // 문제 순서별 문제 (문제 없는 정답 공개 단계 표시용)
  questions: Record<number, GameQuestion>;

  // 제출 완료 문제 순서
  submittedOrders: number[];

  // 선택·입력 중인 답안 (제출 대기 시 제출한 답안)
  draftAnswer: GameAnswer | null;
};

type GameState = GameData & {
  syncStatus: (status: GameStatusResponse) => void;
  setDraftAnswer: (answer: GameAnswer) => void;
  markSubmitted: (order: number) => void;
  resetGame: () => void;
};

const initialGameData: GameData = {
  round: null,
  phase: null,
  currentOrder: null,
  questions: {},
  submittedOrders: [],
  draftAnswer: null,
};

// 게임 진행 상태 (서버 상태 조회 기준 동기화, 답안·제출 여부 관리)
export const useGameStore = create<GameState>()((set) => ({
  ...initialGameData,

  syncStatus: (status) =>
    set((state) => {
      // 새 판 시작 시 이전 판 기록 초기화
      const base = state.round === status.round ? state : initialGameData;

      const { question, currentQuestionOrder: order } = status;
      const isNewQuestion = question !== null && !(order in base.questions);

      return {
        round: status.round,
        phase: status.phase,
        currentOrder: order,
        questions:
          question && isNewQuestion
            ? { ...base.questions, [order]: toGameQuestion(question) }
            : base.questions,
        submittedOrders: base.submittedOrders,

        // 다음 문제 전환 시 선택 답안 초기화
        draftAnswer: base.currentOrder === order ? base.draftAnswer : null,
      };
    }),

  setDraftAnswer: (draftAnswer) => set({ draftAnswer }),

  markSubmitted: (order) =>
    set((state) =>
      state.submittedOrders.includes(order)
        ? {}
        : { submittedOrders: [...state.submittedOrders, order] },
    ),

  resetGame: () => set(initialGameData),
}));
