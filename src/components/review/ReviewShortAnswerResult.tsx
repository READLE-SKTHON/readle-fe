import type { ReviewShortAnswerQuestion } from "@/types/review";

type ReviewShortAnswerResultProps = {
  question: ReviewShortAnswerQuestion;
  answer: string;
  isCorrect: boolean;
};

// 복습 주관식 제출 후 내 답안 · 정답 표시
export default function ReviewShortAnswerResult({
  question,
  answer,
  isCorrect,
}: ReviewShortAnswerResultProps) {
  return (
    <section>
      <h3 className="text-[20px] leading-8 font-bold break-keep text-[#5E5E5E]">
        {question.question}
      </h3>

      <h4 className="mt-6 text-[18px] font-bold text-black">내 답안</h4>

      <p
        className={`mt-2 rounded-3xl border px-6 py-5 text-[16px] leading-7 font-bold break-all whitespace-pre-line text-black ${
          isCorrect ? "border-[#78D51B] bg-[#E7F8D5]" : "border-[#FF4D4F] bg-[#FFDADA]"
        }`}
      >
        {answer}
      </p>

      <h4 className="mt-6 text-[18px] font-bold text-black">정답</h4>

      <p className="mt-2 rounded-3xl bg-[#F5F6FC] px-6 py-5 text-[16px] leading-7 font-bold text-black">
        {question.correctAnswer}
      </p>
    </section>
  );
}
