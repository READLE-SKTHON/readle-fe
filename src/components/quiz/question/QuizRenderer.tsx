import type { ReactNode } from "react";

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

  // O/X·주관식 문제 유형 영역 (없으면 기본 유형 태그)
  metaBar?: ReactNode;
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
  metaBar,
}: QuizRendererProps) {
  switch (quiz.type) {
    case "MULTIPLE_CHOICE":
      return (
        <MultipleChoiceQuiz
          quiz={quiz}
          selectedOptionId={selectedOptionId}
          onSelect={onSelectOption}
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
          metaBar={metaBar}
        />
      );

    case "SUBJECTIVE":
      return (
        <SubjectiveQuiz
          quiz={quiz}
          answer={subjectiveAnswer}
          onChangeAnswer={onChangeSubjectiveAnswer}
          onOpenNews={onOpenNews}
          metaBar={metaBar}
        />
      );
  }
}
