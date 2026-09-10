import MainHeader from "@/components/common/header/MainHeader";

import { useNavigate } from "react-router-dom";

export default function ReviewPage() {
  const navigate = useNavigate();

  return (
    <div>
      <MainHeader userName="김환희" />
      <main className="min-h-screen px-5 pt-5">
        {/* 안내 문구 */}
        <section className="pt-8">
          <h1 className="text-2xl font-bold leading-snug">
            틀린 문제를 다시 풀며 문해력을
            <br />더 단단하게!
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            틀렸던 문제를 분석해 나에게
            <br />
            필요한 훈련을 모았어요
          </p>
        </section>

        {/* 약한 유형 */}
        <button
          type="button"
          onClick={() => navigate("/review/types")}
          className="
          mt-8 flex w-full items-center justify-between
          rounded-2xl bg-[#E8F4FF] px-6 py-6 text-left
        "
        >
          <div>
            <h2 className="text-lg font-bold">내 약한 유형 모아보기</h2>

            <p className="mt-1 text-sm text-gray-500">최근 자주 틀린 유형부터 연습해요</p>
          </div>

          <span className="text-3xl text-[#168CF2]">›</span>
        </button>

        {/* 문해력 능력치 */}
        <section className="mt-7">
          <h2 className="text-lg font-bold">내 문해력 능력치</h2>

          <div className="mt-4 flex h-72 items-center justify-center rounded-2xl bg-white">
            {/* 이후 RadarChart 컴포넌트 넣기 */}
            <p className="text-sm text-gray-400">문해력 차트 영역</p>
          </div>
        </section>
      </main>
    </div>
  );
}
