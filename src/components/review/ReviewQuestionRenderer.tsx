import OxQuestion from "@/components/game/friend/gamePlay/OxQuestion";
import ShortAnswerQuestion from "@/components/game/friend/gamePlay/ShortAnswerQuestion";
import ReviewMultipleChoice from "@/components/review/ReviewMultipleChoice";
import ReviewOxResult from "@/components/review/ReviewOxResult";
import ReviewShortAnswerResult from "@/components/review/ReviewShortAnswerResult";
import type { ReviewQuestion } from "@/types/review";

type ReviewQuestionRendererProps = {
  question: ReviewQuestion;

  // 답안 (객관식 보기 id / O·X / 주관식 텍스트)
  answer: string;
  onChangeAnswer: (answer: string) => void;

  isSubmitted: boolean;
  isCorrect: boolean;
};

// 문제 형식별 화면 분기 (O/X · 주관식 풀이는 게임 문제 컴포넌트 재사용, 배점 없음)
export default function ReviewQuestionRenderer({
  question,
  answer,
  onChangeAnswer,
  isSubmitted,
  isCorrect,
}: ReviewQuestionRendererProps) {
  switch (question.type) {
    case "MULTIPLE_CHOICE":
      return (
        <ReviewMultipleChoice
          question={question}
          selectedOptionId={answer ? Number(answer) : null}
          onSelect={(optionId) => onChangeAnswer(String(optionId))}
          isSubmitted={isSubmitted}
        />
      );

    case "OX":
      return isSubmitted ? (
        <ReviewOxResult question={question} selectedAnswer={answer} />
      ) : (
        <OxQuestion
          question={{ ...question, points: 0 }}
          selectedAnswer={answer === "O" || answer === "X" ? answer : null}
          onSelect={onChangeAnswer}
          isLocked={false}
        />
      );

    case "SHORT_ANSWER":
      return isSubmitted ? (
        <ReviewShortAnswerResult question={question} answer={answer} isCorrect={isCorrect} />
      ) : (
        <ShortAnswerQuestion
          question={{ ...question, points: 0 }}
          answer={answer}
          onChangeAnswer={onChangeAnswer}
          isLocked={false}
        />
      );
  }
}
