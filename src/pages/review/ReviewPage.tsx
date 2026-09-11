import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import MainHeader from "@/components/common/header/MainHeader";
import AbilityChart from "@/components/review/AbilityChart";
import ReviewHero from "@/components/review/ReviewHero";
import { mockAbilityScores, mockReviewHeader } from "@/mocks/review";

export default function ReviewPage() {
  const navigate = useNavigate();

  // isolate: 히어로 배경 그라데이션을 콘텐츠 뒤에 두기 위한 쌓임 맥락
  return (
    <div className="isolate overflow-x-clip">
      {/* TODO: 알림 클릭 (디자인 없음) */}
      <MainHeader
        userName={mockReviewHeader.userName}
        notificationCount={mockReviewHeader.notificationCount}
      />

      <main className="px-5 pt-22 pb-6">
        <ReviewHero />

        {/* 약한 유형 모아보기 */}
        <button
          type="button"
          onClick={() => navigate("/review/types")}
          className="mt-7 flex w-full cursor-pointer items-center justify-between rounded-2xl bg-[#2285E3] py-6.5 pr-7 pl-8 text-left text-white transition-opacity hover:opacity-90 active:opacity-80"
        >
          <span>
            <span className="block text-[18px] font-bold">내 약한 유형 모아보기</span>

            <span className="block text-[16px] font-medium">최근 자주 틀린 유형부터 연습해요</span>
          </span>

          <ChevronRight className="size-8 shrink-0" />
        </button>

        {/* 내 문해력 능력치 */}
        <section className="mt-9">
          <h2 className="pl-2 text-[20px] font-bold text-black">내 문해력 능력치</h2>

          <AbilityChart abilities={mockAbilityScores} />
        </section>
      </main>
    </div>
  );
}
