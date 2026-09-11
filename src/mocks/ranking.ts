import { users } from "@/mocks/user";
import type { RankingEntry, RankingResponse, RankingTab } from "@/types/ranking";
import type { User } from "@/types/user";

// 랭킹 헤더
export const mockRankingHeader = {
  notificationCount: 1,
};

// 확인용 예외 상태 전환 (학교 미등록 / 친구 수: DEFAULT · FEW · NONE)
const IS_SCHOOL_UNREGISTERED = false;
const FRIEND_SCENARIO = "DEFAULT";

// 순위 목록 표시 개수 (포디움 3 + 목록 4)
const RANKING_LIST_SIZE = 7;

// 테스트 계정 (시작 누적 XP 기준, 순위는 XP 순 재계산)
const testUserRankings: RankingEntry[] = users.map(({ id, nickname, totalXp }) => ({
  rank: 0,
  id,
  name: nickname,
  xp: totalXp,
  isMe: false,
}));

// 전체 랭킹 (테스트 계정 포함)
const totalRankings: RankingEntry[] = [
  ...testUserRankings,
  { rank: 2, id: 5, name: "김정모", xp: 4000, isMe: false },
  { rank: 3, id: 6, name: "박예지", xp: 3000, isMe: false },
  { rank: 4, id: 7, name: "이도윤", xp: 2980, isMe: false },
  { rank: 5, id: 8, name: "최하린", xp: 2860, isMe: false },
  { rank: 6, id: 10, name: "정하윤", xp: 2720, isMe: false },
  { rank: 7, id: 11, name: "한지민", xp: 2650, isMe: false },
];

// 학교 랭킹 (소속 사용자 평균 XP, 로그인 사용자 소속 학교가 내 학교)
const schoolRankings: RankingEntry[] = [
  { rank: 1, id: 101, name: "리들고등학교", xp: 4210.4, isMe: false },
  { rank: 2, id: 102, name: "한빛고등학교", xp: 3985.7, isMe: false },
  { rank: 3, id: 103, name: "한국교원대학교부설고등학교", xp: 3720.2, isMe: false },
  { rank: 4, id: 104, name: "푸른숲고등학교", xp: 3342.5, isMe: false },
  { rank: 5, id: 105, name: "환희고등학교", xp: 3104.6, isMe: false },
  { rank: 6, id: 106, name: "새솔여자고등학교", xp: 2980.3, isMe: false },
  { rank: 7, id: 107, name: "한빛중학교", xp: 2840.8, isMe: false },
  { rank: 8, id: 108, name: "서후고등학교", xp: 2715.3, isMe: false },
  { rank: 9, id: 109, name: "지우고등학교", xp: 2508.9, isMe: false },
];

// 친구 랭킹 (테스트 계정 · 나 포함, 순위는 XP 순 재계산)
const friendRankingsByScenario = {
  DEFAULT: [
    ...testUserRankings,
    { rank: 4, id: 4, name: "김승민", xp: 1980, isMe: false },
    { rank: 5, id: 9, name: "정서홍", xp: 1720, isMe: false },
    { rank: 6, id: 12, name: "이서연", xp: 1450, isMe: false },
    { rank: 7, id: 13, name: "윤도현", xp: 1210, isMe: false },
  ],
  FEW: testUserRankings.slice(0, 2),
  NONE: [],
} satisfies Record<string, RankingEntry[]>;

const friendRankings = friendRankingsByScenario[FRIEND_SCENARIO];

// 로그인 사용자 XP 반영 후 XP 순 순위 재계산 (목록 밖 내 순위 포함)
const rankByXp = (rankings: RankingEntry[], me: RankingEntry): RankingResponse => {
  const ranked = [...rankings.filter((ranking) => ranking.id !== me.id), me]
    .sort((a, b) => b.xp - a.xp)
    .map((ranking, index) => ({ ...ranking, rank: index + 1 }));

  return {
    rankings: ranked.slice(0, RANKING_LIST_SIZE),
    myRanking: ranked.find((ranking) => ranking.isMe) ?? null,
  };
};

// 탭별 랭킹 조회 응답 (로그인 사용자 기준 내 순위)
export const getMockRankingResponse = (tab: RankingTab, user: User): RankingResponse => {
  const me: RankingEntry = {
    rank: 0,
    id: user.id,
    name: user.nickname,
    xp: user.totalXp,
    isMe: true,
  };

  if (tab === "TOTAL") return rankByXp(totalRankings, me);

  if (tab === "FRIEND") return rankByXp(friendRankings, me);

  // 학교 미등록 시 내 순위 없음
  if (IS_SCHOOL_UNREGISTERED) {
    return { rankings: schoolRankings.slice(0, RANKING_LIST_SIZE), myRanking: null };
  }

  const rankings = schoolRankings.map((ranking) => ({
    ...ranking,
    isMe: ranking.name === user.school,
  }));

  return {
    rankings: rankings.slice(0, RANKING_LIST_SIZE),
    myRanking: rankings.find((ranking) => ranking.isMe) ?? null,
  };
};
