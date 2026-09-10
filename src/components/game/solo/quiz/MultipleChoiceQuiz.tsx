import type { MultipleChoiceQuiz as MultipleChoiceQuizType } from "@/types/quiz";

type MultipleChoiceQuizProps = {
  quiz: MultipleChoiceQuizType;
  selectedOptionId: number | null;
  onSelect: (optionId: number) => void;
  isSubmitted: boolean;
};

export default function MultipleChoiceQuiz({
  quiz,
  selectedOptionId,
  onSelect,
  isSubmitted,
}: MultipleChoiceQuizProps) {
  return (
    <section className={isSubmitted ? "mt-6" : ""}>
      {/* 제출 전일 때만 문제 표시 */}
      {!isSubmitted && <h2 className="text-[20px] font-bold leading-8">{quiz.question}</h2>}

      {/* 선택지 */}
      <div className={`${isSubmitted ? "" : "mt-6"} flex flex-col gap-3`}>
        {quiz.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrectOption = option.id === quiz.correctAnswer;

          let optionStyle = "border-transparent bg-[#F7F7F7]";
          let circleStyle = "border-gray-300 bg-white";
          let textStyle = "font-medium text-gray-500";

          // 풀이 중 선택한 답
          if (!isSubmitted && isSelected) {
            optionStyle = "border-[#2285E3] bg-[#2285E3]";
            circleStyle = "border-white bg-[#2285E3] text-white";
            textStyle = "font-semibold text-white";
          }

          // 제출 후 정답
          if (isSubmitted && isCorrectOption) {
            optionStyle = "border-[#78D51B] bg-[#E7F8D5]";
            circleStyle = "border-[#78D51B] bg-[#78D51B] text-white";
            textStyle = "font-semibold text-black";
          }

          // 제출 후 내가 고른 오답
          if (isSubmitted && isSelected && !isCorrectOption) {
            optionStyle = "border-[#FF4D4F] bg-[#FFDADA]";
            circleStyle = "border-[#FF4D4F] bg-[#FF4D4F] text-white";
            textStyle = "font-semibold text-black";
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={isSubmitted}
              onClick={() => onSelect(option.id)}
              className={`flex min-h-16 w-full items-center gap-5 rounded-2xl border px-4 text-left ${optionStyle} ${
                isSubmitted ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${circleStyle}`}
              >
                {(isSelected || (isSubmitted && isCorrectOption)) && "✓"}
              </span>

              <span className={`text-[16px] ${textStyle}`}>{option.text}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
