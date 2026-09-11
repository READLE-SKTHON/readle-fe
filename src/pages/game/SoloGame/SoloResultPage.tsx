import { useNavigate } from "react-router-dom";

import blueCircle from "@/assets/icons/home/blueCircle.png";
import lightningIcon from "@/assets/icons/game/lightningIcon.png";
import targetIcon from "@/assets/icons/home/targetIcon.png";
import completeBeluga from "@/assets/images/game/CompleteBeluga.png";

import { useTodayTrainingResult } from "@/hooks/queries/useTraining";
import { useUserStore } from "@/stores/useUserStore";
import { getTrainingErrorMessage } from "@/utils/trainingMapper";

export default function SoloResultPage() {
  const navigate = useNavigate();
  const userId = useUserStore((state) => state.user?.id);
  const { data: result, isPending, error } = useTodayTrainingResult();
  if (!userId || isPending || error || !result) {
    return (
      <main className="flex min-h-screen flex-col px-7 pb-10 pt-20">
        <p role="status">
          {!userId
            ? "로그인이 필요합니다."
            : error
              ? getTrainingErrorMessage(error)
              : isPending
                ? "결과를 불러오는 중입니다."
                : "결과를 확인할 수 없습니다."}
        </p>
      </main>
    );
  }
  const total = result.totalQuestions;
  const correctCount = result.correctCount;
  const exp = result.earnedExp;
  const correctRate = result.accuracy;

  return (
    <main className="flex min-h-screen flex-col px-7 pb-10 pt-20">
      {/* 완료 캐릭터 */}
      <section className="relative flex flex-col items-center">
        {/* 배경 원 */}
        <img
          src={blueCircle}
          alt=""
          aria-hidden="true"
          className="absolute top-0 z-0 size-64 object-contain"
        />

        {/* 완료 벨루가 */}
        <img
          src={completeBeluga}
          alt="문제 풀이를 완료한 벨루가"
          className="relative z-10 w-64 object-contain"
        />

        <h1 className="relative z-10 mt-6 text-[24px] font-extrabold">오늘도 수고했어요!</h1>

        <p className="relative z-10 mt-4 text-[22px] font-medium text-[#5E5E5E]">
          {total}문제 중 {correctCount}문제를 맞혔어요
        </p>
      </section>

      {/* 결과 카드 */}
      <section className="mt-14 grid grid-cols-2 gap-4">
        <ResultCard icon={targetIcon} label="정답률" value={`${correctRate}%`} />

        <ResultCard icon={lightningIcon} label="획득 EXP" value={`+${exp}`} />
      </section>

      {/* 홈으로 */}
      <button
        type="button"
        onClick={() => navigate("/home")}
        className="mt-auto h-16 w-full cursor-pointer rounded-2xl bg-black text-[20px] font-bold text-white"
      >
        홈화면으로 가기
      </button>
    </main>
  );
}

type ResultCardProps = {
  icon: string;
  label: string;
  value: string;
};

function ResultCard({ icon, label, value }: ResultCardProps) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center rounded-3xl bg-[#F5F6FC]">
      <img src={icon} alt="" className="h-12 w-14 object-contain" />

      <p className="mt-1 text-[17px] font-semibold text-gray-400">{label}</p>

      <strong className="text-[34px] font-extrabold text-[#123BFF]">{value}</strong>
    </div>
  );
}
