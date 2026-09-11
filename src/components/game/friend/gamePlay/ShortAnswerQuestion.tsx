import ExcerptBox from "@/components/game/friend/gamePlay/ExcerptBox";
import type { ShortAnswerGameQuestion } from "@/types/game";

// 단답형 최대 글자 수
const MAX_LENGTH = 50;

type ShortAnswerQuestionProps = {
  question: ShortAnswerGameQuestion;
  answer: string;
  onChangeAnswer?: (answer: string) => void;
  isLocked: boolean;
};

export default function ShortAnswerQuestion({
  question,
  answer,
  onChangeAnswer,
  isLocked,
}: ShortAnswerQuestionProps) {
  return (
    <section>
      {/* 발췌 지문 */}
      {!isLocked && question.passage && <ExcerptBox passage={question.passage} />}

      <h3
        className={`text-[20px] leading-8 font-bold ${isLocked ? "text-[#5E5E5E]" : "mt-8 text-black"}`}
      >
        {question.question}
      </h3>

      {isLocked ? (
        // 제출한 답안
        <p className="mt-3 rounded-2xl border border-[#2285E3] bg-[#CEE5F8] px-5 py-4 text-[16px] leading-7 font-bold break-all text-black">
          {answer || "답안을 제출했어요"}
        </p>
      ) : (
        <>
          <input
            type="text"
            value={answer}
            onChange={(event) => onChangeAnswer?.(event.target.value)}
            maxLength={MAX_LENGTH}
            placeholder="답안을 작성하시오"
            className="mt-4 h-14 w-full rounded-2xl border border-[#E3E2E2] px-5 text-[16px] text-black outline-none placeholder:text-[#8F8F8F] focus:border-[#2285E3]"
          />

          <p className="mt-2 text-right text-[14px] font-semibold text-[#8F8F8F]">
            {answer.length}/{MAX_LENGTH}
          </p>
        </>
      )}
    </section>
  );
}
