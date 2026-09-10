import MultipleChoiceQuiz from "./MultipleChoiceQuiz";
import OxQuiz from "./OxQuiz";
import SubjectiveQuiz from "./SubjectiveQuiz";

import type { Quiz } from "@/types/quiz";

type QuizRendererProps = {
  quiz: Quiz;

  selectedOptionId: number | null;
  onSelectOption: (optionId: number) => void;

  selectedOxAnswer: "O" | "X" | null;
  reason: string;
  onSelectOxAnswer: (answer: "O" | "X") => void;
  onChangeReason: (reason: string) => void;

  subjectiveAnswer: string;
  onChangeSubjectiveAnswer: (answer: string) => void;

  isSubmitted: boolean;
  onOpenNews: () => void;
};

export default function QuizRenderer({
  quiz,
  selectedOptionId,
  onSelectOption,
  selectedOxAnswer,
  reason,
  onSelectOxAnswer,
  onChangeReason,
  subjectiveAnswer,
  onChangeSubjectiveAnswer,
  isSubmitted,
  onOpenNews,
}: QuizRendererProps) {
  switch (quiz.type) {
    case "MULTIPLE_CHOICE":
      return (
        <MultipleChoiceQuiz
          quiz={quiz}
          selectedOptionId={selectedOptionId}
          onSelect={onSelectOption}
          isSubmitted={isSubmitted}
        />
      );

    case "OX":
      return (
        <OxQuiz
          quiz={quiz}
          selectedAnswer={selectedOxAnswer}
          reason={reason}
          isSubmitted={isSubmitted}
          onSelect={onSelectOxAnswer}
          onChangeReason={onChangeReason}
          onOpenNews={onOpenNews}
        />
      );

    case "SUBJECTIVE":
      return (
        <SubjectiveQuiz
          quiz={quiz}
          answer={subjectiveAnswer}
          onChangeAnswer={onChangeSubjectiveAnswer}
          onOpenNews={onOpenNews}
        />
      );
  }
}
