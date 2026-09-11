import type { AbilityScore } from "@/types/review";

// 복습 메인 헤더
export const mockReviewHeader = {
  notificationCount: 1,
};

// 문해력 능력치 (나의 점수 · 전체 평균)
export const mockAbilityScores: AbilityScore[] = [
  { key: "VOCABULARY", label: "어휘력", myScore: 75, averageScore: 62 },
  { key: "READING", label: "독해력", myScore: 80, averageScore: 66 },
  { key: "INFERENCE", label: "추론력", myScore: 76, averageScore: 58 },
  { key: "CRITICAL_THINKING", label: "비판적 사고력", myScore: 70, averageScore: 64 },
  { key: "EXPRESSION", label: "표현력", myScore: 62, averageScore: 70 },
];
