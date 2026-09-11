import { useState } from "react";

import MainHeader from "@/components/common/header/MainHeader";
import Podium from "@/components/ranking/Podium";
import RankingItem from "@/components/ranking/RankingItem";
import RankingNotice from "@/components/ranking/RankingNotice";
import RankingTabs from "@/components/ranking/RankingTabs";
import useRanking from "@/hooks/useRanking";
import useRankingDisplay from "@/hooks/useRankingDisplay";
import { mockRankingHeader } from "@/mocks/ranking";
import type { RankingEntry, RankingTab } from "@/types/ranking";
import { formatSchoolName } from "@/utils/formatSchoolName";

import friendRanking from "@/assets/images/ranking/FriendRanking.png";
import schoolRanking from "@/assets/images/ranking/SchoolRanking.png";
import wholeRanking from "@/assets/images/ranking/WholeRanking.png";

// 탭별 포디움 일러스트
const podiumImages: Record<RankingTab, string> = {
  TOTAL: wholeRanking,
  SCHOOL: schoolRanking,
  FRIEND: friendRanking,
};

// 순위 행 순차 등장 간격 / 아래에서 위로 fade in
const ROW_APPEAR_DELAY_MS = 150;
const ROW_APPEAR_CLASS_NAME =
  "transition duration-500 ease-out starting:translate-y-4 starting:opacity-0";

const getRowAppearStyle = (index: number) => ({
  transitionDelay: `${index * ROW_APPEAR_DELAY_MS}ms`,
});

export default function RankingPage() {
  const [selectedTab, setSelectedTab] = useState<RankingTab>("TOTAL");

  const ranking = useRanking(selectedTab);
  const { podium, listItems, outOfRangeMyRanking } = useRankingDisplay(ranking);

  const isSchoolTab = selectedTab === "SCHOOL";

  // 표시 이름 (전체·친구: 내 항목 "나", 학교: 축약 학교명)
  const toDisplayEntry = (entry: RankingEntry): RankingEntry => {
    if (isSchoolTab) return { ...entry, name: formatSchoolName(entry.name) };

    return entry.isMe ? { ...entry, name: "나" } : entry;
  };

  // 디자인 없는 상태 안내
  // TODO: 학교 등록 · 친구 추가 이동 (디자인 없음)
  let notice: string | null = null;

  if (isSchoolTab && !ranking.myRanking) {
    notice = "소속 학교를 등록하면 우리 학교 순위를 볼 수 있어요";
  }

  if (selectedTab === "FRIEND" && ranking.rankings.length <= 1) {
    notice = "친구를 추가하고 함께 순위를 겨뤄보세요";
  }

  // isolate: 포디움 배경 그라데이션을 콘텐츠 뒤에 두기 위한 쌓임 맥락
  return (
    <div className="isolate overflow-x-clip">
      {/* TODO: 알림 클릭 (디자인 없음) */}
      <MainHeader
        userName={mockRankingHeader.userName}
        notificationCount={mockRankingHeader.notificationCount}
      />

      <main className="px-5 pt-15 pb-6">
        <div className="px-2.5">
          <RankingTabs selectedTab={selectedTab} onSelect={setSelectedTab} />
        </div>

        <div className="mt-8">
          <Podium image={podiumImages[selectedTab]} entries={podium.map(toDisplayEntry)} />
        </div>

        {isSchoolTab && (
          <p className="mt-4 px-2 text-[13px] font-medium text-[#5E5E5E]">학교별 평균 XP 기준</p>
        )}

        {/* 탭 전환 시 목록 다시 등장 */}
        <ul key={selectedTab} className="mt-2 flex flex-col gap-2 px-2">
          {listItems.map((entry, index) => (
            <RankingItem
              key={entry.id}
              entry={toDisplayEntry(entry)}
              isNameEmphasized={isSchoolTab && entry.isMe}
              className={ROW_APPEAR_CLASS_NAME}
              style={getRowAppearStyle(index)}
            />
          ))}

          {/* 표시 범위 밖 내 순위 (6위 아래) */}
          {outOfRangeMyRanking && (
            <RankingItem
              entry={toDisplayEntry(outOfRangeMyRanking)}
              isNameEmphasized={isSchoolTab}
              className={ROW_APPEAR_CLASS_NAME}
              style={getRowAppearStyle(listItems.length)}
            />
          )}
        </ul>

        {notice && (
          <div className="mt-3 px-2">
            <RankingNotice message={notice} />
          </div>
        )}
      </main>
    </div>
  );
}
