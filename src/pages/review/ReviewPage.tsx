import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import MainHeader from "@/components/common/header/MainHeader";
import ErrorState from "@/components/common/status/ErrorState";
import LoadingState from "@/components/common/status/LoadingState";
import AbilityChart from "@/components/review/main/AbilityChart";
import ReviewHero from "@/components/review/main/ReviewHero";
import useUser from "@/hooks/useUser";
import { mockAverageSkillScores, mockReviewHeader } from "@/mocks/review";
import useSkillResultsQuery from "@/queries/review/useSkillResultsQuery";
import { getApiError } from "@/utils/getApiError";
import { toAbilityScores } from "@/utils/toAbilityScores";

export default function ReviewPage() {
  const navigate = useNavigate();

  const { user } = useUser();

  // 내 문해력 능력치 (전체 평균 API 미제공으로 목데이터)
  const { data, isError, error, refetch } = useSkillResultsQuery();

  // 조회 실패 안내 문구 (받아온 능력치 없을 때만)
  const errorMessage = isError && !data ? getApiError(error).message : null;

  // isolate: 히어로 배경 그라데이션을 콘텐츠 뒤에 두기 위한 쌓임 맥락
  return (
    <div className="isolate overflow-x-clip">
      {/* TODO: 알림 클릭 (디자인 없음) */}
      <MainHeader userName={user.nickname} notificationCount={mockReviewHeader.notificationCount} />

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

          {errorMessage ? (
            <ErrorState message={errorMessage} onRetry={() => refetch()} className="mt-6" />
          ) : !data ? (
            <LoadingState message="능력치를 불러오는 중이에요" className="mt-6" />
          ) : (
            <AbilityChart abilities={toAbilityScores(data.skillResults, mockAverageSkillScores)} />
          )}
        </section>
      </main>
    </div>
  );
}
