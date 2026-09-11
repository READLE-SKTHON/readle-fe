import type { MultipleChoiceQuiz as MultipleChoiceQuizType } from "@/types/quiz";

type MultipleChoiceQuizProps = {
  quiz: MultipleChoiceQuizType;
  selectedOptionId: number | null;
  onSelect: (optionId: number) => void;
};

export default function MultipleChoiceQuiz({
  quiz,
  selectedOptionId,
  onSelect,
}: MultipleChoiceQuizProps) {
  return (
    <section>
      {/* 문제 */}
      <h2 className="text-[20px] font-bold leading-8">{quiz.question}</h2>

      {/* 선택지 */}
      <div className="mt-6 flex flex-col gap-3">
        {quiz.options.map((option, index) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={`flex min-h-16 w-full cursor-pointer items-center gap-5 rounded-2xl border px-4 text-left transition-colors ${
                isSelected ? "border-[#2285E3] bg-[#B9DBFA]" : "border-transparent bg-[#F7F7F7]"
              }`}
            >
              {/* 번호 / 선택 체크 */}
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[14px] ${
                  isSelected
                    ? "bg-[#2285E3] font-bold text-white"
                    : "border border-[#D6D6D6] bg-white text-[#B4B4B4]"
                }`}
              >
                {isSelected ? "✓" : index + 1}
              </span>

              {/* 선택지 내용 */}
              <span
                className={`text-[16px] ${
                  isSelected ? "font-semibold text-black" : "font-medium text-[#666666]"
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
