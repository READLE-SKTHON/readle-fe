import { Navigate, useNavigate, useParams } from "react-router-dom";

import Header from "@/components/common/header/Header";
import ConfirmModal from "@/components/common/modal/ConfirmModal";
import ErrorState from "@/components/common/status/ErrorState";
import LoadingState from "@/components/common/status/LoadingState";
import ReviewGroupCard from "@/components/review/group/ReviewGroupCard";
import { MAIN_CATEGORY_LABELS } from "@/config/questionCategoryConfig";
import useReviewGroupsQuery from "@/queries/review/useReviewGroupsQuery";
import useStartReviewMutation from "@/queries/review/useStartReviewMutation";
import type { QuestionMainCategory } from "@/types/game";
import type { ReviewGroup } from "@/types/review";
import { getApiError } from "@/utils/getApiError";

// 주소의 유형 값 검증
const isMainCategory = (value?: string): value is QuestionMainCategory =>
  value !== undefined && value in MAIN_CATEGORY_LABELS;

export default function ReviewGroupPage() {
  const { mainCategory } = useParams();

  // 잘못된 유형 주소 진입 시 유형 선택 이동
  if (!isMainCategory(mainCategory)) return <Navigate to="/review/types" replace />;

  return <ReviewGroupContent mainCategory={mainCategory} />;
}

type ReviewGroupContentProps = {
  mainCategory: QuestionMainCategory;
};

// 선택한 유형의 날짜·세부 유형별 틀린 문제 목록
function ReviewGroupContent({ mainCategory }: ReviewGroupContentProps) {
  const navigate = useNavigate();

  const { data, isError, error, refetch } = useReviewGroupsQuery(mainCategory);

  const {
    mutate: startReview,
    isPending: isStarting,
    error: startError,
    reset: resetStartError,
  } = useStartReviewMutation();

  // 세부 유형 선택 처리 (복습 시작 후 문제 풀이 이동)
  const handleSelectGroup = ({ subCategory, date }: ReviewGroup) => {
    if (isStarting) return;

    startReview({ mainCategory, subCategory, date }, { onSuccess: () => navigate("/review/play") });
  };

  // 조회 실패 안내 문구 (받아온 목록 없을 때만)
  const errorMessage = isError && !data ? getApiError(error).message : null;

  return (
    <div className="min-h-screen pb-10">
      <Header title={MAIN_CATEGORY_LABELS[mainCategory]} backPath="/review/types" />

      <main className="px-5">
        {/* 복습 XP 안내 */}
        <p className="mt-12 text-center text-[18px] leading-7 font-bold text-[#5E5E5E]">
          복습하고 정답일시
          <br />
          문제당 1XP가 추가로 주어집니다
        </p>

        {errorMessage ? (
          <ErrorState message={errorMessage} onRetry={() => refetch()} className="mt-12" />
        ) : !data ? (
          <LoadingState message="틀린 문제를 불러오는 중이에요" className="mt-12" />
        ) : data.groups.length === 0 ? (
          <p className="mt-12 text-center text-[16px] font-semibold text-[#8F8F8F]">
            이 유형으로 틀린 문제가 없어요
          </p>
        ) : (
          <ul className="mt-12 flex flex-col gap-3">
            {data.groups.map((group) => (
              <li key={`${group.subCategory}-${group.date}`}>
                <ReviewGroupCard
                  group={group}
                  disabled={isStarting}
                  onClick={() => handleSelectGroup(group)}
                />
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* 복습 시작 실패 안내 */}
      {startError && (
        <ConfirmModal message={getApiError(startError).message} onConfirm={resetStartError} />
      )}
    </div>
  );
}
