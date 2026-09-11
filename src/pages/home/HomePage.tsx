import { useNavigate } from "react-router-dom";

import MainHeader from "@/components/common/header/MainHeader";
import StatCard from "@/components/home/StatCard";

import beluga from "@/assets/icons/home/Beluga.png";
import bookIcon from "@/assets/icons/home/bookIcon.png";
import fireIcon from "@/assets/icons/home/fireIcon.png";
import newsIcon from "@/assets/icons/home/newsIcon.png";
import targetIcon from "@/assets/icons/home/targetIcon.png";
import blueCircle from "@/assets/icons/home/blueCircle.png";

import shadow from "@/assets/images/Shadow.png";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="mb-10">
      <MainHeader userName="김환희" />

      <div className="px-5">
        {/* 메인 문구 */}
        <section className="relative mt-15">
          <p className="text-lg font-semibold text-gray-500">좋은 아침이에요!</p>

          <h1 className="mt-3 text-[24px] font-bold text-[#0A2A43]">오늘도 한 걸음 더!</h1>

          <p className="mt-1 text-[16px] font-bold leading-snug text-gray-500">
            오늘 읽은 뉴스 한 장이
            <br />
            내일의 너를 더 발전 시킬꺼야
          </p>

          {/* 배경 원 */}
          <img
            src={blueCircle}
            alt=""
            aria-hidden="true"
            className="absolute -right-3 -top-6 size-40 object-contain"
          />

          {/* 벨루가 */}
          <img
            src={beluga}
            alt="벨루가 캐릭터"
            className="absolute -right-1 top-2 z-10 w-36 object-contain"
          />
        </section>

        {/* 레벨 카드 */}
        <section className="mt-5 rounded-3xl border border-white bg-[#EAF5FD] px-5 py-5 shadow-md">
          <p className="text-2xl font-bold text-[#2F8DE4]">Lv. 1</p>

          <h2 className="mt-1 text-3xl font-bold text-[#071D2E]">문장 수집가</h2>

          <p className="mt-2 text-lg font-semibold text-gray-400">글이랑 낯가리는 중이에요!</p>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-5 flex-1 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-[64%] rounded-full bg-[#2F95F5]" />
            </div>

            <span className="whitespace-nowrap text-sm font-semibold text-gray-400">
              320/500 XP
            </span>
          </div>
        </section>

        {/* 통계 */}
        <section className="mt-4 grid grid-cols-3 gap-3">
          <StatCard icon={fireIcon} value="7일" label="연속학습" />
          <StatCard icon={bookIcon} value="2개" label="읽은 뉴스" />
          <StatCard icon={targetIcon} value="80%" label="정답률" />
        </section>

        {/* 오늘의 뉴스 */}
        <section className="mt-9">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#0A2A43]">오늘의 뉴스</h2>

            <button
              type="button"
              onClick={() => navigate("/game/solo")}
              className="group flex cursor-pointer items-center gap-1 text-sm font-medium text-gray-500"
            >
              <span className="underline-offset-4 group-hover:underline group-active:underline">
                게임하기
              </span>

              <span className="pb-1 text-xl leading-none">›</span>
            </button>
          </div>

          {/* 뉴스 카드 */}
          <article className="mt-4 flex items-center gap-4 rounded-2xl bg-[#F5F6FB] p-4">
            {/* 뉴스 이미지 + 그림자 */}
            <div className="relative size-20 shrink-0">
              {/* 그림자 */}
              <img
                src={shadow}
                alt=""
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 z-0 w-14 -translate-x-1/2 object-contain"
              />

              {/* 뉴스 이미지 */}
              <img
                src={newsIcon}
                alt="뉴스"
                className="relative z-10 size-20 -translate-y-2 object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#2F8DE4]">경제</p>

              <h3 className="mt-1 text-lg font-bold text-black">오늘의 뉴스</h3>

              <p className="mt-1 line-clamp-2 text-sm leading-snug text-gray-400">
                지속되는 물가상승으로 인해 가계의 생활비 부담이 커지고 있으며, 소비 심리도 위축되고
                있다는 분석이...
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
