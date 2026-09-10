import type { SubjectiveQuiz as SubjectiveQuizType } from "@/types/quiz";

type SubjectiveQuizProps = {
  quiz: SubjectiveQuizType;
  answer: string;
  onChangeAnswer: (answer: string) => void;
  onOpenNews: () => void;
};

export default function SubjectiveQuiz({
  quiz,
  answer,
  onChangeAnswer,
  onOpenNews,
}: SubjectiveQuizProps) {
  return (
    <section>
      {/* 문제 유형 / 지문 전체보기 */}
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#D5EAFB] px-4 py-1 text-[14px] font-bold text-[#168CF2]">
          주관식문제
        </span>

        <button
          type="button"
          onClick={onOpenNews}
          className="cursor-pointer rounded-full bg-[#EFF238] px-4 py-1 text-[14px] font-bold"
        >
          지문 전체보기
        </button>
      </div>

      {/* 문제 */}
      <h2 className="mt-7 text-[20px] font-bold leading-8">{quiz.question}</h2>

      {/* 답안 입력 */}
      <textarea
        value={answer}
        onChange={(e) => onChangeAnswer(e.target.value)}
        maxLength={quiz.maxLength}
        placeholder="답안을 작성하세요"
        className="mt-8 h-40 w-full resize-none rounded-3xl border border-gray-200 px-6 py-5 text-[16px] leading-7 outline-none placeholder:text-gray-400"
      />

      {/* 글자 수 */}
      <p className="mt-2 text-right text-[16px] font-semibold text-gray-400">
        {answer.length}/{quiz.maxLength}
      </p>
    </section>
  );
}
