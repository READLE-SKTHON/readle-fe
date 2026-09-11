import { Trophy } from "lucide-react";

import PlayerRow from "@/components/game/friend/PlayerRow";
import type { RankingItem } from "@/types/game";

// 순위 행 순차 등장 간격 (ms)
const ROW_APPEAR_DELAY_MS = 150;

type RankingListProps = {
  rankings: RankingItem[];
  myUserId: number;
};

export default function RankingList({ rankings, myUserId }: RankingListProps) {
  // 최고 누적 점수 (동점이면 모두 1위 강조, 0점이면 강조 없음)
  const topScore = Math.max(0, ...rankings.map((item) => item.totalScore));

  return (
    <ul className="divide-y divide-[#E3E2E2]">
      {rankings.map((item, index) => {
        const isTop = topScore > 0 && item.totalScore === topScore;

        return (
          <PlayerRow
            key={item.userId}
            nickname={item.nickname}
            profileImageUrl={item.profileImageUrl}
            isMe={item.userId === myUserId}
            isHighlighted={isTop}
            // 한 줄씩 아래에서 위로 fade in
            className="transition duration-500 ease-out starting:translate-y-4 starting:opacity-0"
            style={{ transitionDelay: `${index * ROW_APPEAR_DELAY_MS}ms` }}
            leading={<RankBadge rank={isTop ? 1 : item.rank} />}
            trailing={
              <span className={`text-[18px] font-bold ${isTop ? "text-[#FF4D4F]" : "text-black"}`}>
                {item.totalScore}점
              </span>
            }
          />
        );
      })}
    </ul>
  );
}

type RankBadgeProps = {
  rank: number;
};

// 순위 표시 (1위 트로피, 2위 원형 배지, 3위 이하 숫자)
function RankBadge({ rank }: RankBadgeProps) {
  if (rank === 1) {
    return <Trophy aria-label="1위" className="size-7 shrink-0 fill-[#FFD900] text-[#FFD900]" />;
  }

  if (rank === 2) {
    return (
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#CEE5F8] text-[14px] font-bold text-[#2285E3]">
        2
      </span>
    );
  }

  return <span className="w-7 shrink-0 text-center text-[16px] font-bold text-black">{rank}</span>;
}
