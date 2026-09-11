import { useState } from "react";

import chevronDownIcon from "@/assets/icons/game/chevronDownIcon.png";
import chevronUpIcon from "@/assets/icons/game/chevronUpIcon.png";

import type { SubjectiveQuiz } from "@/types/quiz";

type SubjectiveResultProps = {
  quiz: SubjectiveQuiz;
  answer: string;
};

export default function SubjectiveResult({ quiz, answer }: SubjectiveResultProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <section className="mt-7">
      {/* 내 답안 */}
      <div>
        <h2 className="text-[20px] font-bold">내 답안</h2>

        <div className="mt-4 rounded-2xl border border-gray-400 px-5 py-5">
          <p className="text-[16px] leading-7 text-gray-500">{answer}</p>
        </div>
      </div>

      {/* 답안 해설 */}
      <div className="mt-4 overflow-hidden rounded-2xl bg-[#F5F6FC]">
        {/* 완벽한 답안 예시 */}
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

        {/* 벨릿의 피드백 */}
        {isDetailOpen && (
          <>
            <div className="h-px bg-gray-300" />

            <div className="px-5 py-5">
              <h3 className="text-[18px] font-bold">벨릿의 피드백</h3>

              <p className="mt-2 text-[15px] leading-6 text-gray-500">{quiz.feedback}</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
