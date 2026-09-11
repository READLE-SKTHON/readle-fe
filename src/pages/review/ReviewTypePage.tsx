import { useNavigate } from "react-router-dom";

import Header from "@/components/common/header/Header";
import CharacterShadow from "@/components/game/friend/CharacterShadow";
import ReviewTypeCard from "@/components/review/ReviewTypeCard";
import { mockReviewTypes } from "@/mocks/review";
import { MAX_DAILY_REVIEW_XP, REVIEW_XP_PER_TYPE, useReviewStore } from "@/stores/useReviewStore";

import newsBeluga from "@/assets/images/newsBeluga.png";

export default function ReviewTypePage() {
  const navigate = useNavigate();

  const xpEarnedTypeIds = useReviewStore((state) => state.xpEarnedTypeIds);

  // 오늘 획득 XP (일일 최대치 제한)
  const todayXp = Math.min(xpEarnedTypeIds.length * REVIEW_XP_PER_TYPE, MAX_DAILY_REVIEW_XP);

  return (
    <div className="min-h-screen pb-10">
      <Header title="훈련하기" backPath="/review" />

      <main className="px-4">
        <section className="mt-3 flex flex-col items-center">
          <img src={newsBeluga} alt="신문을 읽는 벨루가" className="w-46 object-contain" />

          <CharacterShadow className="w-36" />

          <h2 className="mt-6 text-[24px] font-extrabold text-black">어떤 유형을 연습할까요?</h2>

          <p className="text-center text-[16px] leading-5 font-bold text-[#8F8F8F]">
            틀렸던 문제를 바탕으로,
            <br />
            지금 나에게 필요한 유형을 골라보세요
          </p>

          {/* 오늘 훈련 획득 가능 XP */}
          <span className="mt-3 rounded-full bg-[#CEE5F8] px-3 py-1 text-[13px] font-bold text-[#2285E3]">
            오늘 훈련에서 획득할 수 있는 XP {todayXp}/{MAX_DAILY_REVIEW_XP}
          </span>
        </section>

        <ul className="mt-4 flex flex-col gap-2.5">
          {mockReviewTypes.map((reviewType) => (
            <li key={reviewType.typeId}>
              <ReviewTypeCard
                reviewType={reviewType}
                isXpEarned={xpEarnedTypeIds.includes(reviewType.typeId)}
                onClick={() => navigate(`/review/play/${reviewType.typeId}`)}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
