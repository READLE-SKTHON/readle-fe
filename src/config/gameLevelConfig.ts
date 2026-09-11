export type UserLevel = 1 | 2 | 3;

type GameLevelConfig = {
  hasTimer: boolean;
  canOpenNews: boolean;
};

export const GAME_LEVEL_CONFIG: Record<UserLevel, GameLevelConfig> = {
  1: {
    hasTimer: false,
    canOpenNews: true,
  },

  2: {
    hasTimer: true,
    canOpenNews: true,
  },

  3: {
    hasTimer: true,
    canOpenNews: false,
  },
};
