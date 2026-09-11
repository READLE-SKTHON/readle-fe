// 게임방 query key
export const roomKeys = {
  all: ["room"] as const,

  participants: (roomId: number, userId: number) =>
    [...roomKeys.all, "participants", roomId, userId] as const,
};
