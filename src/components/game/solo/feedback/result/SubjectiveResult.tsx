import type { SubjectiveQuiz } from "@/types/quiz";

type SubjectiveResultProps = {
  quiz: SubjectiveQuiz;
  answer: string;
};

export default function SubjectiveResult({ quiz, answer }: SubjectiveResultProps) {
  return (
    <section className="mt-7">
      {/* 내 답안 */}
      <div>
        <h2 className="text-[20px] font-bold">내 답안</h2>

        <div className="mt-4 rounded-2xl border border-gray-400 px-5 py-5">
          <p className="text-[16px] leading-7 text-gray-500">{answer}</p>
        </div>
      </div>

      {/* 기사에 있는 근거 */}
      <div className="mt-7 rounded-2xl border border-gray-400 px-5 py-5">
        <h3 className="text-[19px] font-bold">기사 있는 근거</h3>

        <p className="mt-3 text-[15px] leading-6 text-gray-500">{quiz.articleEvidence}</p>
      </div>

      {/* 벨릿의 피드백 */}
      <div className="mt-3 rounded-2xl border border-gray-400 px-5 py-5">
        <h3 className="text-[19px] font-bold">벨릿의 피드백</h3>

        <p className="mt-3 text-[15px] leading-6 text-gray-500">{quiz.feedback}</p>
      </div>

      {/* 완벽한 답안 예시 */}
      <div className="mt-4 rounded-2xl bg-[#F5F6FC] px-5 py-5">
        <h3 className="text-[19px] font-bold">완벽한 답안 예시</h3>

        <p className="mt-2 text-[15px] leading-6 text-gray-500">{quiz.exampleAnswer}</p>
      </div>
    </section>
  );
}
