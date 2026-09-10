import MultipleChoiceQuiz from "./MultipleChoiceQuiz";

import type { Quiz } from "@/types/quiz";

type QuizRendererProps = {
  quiz: Quiz;
  selectedOptionId: number | null;
  onSelectOption: (optionId: number) => void;
};

export default function QuizRenderer({
  quiz,
  selectedOptionId,
  onSelectOption,
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
      return <div>O/X 문제</div>;

    case "SUBJECTIVE":
      return <div>주관식 문제</div>;
  }
}
