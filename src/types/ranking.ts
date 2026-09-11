// 랭킹 탭 (전체 / 학교 / 친구)
export type RankingTab = "TOTAL" | "SCHOOL" | "FRIEND";

// 랭킹 항목 (학교 탭: 학교 id · 학교명 · 소속 사용자 평균 XP)
export interface RankingEntry {
  // 서버 기준 순위 (동점자 처리 포함)
  rank: number;

  id: number;
  name: string;
  xp: number;

  // 내 항목 여부 (학교 탭: 내 소속 학교)
  isMe: boolean;
}

// 탭별 랭킹 조회 응답 (상위 목록 + 내 순위)
export interface RankingResponse {
  rankings: RankingEntry[];

  // 내 순위 (학교 미등록 시 null)
  myRanking: RankingEntry | null;
}
