import { useNavigate } from "react-router-dom";

import MainHeader from "@/components/common/header/MainHeader";

import gameBeluga from "@/assets/icons/game/gameBeluga.png";

export default function GameMainPage() {
  const navigate = useNavigate();

  return (
    <main>
      <MainHeader userName="김환희" />

      <div className="px-5">
        {/* 메인 소개 */}
        <section className="relative mt-12 h-72 overflow-hidden">
          <p className="text-xs font-semibold text-gray-400">
            NEWS-TODAY
            <br />A BRIGHTER YOU
          </p>

          <h1 className="mt-10 text-[28px] font-bold leading-tight text-black">
            오늘의 뉴스 퀘스트!
            <br />
            준비됐어?
          </h1>

          <p className="mt-3 text-[15px] font-semibold leading-snug text-gray-500">
            다양한 뉴스 카테고리 속 여러
            <br />
            문제를 풀며 문해력을 길러봐
          </p>

          {/* 배경 원 */}
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-5 size-60 rounded-full bg-[#E7F3FC]"
          />

          {/* 벨루가 */}
          <img
            src={gameBeluga}
            alt="뉴스를 읽는 벨루가"
            className="absolute -right-8 bottom-0 z-10 w-64 object-contain"
          />
        </section>

        {/* 게임 모드 선택 */}
        <section className="mt-6 grid grid-cols-2 gap-4">
          {/* 혼자 문제풀기 */}
          <button
            type="button"
            onClick={() => navigate("/game/solo")}
            className="
              flex h-56 flex-col
              rounded-3xl bg-[#EAF5FD]
              p-5 text-left
            "
          >
            <h2 className="mt-8 text-xl font-bold text-black">혼자 문제풀기</h2>

            <p className="mt-2 text-base font-semibold leading-snug text-gray-500">
              오늘의 뉴스로
              <br />
              실력을 키워요
            </p>

            <span className="mt-auto self-end text-4xl text-[#168CF2]">›</span>
          </button>

          {/* 친구와 함께 */}
          <button
            type="button"
            onClick={() => navigate("/game/friend")}
            className="
              flex h-56 flex-col
              rounded-3xl bg-[#F7F7C9]
              p-5 text-left
            "
          >
            <h2 className="mt-8 text-xl font-bold text-black">친구와 함께</h2>

            <p className="mt-2 text-base font-semibold leading-snug text-gray-500">
              친구와 한판 붙고,
              <br />
              문해력은 한 뼘 성장
            </p>

            <span className="mt-auto self-end text-4xl text-[#9AA378]">›</span>
          </button>
        </section>
      </div>
    </main>
  );
}
