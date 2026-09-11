// 랭킹 query key
export const rankingKeys = {
  all: ["ranking"] as const,

  total: (userId: number) => [...rankingKeys.all, "total", userId] as const,
  school: (userId: number) => [...rankingKeys.all, "school", userId] as const,
};
