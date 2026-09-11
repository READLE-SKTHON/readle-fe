// 로그인 사용자 (서버 로그인 응답 + 계정별 누적 XP)
export interface User {
  id: number;
  nickname: string;

  // 학교 이름 (미등록 시 null)
  school: string | null;

  // 누적 XP (혼자 문제풀기·훈련하기 획득 XP 합산)
  totalXp: number;
}
