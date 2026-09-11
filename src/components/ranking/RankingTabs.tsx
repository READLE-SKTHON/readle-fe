import type { RankingTab } from "@/types/ranking";

type RankingTabsProps = {
  selectedTab: RankingTab;
  onSelect: (tab: RankingTab) => void;
};

const rankingTabs: { value: RankingTab; label: string }[] = [
  { value: "TOTAL", label: "전체" },
  { value: "SCHOOL", label: "학교" },
  { value: "FRIEND", label: "친구" },
];

// 전체 · 학교 · 친구 탭 (선택 여부와 관계없이 위치·크기 고정)
export default function RankingTabs({ selectedTab, onSelect }: RankingTabsProps) {
  return (
    <div role="tablist" className="grid grid-cols-3 gap-4">
      {rankingTabs.map(({ value, label }) => {
        const isSelected = value === selectedTab;

        return (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelect(value)}
            className={`h-10.5 cursor-pointer rounded-full text-[16px] font-bold transition-colors ${
              isSelected ? "bg-[#0A2A43] text-white" : "bg-[#E8F1F9] text-black"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
