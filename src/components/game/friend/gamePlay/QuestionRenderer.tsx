import MultipleChoiceQuestion from "@/components/game/friend/gamePlay/MultipleChoiceQuestion";
import OxQuestion from "@/components/game/friend/gamePlay/OxQuestion";
import QuestionTag from "@/components/game/friend/gamePlay/QuestionTag";
import ShortAnswerQuestion from "@/components/game/friend/gamePlay/ShortAnswerQuestion";
import type { GameQuestion } from "@/types/game";

type QuestionRendererProps = {
  question: GameQuestion;

  // 답안 (객관식 보기 id / 단답형 텍스트 / O·X)
  answer: string;
  onChangeAnswer?: (answer: string) => void;

  // 제출 대기 시 답안 잠금
  isLocked?: boolean;
};

// 문제 유형별 화면 분기 (풀이 중 상단 문제 유형 태그)
export default function QuestionRenderer({
  question,
  answer,
  onChangeAnswer,
  isLocked = false,
}: QuestionRendererProps) {
  const renderQuestion = () => {
    switch (question.type) {
      case "MULTIPLE_CHOICE":
        return (
          <MultipleChoiceQuestion
            question={question}
            selectedOptionId={answer ? Number(answer) : null}
            onSelect={(optionId) => onChangeAnswer?.(String(optionId))}
            isLocked={isLocked}
          />
        );

      case "SHORT_ANSWER":
        return (
          <ShortAnswerQuestion
            question={question}
            answer={answer}
            onChangeAnswer={onChangeAnswer}
            isLocked={isLocked}
          />
        );

      case "OX":
        return (
          <OxQuestion
            question={question}
            selectedAnswer={answer === "O" || answer === "X" ? answer : null}
            onSelect={onChangeAnswer}
            isLocked={isLocked}
          />
        );
    }
  };

  // 제출 대기 시 태그 없이 내 답안만 표시
  if (isLocked) return renderQuestion();

  return (
    <>
      <QuestionTag category={question.category} subCategory={question.subCategory} />

      <div className="mt-4">{renderQuestion()}</div>
    </>
  );
}
