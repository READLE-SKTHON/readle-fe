import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/common/header/Header";
import ConfirmModal from "@/components/common/modal/ConfirmModal";
import ErrorState from "@/components/common/status/ErrorState";
import LoadingState from "@/components/common/status/LoadingState";
import CharacterShadow from "@/components/game/friend/CharacterShadow";
import ReviewTypeCard from "@/components/review/type/ReviewTypeCard";
import useReviewCategoriesQuery from "@/queries/review/useReviewCategoriesQuery";
import type { ReviewCategory } from "@/types/review";
import { getApiError } from "@/utils/getApiError";

import newsBeluga from "@/assets/images/newsBeluga.png";

export default function ReviewTypePage() {
  const navigate = useNavigate();

  const { data, isError, error, refetch } = useReviewCategoriesQuery();

  // 틀린 문제 없음 안내 모달
  const [isEmptyModalOpen, setIsEmptyModalOpen] = useState(false);

  // 유형 선택 처리 (틀린 문제 있으면 세부 유형 목록 이동, 없으면 안내 모달)
  const handleSelectType = ({ mainCategory, wrongCount }: ReviewCategory) => {
    if (wrongCount === 0) {
      setIsEmptyModalOpen(true);
      return;
    }

    navigate(`/review/types/${mainCategory}`);
  };

  // 조회 실패 안내 문구 (받아온 목록 없을 때만)
  const errorMessage = isError && !data ? getApiError(error).message : null;

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
        </section>

        {errorMessage ? (
          <ErrorState message={errorMessage} onRetry={() => refetch()} className="mt-10" />
        ) : !data ? (
          <LoadingState message="유형을 불러오는 중이에요" className="mt-10" />
        ) : (
          <ul className="mt-4 flex flex-col gap-2.5">
            {data.categories.map((category) => (
              <li key={category.mainCategory}>
                <ReviewTypeCard category={category} onClick={() => handleSelectType(category)} />
              </li>
            ))}
          </ul>
        )}
      </main>

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
