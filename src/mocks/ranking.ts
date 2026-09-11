import type { RankingEntry, RankingResponse, RankingTab } from "@/types/ranking";

// 랭킹 헤더
export const mockRankingHeader = {
  userName: "김환희",
  notificationCount: 1,
};

// 확인용 예외 상태 전환 (학교 미등록 / 친구 수: DEFAULT · FEW · NONE)
const IS_SCHOOL_UNREGISTERED = false;
const FRIEND_SCENARIO = "DEFAULT";

// 전체 랭킹 (내 순위 12위: 목록 범위 밖)
const totalRankings: RankingEntry[] = [
  { rank: 1, id: 2, name: "장서후", xp: 5000, isMe: false },
  { rank: 2, id: 5, name: "김정모", xp: 4000, isMe: false },
  { rank: 3, id: 6, name: "박예지", xp: 3000, isMe: false },
  { rank: 4, id: 7, name: "이도윤", xp: 2980, isMe: false },
  { rank: 5, id: 8, name: "최하린", xp: 2860, isMe: false },
  { rank: 6, id: 10, name: "정하윤", xp: 2720, isMe: false },
  { rank: 7, id: 11, name: "한지민", xp: 2650, isMe: false },
];

// 학교 랭킹 (소속 사용자 평균 XP, 내 소속 학교 5위: 목록 범위 안)
const schoolRankings: RankingEntry[] = [
  { rank: 1, id: 101, name: "리들고등학교", xp: 4210.4, isMe: false },
  { rank: 2, id: 102, name: "한빛고등학교", xp: 3985.7, isMe: false },
  { rank: 3, id: 103, name: "한국교원대학교부설고등학교", xp: 3720.2, isMe: false },
  { rank: 4, id: 104, name: "푸른숲고등학교", xp: 3342.5, isMe: false },
  { rank: 5, id: 105, name: "환희고등학교", xp: 3104.6, isMe: true },
  { rank: 6, id: 106, name: "새솔여자고등학교", xp: 2980.3, isMe: false },
  { rank: 7, id: 107, name: "한빛중학교", xp: 2840.8, isMe: false },
];

// 친구 랭킹 (나 포함, 기본 2위: 포디움)
const friendRankingsByScenario = {
  DEFAULT: [
    { rank: 1, id: 2, name: "장서후", xp: 5000, isMe: false },
    { rank: 2, id: 1, name: "김환희", xp: 2540, isMe: true },
    { rank: 3, id: 3, name: "오지우", xp: 2210, isMe: false },
    { rank: 4, id: 4, name: "김승민", xp: 1980, isMe: false },
    { rank: 5, id: 9, name: "정서홍", xp: 1720, isMe: false },
    { rank: 6, id: 12, name: "이서연", xp: 1450, isMe: false },
    { rank: 7, id: 13, name: "윤도현", xp: 1210, isMe: false },
  ],
  FEW: [
    { rank: 1, id: 2, name: "장서후", xp: 5000, isMe: false },
    { rank: 2, id: 1, name: "김환희", xp: 2540, isMe: true },
  ],
  NONE: [{ rank: 1, id: 1, name: "김환희", xp: 2540, isMe: true }],
} satisfies Record<string, RankingEntry[]>;

const friendRankings = friendRankingsByScenario[FRIEND_SCENARIO];

const findMyRanking = (rankings: RankingEntry[]) =>
  rankings.find((ranking) => ranking.isMe) ?? null;

// 탭별 랭킹 조회 응답
export const mockRankingResponses: Record<RankingTab, RankingResponse> = {
  TOTAL: {
    rankings: totalRankings,
    myRanking: { rank: 12, id: 1, name: "김환희", xp: 2540, isMe: true },
  },
  SCHOOL: IS_SCHOOL_UNREGISTERED
    ? {
        rankings: schoolRankings.map((ranking) => ({ ...ranking, isMe: false })),
        myRanking: null,
      }
    : { rankings: schoolRankings, myRanking: findMyRanking(schoolRankings) },
  FRIEND: { rankings: friendRankings, myRanking: findMyRanking(friendRankings) },
};
