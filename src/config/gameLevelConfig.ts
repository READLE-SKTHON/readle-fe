export type UserLevel = 1 | 2 | 3 | 4 | 5;

type GameLevelConfig = {
  hasTimer: boolean;
  canOpenNews: boolean;
};

// 레벨별 혼자 문제풀기 구성 (타이머 · 지문 전체보기)
export const GAME_LEVEL_CONFIG: Record<UserLevel, GameLevelConfig> = {
  1: {
    hasTimer: false,
    canOpenNews: true,
  },

  2: {
    hasTimer: false,
    canOpenNews: true,
  },

  3: {
    hasTimer: true,
    canOpenNews: true,
  },

  4: {
    hasTimer: true,
    canOpenNews: true,
  },

  5: {
    hasTimer: false,
    canOpenNews: false,
  },
};
