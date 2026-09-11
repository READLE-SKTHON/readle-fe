import { FilePenLine, Target } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "@/components/common/button/Button";
import ReviewStatCard from "@/components/review/result/ReviewStatCard";

import completeBeluga from "@/assets/images/game/CompleteBeluga.png";

type ReviewResultState = {
  solvedCount: number;
  correctCount: number;
};

export default function ReviewResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as ReviewResultState | null;

  // 결과 데이터가 없을 때 임시 기본값
  const solvedCount = state?.solvedCount ?? 10;
  const correctCount = state?.correctCount ?? 7;

  const correctRate = solvedCount > 0 ? Math.round((correctCount / solvedCount) * 100) : 0;

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

      <section className="mt-7 flex flex-col gap-2.5">
        <ReviewStatCard icon={FilePenLine} label="오늘 푼 문제" value={`${solvedCount}개`} />

        <ReviewStatCard icon={Target} label="정답률" value={`${correctRate}%`} />
      </section>

      <div className="mt-3.5 flex flex-col gap-3">
        <Button
          label="다른 유형 더풀기"
          variant="black"
          onClick={() => navigate("/review/types", { replace: true })}
        />

        <Button
          label="홈 화면으로 가기"
          variant="gray"
          onClick={() => navigate("/home", { replace: true })}
        />
      </div>
    </main>
  );
}
