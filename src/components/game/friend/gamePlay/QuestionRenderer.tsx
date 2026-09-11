import MultipleChoiceQuestion from "@/components/game/friend/gamePlay/MultipleChoiceQuestion";
import OxQuestion from "@/components/game/friend/gamePlay/OxQuestion";
import QuestionTag from "@/components/game/friend/gamePlay/QuestionTag";
import ShortAnswerQuestion from "@/components/game/friend/gamePlay/ShortAnswerQuestion";
import { MAIN_CATEGORY_LABELS, SUB_CATEGORY_LABELS } from "@/config/questionCategoryConfig";
import type { GameAnswer, GameQuestion } from "@/types/game";

type QuestionRendererProps = {
  question: GameQuestion;

  // 선택·입력 중인 답안 (제출 대기 시 제출한 답안)
  answer: GameAnswer | null;
  onChangeAnswer?: (answer: GameAnswer) => void;

  // 제출 대기 시 답안 잠금
  isLocked?: boolean;
};

// 문제 형식별 화면 분기 (풀이 중 상단 문제 유형 태그)
export default function QuestionRenderer({
  question,
  answer,
  onChangeAnswer,
  isLocked = false,
}: QuestionRendererProps) {
  const renderQuestion = () => {
    switch (question.format) {
      case "multiple_choice":
        return (
          <MultipleChoiceQuestion
            question={question}
            selectedNumber={answer?.format === "multiple_choice" ? answer.choiceNumber : null}
            onSelect={(choiceNumber) =>
              onChangeAnswer?.({ format: "multiple_choice", choiceNumber })
            }
            isLocked={isLocked}
          />
        );

      case "short_answer":
        return (
          <ShortAnswerQuestion
            question={question}
            answer={answer?.format === "short_answer" ? answer.text : ""}
            onChangeAnswer={(text) => onChangeAnswer?.({ format: "short_answer", text })}
            isLocked={isLocked}
          />
        );

      case "OX":
        return (
          <OxQuestion
            question={question}
            selectedAnswer={answer?.format === "OX" ? answer.value : null}
            onSelect={(value) => onChangeAnswer?.({ format: "OX", value })}
            isLocked={isLocked}
          />
        );
    }
  };

  // 제출 대기 시 태그 없이 내 답안만 표시
  if (isLocked) return renderQuestion();

  return (
    <>
      {question.mainCategory && question.subCategory && (
        <QuestionTag
          category={MAIN_CATEGORY_LABELS[question.mainCategory]}
          subCategory={SUB_CATEGORY_LABELS[question.subCategory]}
        />
      )}

      <div className="mt-4">{renderQuestion()}</div>
    </>
  );
}
