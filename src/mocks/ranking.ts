import { users } from "@/mocks/user";
import type { RankingEntry, RankingResponse } from "@/types/ranking";
import type { User } from "@/types/user";

// 랭킹 헤더
export const mockRankingHeader = {
  notificationCount: 1,
};

// 확인용 친구 수 상태 전환 (DEFAULT · FEW · NONE)
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

// 친구 랭킹 (테스트 계정 · 나 포함, 순위는 XP 순 재계산, 친구 API 미제공)
const friendRankingsByScenario = {
  DEFAULT: [
    ...testUserRankings,
    { rank: 4, id: 9, name: "정서홍", xp: 1720, isMe: false },
    { rank: 5, id: 12, name: "이서연", xp: 1450, isMe: false },
    { rank: 6, id: 13, name: "윤도현", xp: 1210, isMe: false },
  ],
  FEW: testUserRankings.slice(0, 2),
  NONE: [],
} satisfies Record<string, RankingEntry[]>;

const friendRankings = friendRankingsByScenario[FRIEND_SCENARIO];

// 친구 랭킹 조회 응답 (로그인 사용자 XP 반영 후 XP 순 순위 재계산, 목록 밖 내 순위 포함)
export const getMockFriendRanking = (user: User): RankingResponse => {
  const me: RankingEntry = {
    rank: 0,
    id: user.id,
    name: user.nickname,
    xp: user.totalXp,
    isMe: true,
  };

  const ranked = [...friendRankings.filter((ranking) => ranking.id !== me.id), me]
    .sort((a, b) => b.xp - a.xp)
    .map((ranking, index) => ({ ...ranking, rank: index + 1 }));

  return {
    rankings: ranked.slice(0, RANKING_LIST_SIZE),
    myRanking: ranked.find((ranking) => ranking.isMe) ?? null,
  };
};
