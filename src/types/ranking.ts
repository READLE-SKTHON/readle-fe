// 랭킹 탭 (전체 / 학교 / 친구)
export type RankingTab = "TOTAL" | "SCHOOL" | "FRIEND";

// 랭킹 항목 (학교 탭: 학교명 · 소속 학생 평균 XP)
export interface RankingEntry {
  // 서버 기준 순위 (동점자 처리 포함)
  rank: number;

  // 목록 식별값 (서버 id 미제공 시 목록 순서)
  id: number;

  name: string;
  xp: number;

  // 내 항목 여부 (학교 탭: 내 소속 학교)
  isMe: boolean;
}

// 탭별 랭킹 표시 데이터 (상위 목록 + 내 순위)
export interface RankingResponse {
  rankings: RankingEntry[];

  // 내 순위 (학교 미등록 시 null)
  myRanking: RankingEntry | null;
}

// 전체 랭킹 항목 응답 (사용자 id 미제공)
export interface UserRankingItem {
  rank: number;
  nickname: string;
  xp: number;
}

// 전체 랭킹 조회 응답 (상위 7명 + 7등 밖이면 내 순위)
export interface TotalRankingResponse {
  rankings: UserRankingItem[];
  myRank: UserRankingItem | null;
}

// 학교 랭킹 항목 응답 (소속 학생 평균 XP)
export interface SchoolRankingItem {
  rank: number;
  schoolName: string;
  avgXp: number;
}

// 학교 랭킹 조회 응답 (상위 7개교 + 목록 밖이면 내 학교 순위)
export interface SchoolRankingResponse {
  rankings: SchoolRankingItem[];
  myRank: SchoolRankingItem | null;
}
