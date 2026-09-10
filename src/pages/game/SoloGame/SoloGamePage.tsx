import { useState } from "react";

import Header from "@/components/common/header/Header";
import NewsPreview from "@/components/game/solo/NewsPreview";
import QuizRenderer from "@/components/game/solo/QuizRenderer";

import { mockQuizzes } from "@/mocks/quizzes";

export default function SoloGamePage() {
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);

  const currentQuiz = mockQuizzes[0];

  return (
    <div>
      <Header title="혼자 문제풀기" current={1} total={mockQuizzes.length} />

      <main className="px-5 pb-8 pt-6">
        <NewsPreview onOpen={() => {}} />

        <QuizRenderer
          quiz={currentQuiz}
          selectedOptionId={selectedOptionId}
          onSelectOption={setSelectedOptionId}
        />
      </main>
    </div>
  );
}
