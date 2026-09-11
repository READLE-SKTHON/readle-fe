import FeedbackRenderer from "../feedback/FeedbackRenderer";
import MultipleChoiceResult from "./MultipleChoiceResult";
import OxResult from "./OxResult";
import SubjectiveResult from "./SubjectiveResult";

import type { FeedbackStatus, Quiz } from "@/types/quiz";

type QuizResultRendererProps = {
  quiz: Quiz;
  status: FeedbackStatus | null;

  selectedOptionId: number | null;
  selectedOxAnswer: "O" | "X" | null;
  reason: string;
  subjectiveAnswer: string;

  // 객관식 해설
  explanation?: string;
};

// 제출 후 문제 형식별 피드백·결과 (혼자 문제풀기·훈련하기 공용)
export default function QuizResultRenderer({
  quiz,
  status,
  selectedOptionId,
  selectedOxAnswer,
  reason,
  subjectiveAnswer,
  explanation,
}: QuizResultRendererProps) {
  return (
    <>
      {/* 객관식 제출 후 결과 */}
      {quiz.type === "MULTIPLE_CHOICE" && selectedOptionId !== null && (
        <MultipleChoiceResult
          choices={quiz.options}
          selectedId={selectedOptionId}
          correctId={quiz.correctAnswer}
          explanation={explanation}
        />
      )}

      {/* O/X, 주관식 제출 후 상단 피드백 */}
      {status && quiz.type !== "MULTIPLE_CHOICE" && (
        <FeedbackRenderer quiz={quiz} status={status} />
      )}

      {/* O/X 제출 후 상세 결과 */}
      {quiz.type === "OX" && selectedOxAnswer && status && (
        <OxResult quiz={quiz} selectedAnswer={selectedOxAnswer} reason={reason} status={status} />
      )}

      {/* 주관식 제출 후 상세 결과 */}
      {quiz.type === "SUBJECTIVE" && status && (
        <SubjectiveResult quiz={quiz} answer={subjectiveAnswer} />
      )}
    </>
  );
}
