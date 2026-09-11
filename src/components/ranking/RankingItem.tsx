import type { CSSProperties } from "react";

import type { RankingEntry } from "@/types/ranking";
import { formatXp } from "@/utils/formatXp";

type RankingItemProps = {
  entry: RankingEntry;

  // 이름 파란 볼드 강조 (학교 탭 내 소속 학교)
  isNameEmphasized?: boolean;

  className?: string;
  style?: CSSProperties;
};

// 4위 이하 순위 행 (내 항목 파란 배경)
export default function RankingItem({
  entry,
  isNameEmphasized = false,
  className = "",
  style,
}: RankingItemProps) {
  return (
    <li
      style={style}
      className={`flex h-14 items-center rounded-2xl pr-5 pl-9 ${
        entry.isMe ? "bg-[#E8F1F9]" : "bg-white shadow-[0_2px_12px_rgba(34,133,227,0.10)]"
      } ${className}`}
    >
      <span className="w-14 shrink-0 text-[16px] font-bold text-black">{entry.rank}</span>

      <span
        className={`min-w-0 flex-1 truncate text-[16px] font-bold ${
          isNameEmphasized ? "text-[#0083FF]" : "text-black"
        }`}
      >
        {entry.name}
      </span>

      <span className="ml-3 shrink-0 text-[16px] font-bold text-black">{formatXp(entry.xp)}</span>
    </li>
  );
}
