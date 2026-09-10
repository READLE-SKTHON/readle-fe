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
      <h2 className="text-[18px] font-bold leading-8">{quiz.question}</h2>

      {/* 선택지 */}
      <div className="mt-6 flex flex-col gap-3">
        {quiz.options.map((option) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={`flex min-h-16 w-full cursor-pointer items-center gap-5 rounded-2xl border px-4 text-left ${
                isSelected ? "border-[#168CF2] bg-[#B8DAF8]" : "border-transparent bg-[#F7F7F7]"
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                  isSelected
                    ? "border-[#168CF2] bg-[#168CF2] text-white"
                    : "border-gray-300 bg-white"
                }`}
              >
                {isSelected && "✓"}
              </span>

              <span
                className={`text-[16px] ${
                  isSelected ? "font-semibold text-black" : "font-medium text-gray-500"
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
