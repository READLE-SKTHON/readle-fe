// 게임 진행 query key
export const gameKeys = {
  all: ["game"] as const,

  status: (gameRoomId: number, userId: number) =>
    [...gameKeys.all, "status", gameRoomId, userId] as const,
};
