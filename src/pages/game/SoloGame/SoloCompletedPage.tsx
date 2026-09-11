import { useNavigate } from "react-router-dom";

import Header from "@/components/common/header/Header";

export default function SoloCompletedPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Header title="혼자 문제풀기" />

      <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-7 pb-20">
        <div className="text-center">
          <p className="text-5xl">🎉</p>

          <h1 className="mt-6 text-2xl font-bold text-black">
            오늘 문제풀이를
            <br />
            이미 완료했어요!
          </h1>

          <p className="mt-3 text-[16px] font-medium leading-6 text-gray-400">
            오늘 학습을 모두 마쳤습니다.
            <br />
            결과를 확인해보세요.
          </p>
        </div>

        <div className="mt-10 w-full">
          <button
            type="button"
            onClick={() => navigate("/game/solo/result")}
            className="h-16 w-full cursor-pointer rounded-2xl bg-[#168CF2] text-lg font-bold text-white"
          >
            결과 확인하기
          </button>

          <button
            type="button"
            onClick={() => navigate("/home")}
            className="mt-3 h-16 w-full cursor-pointer rounded-2xl bg-gray-100 text-lg font-bold text-gray-500"
          >
            홈으로 가기
          </button>
        </div>
      </main>
    </div>
  );
}
