import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import MainHeader from "@/components/common/header/MainHeader";
import StatCard from "@/components/home/StatCard";

import blueCircle from "@/assets/icons/home/blueCircle.png";
import bookIcon from "@/assets/icons/home/bookIcon.png";
import fireIcon from "@/assets/icons/home/fireIcon.png";
import newsIcon from "@/assets/icons/home/newsIcon.png";
import targetIcon from "@/assets/icons/home/targetIcon.png";

import shadow from "@/assets/images/Shadow.png";

import type { UserLevel } from "@/config/gameLevelConfig";
import { LEVEL_CONFIG } from "@/config/levelConfig";
import { useHome } from "@/hooks/queries/useHome";

// 레벨별 캐릭터 세로 위치·크기 (이미지 여백 차이 보정, 레벨 배너 위 안착)
const CHARACTER_CLASS_NAMES: Record<UserLevel, string> = {
  1: "top-2 w-36",
  2: "top-5.5 w-36",
  3: "top-5 w-36",
  4: "-top-5 w-45",
  5: "-top-5.5 w-45",
};

export default function HomePage() {
  const navigate = useNavigate();

  // 홈 사용자 정보·학습 통계·오늘의 기사
  const { data: home, isLoading, isError } = useHome();
  const levelInfo = LEVEL_CONFIG.find(({ level }) => level === home?.level) ?? LEVEL_CONFIG[0];
  const levelProgress = home && home.maxXp > 0
    ? Math.min(100, Math.max(0, (home.xp / home.maxXp) * 100))
    : 0;

  return (
    <main>
      <MainHeader userName={home?.nickname ?? ""} />

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

          {/* 레벨별 벨루가 */}
          <img
            src={levelInfo.character}
            alt="벨루가 캐릭터"
            className={`absolute -right-1 ${CHARACTER_CLASS_NAMES[levelInfo.level]} z-10 object-contain`}
          />
        </section>

        {/* 레벨 카드 */}
        <section
          className="
            mt-5
            rounded-3xl
            border-2 border-white
            bg-[#E8F1F9]
            px-5 py-3
            shadow-[0_0_20px_5px_rgba(47,141,228,0.12)]
          "
        >
          <p className="text-2xl font-extrabold text-[#2F8DE4]">Lv. {home?.level ?? "-"}</p>

          <h2 className="mt-0.5 text-2xl font-extrabold text-[#071D2E]">{home ? levelInfo.title : "-"}</h2>

          <p className="mt-1 text-md font-semibold text-gray-400">
            {home ? levelInfo.description : isLoading ? "홈 정보를 불러오는 중이에요." : "홈 정보를 불러오지 못했습니다."}
          </p>

          <div className="mt-2 flex items-center gap-3">
            <div className="h-5 flex-1 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-[#2F95F5]"
                style={{ width: `${levelProgress}%` }}
              />
            </div>

            <span className="whitespace-nowrap text-sm font-semibold text-gray-400">
              {home?.xp.toLocaleString("ko-KR") ?? "-"}/{home?.maxXp.toLocaleString("ko-KR") ?? "-"} XP
            </span>
          </div>
        </section>

        {/* 통계 */}
        <section className="mt-4 grid grid-cols-3 gap-3">
          <StatCard icon={fireIcon} value={home ? `${home.currentStreak}일` : "-"} label="연속학습" />
          <StatCard icon={bookIcon} value={home ? `${home.newsReadCount}개` : "-"} label="읽은 뉴스" />
          <StatCard icon={targetIcon} value={home ? `${home.answerRate}%` : "-"} label="정답률" />
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

              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>

          {/* 뉴스 카드 */}
          <article className="mt-4 flex items-center gap-4 rounded-2xl bg-[#F5F6FB] p-5">
            {/* 뉴스 이미지 + 그림자 */}
            <div className="relative size-20 shrink-0">
              <img
                src={shadow}
                alt=""
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 z-0 w-14 -translate-x-1/2 object-contain"
              />

              <img
                src={newsIcon}
                alt="뉴스"
                className="relative z-10 size-20 -translate-y-2 object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              {isLoading ? (
                <p className="text-sm font-semibold text-gray-400">
                  오늘의 뉴스를 불러오는 중이에요.
                </p>
              ) : home?.todayNews ? (
                <>
                  <p className="text-sm font-semibold text-[#2F8DE4]">
                    {home.todayNews.category}
                  </p>

                  <h3 className="truncate text-lg font-bold text-black">
                    {home.todayNews.title}
                  </h3>

                  <p className="line-clamp-2 text-sm font-semibold leading-snug text-gray-400">
                    {home.todayNews.content}
                  </p>
                </>
              ) : (
                <p className="text-sm font-semibold text-gray-400">
                  {isError ? "오늘의 뉴스를 불러오지 못했습니다." : "오늘의 뉴스가 아직 준비되지 않았습니다."}
                </p>
              )}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
