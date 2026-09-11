import type { AbilityScore, SkillCategory, SkillResult } from "@/types/review";

// 차트 점수 범위 (0~100)
const clampScore = (score: number) => Math.min(100, Math.max(0, score));

// 능력치 결과 차트 형식 변환 (나의 점수: 서버 누적 평균, 전체 평균: 별도 전달값)
export const toAbilityScores = (
  skillResults: SkillResult[],
  averageScores: Partial<Record<SkillCategory, number>>,
): AbilityScore[] =>
  skillResults.map(({ skillCategory, averageScore }) => ({
    key: skillCategory,
    label: skillCategory,
    myScore: clampScore(averageScore),
    averageScore: clampScore(averageScores[skillCategory] ?? 0),
  }));
