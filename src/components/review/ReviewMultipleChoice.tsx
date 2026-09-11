import { Check, X } from "lucide-react";

import PassageBox from "@/components/review/PassageBox";
import type { ReviewMultipleChoiceQuestion } from "@/types/review";

type ReviewMultipleChoiceProps = {
  question: ReviewMultipleChoiceQuestion;
  selectedOptionId: number | null;
  onSelect: (optionId: number) => void;
  isSubmitted: boolean;
};

// 복습 객관식 (문제 → 밑줄 지문 → 번호 보기, 제출 후 정답·오답 표시)
export default function ReviewMultipleChoice({
  question,
  selectedOptionId,
  onSelect,
  isSubmitted,
}: ReviewMultipleChoiceProps) {
  return (
    <section>
      {!isSubmitted && (
        <>
          <h3 className="text-[20px] leading-7 font-bold break-keep text-black">
            {question.question}
          </h3>

          <div className="mt-7">
            <PassageBox passage={question.passage} underline={question.underline} />
          </div>
        </>
      )}

      {/* 보기 */}
      <div className={`flex flex-col gap-3 ${isSubmitted ? "" : "mt-6"}`}>
        {question.options.map((option, index) => {
          const isSelected = option.id === selectedOptionId;
          const isCorrectOption = option.id === question.correctAnswer;

          // 풀이 중 선택 또는 제출 후 정답
          const isChecked = isSubmitted ? isCorrectOption : isSelected;

          // 제출 후 내가 고른 오답
          const isWrongSelected = isSubmitted && isSelected && !isCorrectOption;

          let optionStyle = "border-[#E3E2E2] bg-[#F7F7F7]";
          let markStyle = "border border-[#E3E2E2] bg-white text-[#5E5E5E]";

          if (isChecked) {
            optionStyle = isSubmitted
              ? "border-[#78D51B] bg-[#E7F8D5]"
              : "border-[#2285E3] bg-[#CEE5F8]";
            markStyle = isSubmitted ? "bg-[#78D51B]" : "bg-[#2285E3]";
          }

          if (isWrongSelected) {
            optionStyle = "border-[#FF4D4F] bg-[#FFDADA]";
            markStyle = "bg-[#FF4D4F]";
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={isSubmitted}
              onClick={() => onSelect(option.id)}
              className={`flex min-h-16 w-full items-center gap-6 rounded-2xl border px-4 py-3 text-left ${optionStyle} ${
                isSubmitted ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold ${markStyle}`}
              >
                {isWrongSelected && <X strokeWidth={3} className="size-4 text-white" />}
                {isChecked && <Check strokeWidth={3} className="size-4 text-white" />}
                {!isChecked && !isWrongSelected && index + 1}
              </span>

              <span
                className={`text-[16px] break-keep text-black ${
                  isChecked || isWrongSelected ? "font-bold" : "font-medium"
                }`}
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
