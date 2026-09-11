import { useState } from "react";

import chevronDownIcon from "@/assets/icons/game/chevronDownIcon.png";
import chevronUpIcon from "@/assets/icons/game/chevronUpIcon.png";

import type { FeedbackStatus, OxQuiz } from "@/types/quiz";

type OxResultProps = {
  quiz: OxQuiz;
  selectedAnswer: "O" | "X";
  reason: string;
  status: FeedbackStatus;
};

export default function OxResult({ quiz, selectedAnswer, reason, status }: OxResultProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <section className="mt-7">
      {/* 내 답안 */}
      <div>
        <h2 className="text-[20px] font-bold">내 답안</h2>

        <div className="mt-3 flex items-center gap-8">
          <span className="text-[18px] font-medium text-gray-500">선택한 답</span>

          <span className="text-[20px] font-bold text-[#57C500]">{selectedAnswer}</span>
        </div>
      </div>

      {/* 내가 작성한 근거 */}
      <div className="mt-8">
        <h2 className="text-[20px] font-bold">내가 작성한 근거</h2>

        <div className="mt-3 rounded-2xl border border-gray-400 px-5 py-5">
          <p className="text-[16px] leading-7 text-gray-500">{reason}</p>
        </div>
      </div>
      {/* 정답 */}
      {status === "CORRECT" && (
        <div className="mt-4 rounded-2xl bg-[#F5F6FC] px-5 py-5">
          <h3 className="text-[18px] font-bold">완벽한 답안 예시</h3>

          <p className="mt-2 text-[15px] leading-6 text-gray-500">{quiz.exampleAnswer}</p>
        </div>
      )}

      {/* 오답 */}
      {status === "INCORRECT" && (
        <div className="mt-4 overflow-hidden rounded-2xl bg-[#F5F6FC]">
          <button
            type="button"
            onClick={() => setIsDetailOpen((prev) => !prev)}
            className="flex w-full cursor-pointer items-start justify-between px-5 py-5 text-left"
          >
            <div>
              <h3 className="text-[18px] font-bold">완벽한 답안 예시</h3>

              <p className="mt-2 text-[15px] leading-6 text-gray-500">{quiz.exampleAnswer}</p>
            </div>

            <img
              src={isDetailOpen ? chevronUpIcon : chevronDownIcon}
              alt=""
              className="ml-3 mt-1 h-4 w-4 shrink-0 object-contain"
            />
          </button>

          {isDetailOpen && (
            <>
              <div className="h-px bg-gray-300" />

              <div className="px-5 py-5">
                <h3 className="text-[18px] font-bold">왜 다를까요?</h3>

                <p className="mt-2 text-[15px] leading-6 text-gray-500">{quiz.differenceReason}</p>
              </div>

              <div className="h-px bg-gray-300" />

              <div className="px-5 py-5">
                <h3 className="text-[18px] font-bold">기사에서 다시 찾아볼 부분</h3>

                <p className="mt-2 text-[15px] leading-6 text-gray-500">{quiz.articleHint}</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* 부분 정답 */}
      {status === "PARTIAL" && (
        <>
          {/* 완벽한 답안 예시 */}
          <div className="mt-4 overflow-hidden rounded-2xl bg-[#F5F6FC]">
            <button
              type="button"
              onClick={() => setIsDetailOpen((prev) => !prev)}
              className="flex w-full cursor-pointer items-start justify-between px-5 py-5 text-left"
            >
              <div>
                <h3 className="text-[18px] font-bold">완벽한 답안 예시</h3>

                <p className="mt-2 text-[15px] leading-6 text-gray-500">{quiz.exampleAnswer}</p>
              </div>

              <img
                src={isDetailOpen ? chevronUpIcon : chevronDownIcon}
                alt=""
                className="ml-3 mt-1 h-4 w-4 shrink-0 object-contain"
              />
            </button>

            {/* 펼쳤을 때 */}
            {isDetailOpen && (
              <>
                <div className="h-px bg-gray-300" />

                <div className="px-5 py-5">
                  <h3 className="text-[18px] font-bold">기사에서 다시 찾아볼 부분</h3>

                  <p className="mt-2 text-[15px] leading-6 text-gray-500">{quiz.articleHint}</p>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
}
