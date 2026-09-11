import { useNavigate } from "react-router-dom";

import Header from "@/components/common/header/Header";
import { useTodayTraining } from "@/hooks/queries/useTraining";
import { useUserStore } from "@/stores/useUserStore";
import { getTrainingErrorMessage } from "@/utils/trainingMapper";

import articleIcon from "@/assets/icons/game/articleIcon.png";
import calendarIcon from "@/assets/icons/game/calendarIcon.png";
import publisherIcon from "@/assets/icons/game/publisherIcon.png";

export default function SoloReadingPage() {
  const navigate = useNavigate();

  const userId = useUserStore((state) => state.user?.id);
  const { data: training, isPending, error } = useTodayTraining();
  if (!userId || isPending || error || !training) {
    return (
      <div>
        <Header title="혼자 문제풀기" />
        <p role="status">
          {!userId
            ? "로그인이 필요합니다."
            : error
              ? getTrainingErrorMessage(error)
              : isPending
                ? "기사를 불러오는 중입니다."
                : "오늘의 문제가 아직 준비되지 않았습니다."}
        </p>
      </div>
    );
  }
  const news = training.article;

  return (
    <div>
      <Header title="혼자 문제풀기" />

      <main className="flex min-h-screen flex-col px-7 pb-8">
        {/* 안내 문구 */}
        <h2 className="mt-7 text-[24px] font-semibold leading-snug">
          지문을 충분히 읽은뒤
          <br />
          시작해주세요
        </h2>

        {/* 뉴스 카드 */}
        <section className="mt-6 rounded-3xl bg-[#F5F6FC] p-4">
          {/* 뉴스 정보 */}
          <div className="flex items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D5EAFB]">
              <img src={articleIcon} alt="" className="h-8 w-8 object-contain" />
            </div>

            <div className="ml-4">
              <h3 className="text-xl font-semibold">오늘의 뉴스</h3>

              <p className="mt-1 text-base font-medium text-gray-400">
                {news.category} · 읽기 자료
              </p>
            </div>

            <span className="ml-auto rounded-full bg-[#D5EAFB] px-4 py-2 text-sm font-bold text-[#168CF2]">
              {training.questionCount}문제
            </span>
          </div>

          {/* 구분선 */}
          <div className="my-4 h-px bg-gray-300" />

          {/* 출처 / 날짜 */}
          <div className="flex items-center gap-5 text-sm font-medium text-gray-400">
            <div className="flex items-center gap-1.5">
              <img src={publisherIcon} alt="출처" className="h-5 w-5 object-contain" />
              <span>중앙일보</span>
            </div>

            <div className="flex items-center gap-1.5">
              <img src={calendarIcon} alt="날짜" className="h-5 w-5 object-contain" />
              <span>{formatDate(news.publishedAt)}</span>
            </div>
          </div>

          {/* 기사 본문 */}
          <article className="mt-5 rounded-3xl border border-gray-200 bg-white px-6 py-6">
            <p className="whitespace-pre-line text-[16px] leading-7 text-gray-700">
              {news.content.trim()}
            </p>
          </article>
        </section>

        {/* 문제풀기 */}
        <button
          type="button"
          onClick={() => navigate("/game/solo/play")}
          className="mt-6 h-16 w-full cursor-pointer rounded-2xl bg-black text-xl font-bold text-white"
        >
          문제풀기
        </button>
      </main>
    </div>
  );
}

function formatDate(date: string) {
  return date.slice(0, 10).replaceAll("-", ".");
}
