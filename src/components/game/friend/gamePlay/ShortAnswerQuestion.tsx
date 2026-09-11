import ArticleText from "@/components/game/friend/gamePlay/ArticleText";
import ExcerptBox from "@/components/game/friend/gamePlay/ExcerptBox";
import type { ShortAnswerGameQuestion } from "@/types/game";

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
      {/* 발췌 지문 (없으면 기사 전체) */}
      {!isLocked &&
        (question.passage ? (
          <ExcerptBox passage={question.passage} />
        ) : (
          <ArticleText title={question.news.title} content={question.news.content} />
        ))}

      <div className={isLocked ? "" : "mt-8"}>
        <h3
          className={`text-[20px] leading-8 font-bold ${isLocked ? "text-[#5E5E5E]" : "text-black"}`}
        >
          {question.question}
        </h3>

        <p className="mt-1 text-right text-[14px] font-medium text-[#5E5E5E]">
          {question.instruction}
        </p>
      </div>

      {isLocked ? (
        // 제출한 답안
        <p className="mt-3 rounded-3xl border border-[#2285E3] bg-[#CEE5F8] px-6 py-5 text-[16px] leading-7 font-bold break-all whitespace-pre-line text-black">
          {answer}
        </p>
      ) : (
        <>
          <textarea
            value={answer}
            onChange={(event) => onChangeAnswer?.(event.target.value)}
            maxLength={question.maxLength}
            placeholder="답안을 작성하시오"
            className="mt-3 h-40 w-full resize-none rounded-3xl border border-[#E3E2E2] px-6 py-5 text-[16px] leading-7 text-black outline-none placeholder:text-[#8F8F8F] focus:border-[#2285E3]"
          />

          <p className="mt-2 text-right text-[14px] font-semibold text-[#8F8F8F]">
            {answer.length}/{question.maxLength}
          </p>
        </>
      )}
    </section>
  );
}
