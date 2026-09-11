import type { RankingEntry } from "@/types/ranking";
import { formatXp } from "@/utils/formatXp";

export type PodiumRank = 1 | 2 | 3;

type PodiumCardProps = {
  rank: PodiumRank;

  // 빈 자리 (인원 3명 미만)
  entry?: RankingEntry;
};

// 순위별 카드 상단 그라데이션 · XP 색상 (금 · 은청 · 동)
const podiumStyles: Record<PodiumRank, { gradient: string; xpColor: string }> = {
  1: { gradient: "from-[#FFD95A]", xpColor: "text-[#A8900E]" },
  2: { gradient: "from-[#7FA8E8]", xpColor: "text-[#5D7FA8]" },
  3: { gradient: "from-[#C98A63]", xpColor: "text-[#8C5E45]" },
};

// 포디움 이름 카드 (내 항목 파란 볼드, 빈 자리 "-")
export default function PodiumCard({ rank, entry }: PodiumCardProps) {
  const { gradient, xpColor } = podiumStyles[rank];

  return (
    <div
      className={`flex h-16 min-w-0 flex-col items-center justify-center rounded-2xl bg-linear-to-b ${gradient} to-white to-35% px-1 shadow-[0_2px_12px_rgba(34,133,227,0.10)]`}
    >
      {entry ? (
        <>
          <p
            className={`w-full truncate text-center text-[16px] ${
              entry.isMe ? "font-bold text-[#0083FF]" : "font-bold text-black"
            }`}
          >
            {entry.name}
          </p>

          <p className={`max-w-full truncate text-[16px] font-bold ${xpColor}`}>
            {formatXp(entry.xp)}
          </p>
        </>
      ) : (
        <p className="text-[16px] font-medium text-[#8F8F8F]">-</p>
      )}
    </div>
  );
}
