import type { ReviewOxQuestion } from "@/types/review";

type ReviewOxResultProps = {
  question: ReviewOxQuestion;
  selectedAnswer: string;
};

// 복습 O/X 제출 후 정답·오답 표시
export default function ReviewOxResult({ question, selectedAnswer }: ReviewOxResultProps) {
  return (
    <section>
      <h3 className="text-[20px] leading-8 font-bold break-keep text-[#5E5E5E]">
        {question.question}
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {(["O", "X"] as const).map((answer) => {
          const isCorrectAnswer = answer === question.correctAnswer;
          const isWrongSelected = answer === selectedAnswer && !isCorrectAnswer;

          let answerStyle = "border-[#E3E2E2] bg-[#F7F7F7]";

          if (isCorrectAnswer) answerStyle = "border-[#78D51B] bg-[#E7F8D5]";
          if (isWrongSelected) answerStyle = "border-[#FF4D4F] bg-[#FFDADA]";

          return (
            <div
              key={answer}
              className={`flex h-20 items-center justify-center rounded-2xl border text-[32px] font-bold text-black ${answerStyle}`}
            >
              {answer}
            </div>
          );
        })}
      </div>
    </section>
  );
}
