import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainHeader from "@/components/common/header/MainHeader";

import { getTodayTraining } from "@/api/training";
import useUser from "@/hooks/useUser";

import type { ApiErrorResponse } from "@/types/api";

import gameBeluga from "@/assets/images/gameBeluga.png";
import shadow from "@/assets/images/Shadow.png";

export default function GameMainPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 로그인 사용자
  const { user } = useUser();

  // 오늘 문제 상태 확인 중
  const [isCheckingSolo, setIsCheckingSolo] = useState(false);

  const handleSoloGame = async () => {
    if (isCheckingSolo) return;

    setIsCheckingSolo(true);

    try {
      // 기존 useTodayTraining과 동일한 queryKey 사용
      await queryClient.fetchQuery({
        queryKey: ["training", "today", user.id],
        queryFn: () => getTodayTraining(user.id),
        staleTime: 1000 * 60 * 5,
      });

      // 오늘 문제를 아직 풀 수 있는 상태
      navigate("/game/solo");
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error) && error.response?.data?.code === "AN002") {
        // 오늘 문제풀이를 이미 완료한 상태
        navigate("/game/solo/completed");
        return;
      }

      // AN001 등 다른 Training 오류는 기존 SoloReadingPage에서 처리
      navigate("/game/solo");
    } finally {
      setIsCheckingSolo(false);
    }
  };

  return (
    <main>
      <MainHeader userName={user.nickname} />

      <div className="overflow-hidden px-5">
        {/* 메인 소개 */}
        <section className="relative mt-16 h-75">
          {/* 배경 원 */}
          <div
            aria-hidden="true"
            className="
              absolute -right-40 -top-5
              size-80
              rounded-full
              bg-[#E8F1F9]
            "
          />

          {/* 서브 문구 */}
          <p className="relative z-10 text-xs font-semibold leading-tight text-[#A8A8A8]">
            NEWS-TODAY
            <br />A BRIGHTER YOU
          </p>

          {/* 메인 문구 */}
          <h1 className="relative z-10 mt-8 text-[30px] font-bold leading-tight text-black">
            오늘의 뉴스 퀘스트,
            <br />
            준비됐어?
          </h1>

          <p className="relative z-10 mt-4 text-[16px] font-semibold leading-snug text-[#5E5E5E]">
            다양한 뉴스 카테고리 속
            <br />
            여러 유형의 문제를 풀며
            <br />
            문해력을 길러보세요
          </p>

          {/* 벨루가 그림자 */}
          <img
            src={shadow}
            alt=""
            aria-hidden="true"
            className="
              absolute right-5 bottom-0
              z-0 w-35
              object-contain
            "
          />

          {/* 벨루가 */}
          <img
            src={gameBeluga}
            alt="뉴스를 읽는 벨루가"
            className="
              absolute -right-9 top-27
              z-10 w-56
              object-contain
            "
          />
        </section>

        {/* 게임 모드 선택 */}
        <section className="mt-5 grid grid-cols-2 gap-4">
          {/* 혼자 문제풀기 */}
          <button
            type="button"
            onClick={handleSoloGame}
            disabled={isCheckingSolo}
            className="
              flex h-57 cursor-pointer flex-col
              rounded-3xl bg-[#2285E3]
              p-5
              disabled:cursor-not-allowed disabled:opacity-70
            "
          >
            <h2 className="mt-7 w-full text-center text-xl font-bold text-white">혼자 문제풀기</h2>

            <p className="mt-3 w-full text-center text-base font-semibold leading-snug text-white">
              {isCheckingSolo ? (
                "오늘 학습을 확인 중이에요"
              ) : (
                <>
                  오늘의 뉴스로
                  <br />
                  실력을 키워요
                </>
              )}
            </p>

            <ChevronRight size={32} strokeWidth={2} className="mt-auto self-end text-white" />
          </button>

          {/* 친구와 함께 */}
          <button
            type="button"
            onClick={() => navigate("/game/friend")}
            className="
              flex h-57 cursor-pointer flex-col
              rounded-3xl bg-[#F5F6C9]
              p-5
            "
          >
            <h2 className="mt-7 w-full text-center text-xl font-bold text-black">친구와 함께</h2>

            <p className="mt-3 w-full text-center text-[15px] font-semibold leading-snug text-gray-500">
              친구와 한판 붙고,
              <br />
              문해력은 한 뼘 성장
            </p>

            <ChevronRight size={32} strokeWidth={2} className="mt-auto self-end text-[#93A27E]" />
          </button>
        </section>
      </div>
    </main>
  );
}
