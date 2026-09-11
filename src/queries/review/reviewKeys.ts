import type { QuestionMainCategory } from "@/types/game";

// 복습 query key
export const reviewKeys = {
  all: ["review"] as const,

  categories: (userId: number) => [...reviewKeys.all, "categories", userId] as const,

  groups: (userId: number, mainCategory: QuestionMainCategory) =>
    [...reviewKeys.all, "groups", userId, mainCategory] as const,

  result: (userId: number, reviewSessionId: number) =>
    [...reviewKeys.all, "result", userId, reviewSessionId] as const,
};
