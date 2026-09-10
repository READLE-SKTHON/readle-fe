import MainHeader from "@/components/common/header/MainHeader";
import FooterNavigation from "@/components/common/footer/FooterNavigation";

import beluga from "@/assets/icons/home/Beluga.png";
import bookIcon from "@/assets/icons/home/bookIcon.png";
import fireIcon from "@/assets/icons/home/fireIcon.png";
import newsIcon from "@/assets/icons/home/newsIcon.png";
import targetIcon from "@/assets/icons/home/targetIcon.png";
import blueCircle from "@/assets/icons/home/blueCircle.png";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white pb-28">
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

          <StatCard icon={targetIcon} value="80%" label="평균 정답률" />
        </section>

        {/* 오늘의 훈련 */}
        <section className="mt-9">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#0A2A43]">오늘의 훈련</h2>

            <button type="button" className="text-sm font-medium text-gray-500">
              훈련하기
            </button>
          </div>

          {/* 뉴스 카드 */}
          <article className="mt-4 flex items-center gap-4 rounded-2xl bg-[#F5F6FB] p-4">
            <img src={newsIcon} alt="" className="size-20 object-contain" />

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#2F8DE4]">경제</p>

              <h3 className="mt-1 font-bold text-black">물가 상승 속 가계 부담 증가</h3>

              <p className="mt-1 line-clamp-2 text-sm leading-snug text-gray-400">
                지속되는 물가상승으로 인해 가계의 생활비 부담이 커지고 있으며, 소비 심리도 위축되고
                있다는 분석이...
              </p>
            </div>
          </article>
        </section>
      </div>

      <FooterNavigation />
    </main>
  );
}

type StatCardProps = {
  icon: string;
  value: string;
  label: string;
};

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white px-2 py-3 shadow-sm">
      <img src={icon} alt="" className="size-9 object-contain" />

      <div>
        <p className="text-base font-bold text-black">{value}</p>
        <p className="whitespace-nowrap text-xs font-medium text-gray-400">{label}</p>
      </div>
    </div>
  );
}
