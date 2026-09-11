import { useGameStore } from "@/stores/useGameStore";
import type { RankingItem } from "@/types/game";
import type { Participant } from "@/types/room";

// 누적 점수 높은 순 순위 (동점은 참여자 순서대로)
export default function useGameRanking(participants: Participant[]): RankingItem[] {
  const totalScores = useGameStore((state) => state.totalScores);

  // TODO: 서버 순위 수신으로 교체
  return participants
    .map((participant) => ({ ...participant, totalScore: totalScores[participant.userId] ?? 0 }))
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((participant, index) => ({ ...participant, rank: index + 1 }));
}
