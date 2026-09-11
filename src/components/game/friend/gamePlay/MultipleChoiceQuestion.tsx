import { Check } from "lucide-react";

import ExcerptBox from "@/components/game/friend/gamePlay/ExcerptBox";
import type { MultipleChoiceGameQuestion } from "@/types/game";

type MultipleChoiceQuestionProps = {
  question: MultipleChoiceGameQuestion;

  // 선택한 보기 번호 (1부터)
  selectedNumber: number | null;

  onSelect: (choiceNumber: number) => void;
  isLocked: boolean;
};

export default function MultipleChoiceQuestion({
  question,
  selectedNumber,
  onSelect,
  isLocked,
}: MultipleChoiceQuestionProps) {
  // 보기 번호 1부터 (제출 대기 시 내가 고른 보기만 표시)
  const choices = question.choices
    .map((text, index) => ({ text, number: index + 1 }))
    .filter((choice) => !isLocked || choice.number === selectedNumber);

  return (
    <section>
      {/* 발췌 지문 */}
      {!isLocked && question.passage && <ExcerptBox passage={question.passage} />}

      <h3
        className={`text-[20px] leading-8 font-bold ${isLocked ? "text-[#5E5E5E]" : "mt-6 text-black"}`}
      >
        {question.question}
      </h3>

      {/* 보기 */}
      <div className="mt-4 flex flex-col gap-3">
        {choices.map((choice) => {
          const isSelected = choice.number === selectedNumber;

          return (
            <button
              key={choice.number}
              type="button"
              disabled={isLocked}
              onClick={() => onSelect(choice.number)}
              className={`flex min-h-14 w-full items-center gap-4 border px-4 py-3 text-left ${
                isSelected ? "border-[#2285E3] bg-[#CEE5F8]" : "border-[#E3E2E2] bg-[#F7F7F7]"
              } ${isLocked ? "cursor-default rounded-xl" : "cursor-pointer rounded-2xl"}`}
            >
              {isSelected ? (
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#2285E3]">
                  <Check strokeWidth={3} className="size-4 text-white" />
                </span>
              ) : (
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[#E3E2E2] bg-white text-[14px] font-semibold text-[#5E5E5E]">
                  {choice.number}
                </span>
              )}

              <span
                className={`text-[16px] text-black ${isSelected ? "font-bold" : "font-medium"}`}
              >
                {choice.text}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
