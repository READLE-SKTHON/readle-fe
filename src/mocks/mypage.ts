export const mockMyPage = {
  // 학습 통계 (홈·마이페이지 공통, 누적 XP는 로그인 사용자 기준)
  stats: {
    streakDays: 7,
    newsCount: 2,
    accuracy: 80,
  },

  friends: [
    { id: 1, name: "환희" },
    { id: 2, name: "예지" },
    { id: 3, name: "정모" },
  ],

  accuracyHistory: [60, 75, 55, 70, 65, 85, 80],
};
