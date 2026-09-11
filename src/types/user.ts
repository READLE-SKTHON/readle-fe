// 로그인 사용자 (테스트 계정)
export interface User {
  id: number;
  nickname: string;
  school: string;

  // 누적 XP (혼자 문제풀기·훈련하기 획득 XP 합산)
  totalXp: number;
}
