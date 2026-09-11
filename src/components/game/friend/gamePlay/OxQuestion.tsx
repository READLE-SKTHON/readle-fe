import ArticleText from "@/components/game/friend/gamePlay/ArticleText";
import type { OxGameQuestion } from "@/types/game";

type OxQuestionProps = {
  question: OxGameQuestion;
  selectedAnswer: "O" | "X" | null;
  onSelect?: (answer: "O" | "X") => void;
  isLocked: boolean;
};

export default function OxQuestion({
  question,
  selectedAnswer,
  onSelect,
  isLocked,
}: OxQuestionProps) {
  return (
    <section>
      {!isLocked && <ArticleText title={question.news.title} content={question.news.content} />}

      <h3
        className={`text-[20px] leading-8 font-bold ${isLocked ? "text-[#5E5E5E]" : "mt-8 text-black"}`}
      >
        {question.question}
      </h3>

      {/* O / X 선택 */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {(["O", "X"] as const).map((answer) => {
          const isSelected = selectedAnswer === answer;

          return (
            <button
              key={answer}
              type="button"
              disabled={isLocked}
              onClick={() => onSelect?.(answer)}
              className={`h-20 rounded-2xl border text-[32px] font-bold text-black ${
                isSelected ? "border-[#2285E3] bg-[#CEE5F8]" : "border-[#E3E2E2] bg-[#F7F7F7]"
              } ${isLocked ? "cursor-default" : "cursor-pointer"}`}
            >
              {answer}
            </button>
          );
        })}
      </div>
    </section>
  );
}
