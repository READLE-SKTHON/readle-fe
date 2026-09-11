import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/common/header/Header";
import ConfirmModal from "@/components/common/modal/ConfirmModal";
import CharacterShadow from "@/components/game/friend/CharacterShadow";
import ReviewTypeCard from "@/components/review/type/ReviewTypeCard";
import { mockReviewTypes } from "@/mocks/review";
import { MAX_DAILY_REVIEW_XP, REVIEW_XP_PER_TYPE, useReviewStore } from "@/stores/useReviewStore";
import type { ReviewStatus, ReviewTypeId } from "@/types/review";
import { getReviewTargets } from "@/utils/getReviewTargets";
import { getToday } from "@/utils/getToday";

import newsBeluga from "@/assets/images/newsBeluga.png";

export default function ReviewTypePage() {
  const navigate = useNavigate();

  const xpEarnedTypeIds = useReviewStore((state) => state.xpEarnedTypeIds);
  const xpEarnedDate = useReviewStore((state) => state.xpEarnedDate);
  const wrongAnswers = useReviewStore((state) => state.wrongAnswers);

  // 재복습 확인 유형 (오늘 모두 복습한 유형)
  const [retryTypeId, setRetryTypeId] = useState<ReviewTypeId | null>(null);

  // 틀린 문제 없음 안내 모달
  const [isEmptyModalOpen, setIsEmptyModalOpen] = useState(false);

  // 오늘 XP 획득 유형 (날짜 변경 시 초기화)
  const todayXpTypeIds: ReviewTypeId[] = xpEarnedDate === getToday() ? xpEarnedTypeIds : [];

  // 오늘 획득 XP (일일 최대치 제한)
  const todayXp = Math.min(todayXpTypeIds.length * REVIEW_XP_PER_TYPE, MAX_DAILY_REVIEW_XP);

  // 유형 선택 (복습 전 오답 있으면 복습 이동, 없으면 상태별 모달)
  const handleSelectType = (typeId: ReviewTypeId, status: ReviewStatus) => {
    if (status === "UNREVIEWED") {
      navigate(`/review/play/${typeId}`);
      return;
    }

    if (status === "REVIEWED") {
      setRetryTypeId(typeId);
      return;
    }

    setIsEmptyModalOpen(true);
  };

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
          {mockReviewTypes.map((reviewType) => {
            const { status, targets } = getReviewTargets(wrongAnswers, reviewType.typeId);

            // 복습 전 오답 개수 (오늘 모두 복습 시 0개)
            const wrongCount = status === "UNREVIEWED" ? targets.length : 0;

            return (
              <li key={reviewType.typeId}>
                <ReviewTypeCard
                  reviewType={{ ...reviewType, wrongCount }}
                  isXpEarned={todayXpTypeIds.includes(reviewType.typeId)}
                  onClick={() => handleSelectType(reviewType.typeId, status)}
                />
              </li>
            );
          })}
        </ul>
      </main>

      {/* 재복습 확인 모달 */}
      {retryTypeId && (
        <ConfirmModal
          message={"현재 모든 문제를 다 복습했습니다.\n다시 복습하시겠습니까?"}
          confirmLabel="예"
          cancelLabel="아니오"
          onConfirm={() => navigate(`/review/play/${retryTypeId}`)}
          onCancel={() => setRetryTypeId(null)}
        />
      )}

      {/* 틀린 문제 없음 안내 모달 */}
      {isEmptyModalOpen && (
        <ConfirmModal
          message="이 유형으로 틀린 문제가 없습니다."
          onConfirm={() => setIsEmptyModalOpen(false)}
        />
      )}
    </div>
  );
}
