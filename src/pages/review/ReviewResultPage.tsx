import { useState } from "react";
import { FilePenLine, Target } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

import Button from "@/components/common/button/Button";
import ErrorState from "@/components/common/status/ErrorState";
import LoadingState from "@/components/common/status/LoadingState";
import ReviewStatCard from "@/components/review/result/ReviewStatCard";
import useReviewResultQuery from "@/queries/review/useReviewResultQuery";
import { useReviewStore } from "@/stores/useReviewStore";
import { getApiError } from "@/utils/getApiError";

import completeBeluga from "@/assets/images/game/CompleteBeluga.png";

export default function ReviewResultPage() {
  const navigate = useNavigate();

  // 진입 시점 복습 세션 (나가기 처리 중 이동 경로 덮어쓰기 방지)
  const [session] = useState(() => useReviewStore.getState().session);
  const clearSession = useReviewStore((state) => state.clearSession);

  const { data, isError, error, refetch } = useReviewResultQuery(session?.reviewSessionId ?? null);

  // 복습 세션 없이 진입 시 유형 선택 이동
  if (!session) return <Navigate to="/review/types" replace />;

  // 복습 종료 후 이동 처리 (세션 초기화)
  const handleLeave = (path: string) => {
    navigate(path, { replace: true });
    clearSession();
  };

  // 조회 실패 안내 문구 (받아온 결과 없을 때만)
  const errorMessage = isError && !data ? getApiError(error).message : null;

  return (
    <main className="flex min-h-dvh flex-col px-6.5 pt-18 pb-10">
      <section className="flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          {/* 캐릭터 뒤 파란 원형 방사형 배경 */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 -right-8 size-52 -translate-y-1/2 bg-radial-[closest-side] from-[#CEE5F8] to-transparent"
          />

          <img
            src={completeBeluga}
            alt="복습을 완료한 벨루가"
            className="relative w-67 object-contain"
          />
        </div>

        <h1 className="mt-1.5 text-[24px] font-extrabold text-black">오늘도 수고했어요!</h1>

        <p className="mt-3 text-center text-[24px] leading-7 font-medium text-[#5E5E5E]">
          틀린문제를 다시 풀며
          <br />한 걸음 더 성장했어요.
        </p>
      </section>

      {errorMessage ? (
        <ErrorState message={errorMessage} onRetry={() => refetch()} className="mt-7" />
      ) : !data ? (
        <LoadingState message="결과를 불러오는 중이에요" className="mt-7" />
      ) : (
        <section className="mt-7 flex flex-col gap-2.5">
          <ReviewStatCard
            icon={FilePenLine}
            label="오늘 푼 문제"
            value={`${data.totalQuestions}개`}
          />

          <ReviewStatCard icon={Target} label="정답률" value={`${data.accuracy}%`} />
        </section>
      )}

      <div className="mt-3.5 flex flex-col gap-3">
        <Button
          label="다른 유형 더풀기"
          variant="black"
          onClick={() => handleLeave("/review/types")}
        />

        <Button label="홈 화면으로 가기" variant="gray" onClick={() => handleLeave("/home")} />
      </div>
    </main>
  );
}
