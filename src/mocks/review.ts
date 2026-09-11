import type { SkillCategory } from "@/types/review";

// 복습 메인 헤더
export const mockReviewHeader = {
  notificationCount: 1,
};

// 능력치 영역별 전체 평균 점수 (전체 평균 API 미제공)
export const mockAverageSkillScores: Record<SkillCategory, number> = {
  문자해독: 62,
  내용이해: 66,
  맥락파악: 70,
  추론: 58,
  비판적사고: 64,
};
