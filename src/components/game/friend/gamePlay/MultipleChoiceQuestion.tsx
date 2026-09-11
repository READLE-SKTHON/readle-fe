import { Check } from "lucide-react";

import QuizMetaBar from "@/components/game/solo/quiz/QuizMetaBar";
import type { MultipleChoiceGameQuestion } from "@/types/game";

type MultipleChoiceQuestionProps = {
  question: MultipleChoiceGameQuestion;
  selectedOptionId: number | null;
  onSelect: (optionId: number) => void;
  isLocked: boolean;
  onOpenNews?: () => void;
};

export default function MultipleChoiceQuestion({
  question,
  selectedOptionId,
  onSelect,
  isLocked,
  onOpenNews,
}: MultipleChoiceQuestionProps) {
  // 보기 번호는 1부터 유지 (제출 대기 시 내가 고른 보기만 표시)
  const options = question.options
    .map((option, index) => ({ ...option, number: index + 1 }))
    .filter((option) => !isLocked || option.id === selectedOptionId);

  return (
    <section>
      {!isLocked && (
        <>
          {onOpenNews && (
            <QuizMetaBar
              type={question.category}
              subtype={question.subCategory}
              onOpenNews={onOpenNews}
            />
          )}

          {/* 지문 */}
          <div className="mt-4 rounded-3xl bg-[#F5F6FC] px-6 py-5">
            <p className="text-[16px] leading-7 whitespace-pre-line text-black">
              {question.news.content}
            </p>
          </div>
        </>
      )}

      <h3
        className={`text-[20px] leading-8 font-bold ${isLocked ? "text-[#5E5E5E]" : "mt-6 text-black"}`}
      >
        {question.question}
      </h3>

      {/* 보기 */}
      <div className="mt-4 flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = option.id === selectedOptionId;

          return (
            <button
              key={option.id}
              type="button"
              disabled={isLocked}
              onClick={() => onSelect(option.id)}
              className={`flex min-h-14 w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left ${
                isSelected ? "border-[#2285E3] bg-[#CEE5F8]" : "border-[#E3E2E2] bg-[#F7F7F7]"
              } ${isLocked ? "cursor-default" : "cursor-pointer"}`}
            >
              {isSelected ? (
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#2285E3]">
                  <Check strokeWidth={3} className="size-4 text-white" />
                </span>
              ) : (
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[#E3E2E2] bg-white text-[14px] font-semibold text-[#5E5E5E]">
                  {option.number}
                </span>
              )}

              <span
                className={`text-[16px] text-black ${isSelected ? "font-bold" : "font-medium"}`}
              >
                {option.text}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
