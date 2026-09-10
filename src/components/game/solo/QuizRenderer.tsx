import MultipleChoiceQuiz from "./MultipleChoiceQuiz";

import type { Quiz } from "@/types/quiz";

type QuizRendererProps = {
  quiz: Quiz;
  selectedOptionId: number | null;
  onSelectOption: (optionId: number) => void;
  isSubmitted: boolean;
};

export default function QuizRenderer({
  quiz,
  selectedOptionId,
  onSelectOption,
  isSubmitted,
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
      return <div>O/X 문제</div>;

    case "SUBJECTIVE":
      return <div>주관식 문제</div>;
  }
}
