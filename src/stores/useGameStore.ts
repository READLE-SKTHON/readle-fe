import { create } from "zustand";

import type { GamePhase, GameQuestion, RoundScore, SubmitStatus } from "@/types/game";

type GameData = {
  questions: GameQuestion[];
  participantIds: number[];
  currentIndex: number;
  phase: GamePhase;

  // 참여자별 제출 상태
  submitStatuses: Record<number, SubmitStatus>;

  // 내가 제출한 답안
  myAnswer: string | null;

  // 이번 문제 참여자별 점수
  roundScores: RoundScore[];

  // 참여자별 누적 점수
  totalScores: Record<number, number>;
};

type GameState = GameData & {
  startGame: (questions: GameQuestion[], participantIds: number[]) => void;
  updateSubmitStatus: (userId: number, status: SubmitStatus) => void;
  submitMyAnswer: (userId: number, answer: string) => void;
  revealResult: (scores: RoundScore[]) => void;
  showRanking: () => void;
  goToNextQuestion: () => void;
  resetGame: () => void;
};

const initialGameData: GameData = {
  questions: [],
  participantIds: [],
  currentIndex: 0,
  phase: "ANSWERING",
  submitStatuses: {},
  myAnswer: null,
  roundScores: [],
  totalScores: {},
};

// 참여자 전원 미제출 상태
const createSubmitStatuses = (participantIds: number[]): Record<number, SubmitStatus> =>
  Object.fromEntries(participantIds.map((userId) => [userId, "NOT_SUBMITTED"]));

// 게임 진행 상태 (문제 풀이 → 제출 대기 → 정답 발표 → 중간 순위 → 최종 순위 공유)
export const useGameStore = create<GameState>()((set) => ({
  ...initialGameData,

  startGame: (questions, participantIds) =>
    set({
      ...initialGameData,
      questions,
      participantIds,
      submitStatuses: createSubmitStatuses(participantIds),
      totalScores: Object.fromEntries(participantIds.map((userId) => [userId, 0])),
    }),

  updateSubmitStatus: (userId, status) =>
    set((state) => {
      // 제출 완료 후 상태 유지
      if (state.submitStatuses[userId] === "SUBMITTED") return {};

      return { submitStatuses: { ...state.submitStatuses, [userId]: status } };
    }),

  submitMyAnswer: (userId, answer) =>
    set((state) => ({
      phase: "WAITING",
      myAnswer: answer,
      submitStatuses: { ...state.submitStatuses, [userId]: "SUBMITTED" },
    })),

  revealResult: (scores) =>
    set((state) => ({
      phase: "REVEAL",
      roundScores: scores,
      totalScores: {
        ...state.totalScores,
        ...Object.fromEntries(
          scores.map(({ userId, points }) => [userId, (state.totalScores[userId] ?? 0) + points]),
        ),
      },
    })),

  showRanking: () => set({ phase: "RANKING" }),

  goToNextQuestion: () =>
    set((state) => ({
      currentIndex: state.currentIndex + 1,
      phase: "ANSWERING",
      myAnswer: null,
      roundScores: [],
      submitStatuses: createSubmitStatuses(state.participantIds),
    })),

  resetGame: () => set(initialGameData),
}));
