import type {
  RankingEntry,
  RankingResponse,
  SchoolRankingResponse,
  TotalRankingResponse,
} from "@/types/ranking";

type RankingSource = {
  rank: number;
  name: string;
  xp: number;
};

// 랭킹 응답 화면 표시용 변환 (서버 id 미제공으로 이름 기준 내 항목 판단)
const toRankingResponse = (
  items: RankingSource[],
  myItem: RankingSource | null,
  myName: string | null,
): RankingResponse => {
  const rankings: RankingEntry[] = items.map((item, index) => ({
    ...item,
    id: index,
    isMe: item.name === myName,
  }));

  return {
    rankings,

    // 내 순위 (목록 밖이면 서버 내 순위, 목록 안이면 목록 내 항목)
    myRanking: myItem
      ? { ...myItem, id: rankings.length, isMe: true }
      : (rankings.find((entry) => entry.isMe) ?? null),
  };
};

// 전체 랭킹 변환 (닉네임 · 누적 XP)
export const toTotalRanking = (
  { rankings, myRank }: TotalRankingResponse,
  myNickname: string,
): RankingResponse =>
  toRankingResponse(
    rankings.map(({ rank, nickname, xp }) => ({ rank, name: nickname, xp })),
    myRank && { rank: myRank.rank, name: myRank.nickname, xp: myRank.xp },
    myNickname,
  );

// 학교 랭킹 변환 (학교명 · 소속 학생 평균 XP)
export const toSchoolRanking = (
  { rankings, myRank }: SchoolRankingResponse,
  mySchoolName: string | null,
): RankingResponse =>
  toRankingResponse(
    rankings.map(({ rank, schoolName, avgXp }) => ({ rank, name: schoolName, xp: avgXp })),
    myRank && { rank: myRank.rank, name: myRank.schoolName, xp: myRank.avgXp },
    mySchoolName,
  );
