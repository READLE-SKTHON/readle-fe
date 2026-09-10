import { useLocation, useNavigate } from "react-router-dom";

import completeBeluga from "@/assets/images/game/CompleteBeluga.png";
import lightningIcon from "@/assets/icons/game/lightningIcon.png";
import targetIcon from "@/assets/icons/home/targetIcon.png";

type ResultState = {
  total: number;
  correctCount: number;
  exp: number;
};

export default function SoloResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as ResultState | null;

  // 결과 데이터가 없을 때 임시 기본값
  const total = state?.total ?? 10;
  const correctCount = state?.correctCount ?? 4;
  const exp = state?.exp ?? 320;

  const correctRate = Math.round((correctCount / total) * 100);

  return (
    <main className="flex min-h-screen flex-col px-7 pb-10 pt-20">
      {/* 완료 캐릭터 */}
      <section className="flex flex-col items-center">
        <img src={completeBeluga} alt="문제 풀이를 완료한 벨루가" className="w-64 object-contain" />

        <h1 className="mt-6 text-[28px] font-extrabold">오늘도 수고했어요!</h1>

        <p className="mt-4 text-[22px] font-medium">
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
        onClick={() => navigate("/")}
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

      <p className="mt-1 text-[17px] font-bold text-gray-400">{label}</p>

      <strong className="text-[34px] font-extrabold text-[#123BFF]">{value}</strong>
    </div>
  );
}
