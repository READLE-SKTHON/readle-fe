import type { ReactNode } from "react";

import QuizMetaBar from "./QuizMetaBar";

import type { SubjectiveQuiz as SubjectiveQuizType } from "@/types/quiz";

type SubjectiveQuizProps = {
  quiz: SubjectiveQuizType;
  answer: string;
  onChangeAnswer: (answer: string) => void;
  requiresReason?: boolean;
  reason?: string;
  onChangeReason?: (reason: string) => void;
  onOpenNews: () => void;

  // 문제 유형 영역 (없으면 기본 유형 태그)
  metaBar?: ReactNode;
};

export default function SubjectiveQuiz({
  quiz,
  answer,
  onChangeAnswer,
  requiresReason = false,
  reason = "",
  onChangeReason,
  onOpenNews,
  metaBar,
}: SubjectiveQuizProps) {
  return (
    <section>
      {/* 문제 유형 / 지문 전체보기 */}
      {metaBar ?? <QuizMetaBar type="주관식 문제" onOpenNews={onOpenNews} />}

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

      {requiresReason && (
        <div className="mt-8">
          <h3 className="text-[18px] font-bold">왜 그렇게 생각했나요?</h3>

          <p className="mt-1 text-[15px] text-gray-500">
            기사 내용을 바탕으로 이유를 작성해주세요
          </p>

          <textarea
            aria-label="답변의 근거"
            value={reason}
            onChange={(e) => onChangeReason?.(e.target.value)}
            placeholder="근거를 작성하세요"
            className="mt-4 h-40 w-full resize-none rounded-3xl border border-gray-200 p-5 text-[16px] outline-none"
          />
        </div>
      )}
    </section>
  );
}
