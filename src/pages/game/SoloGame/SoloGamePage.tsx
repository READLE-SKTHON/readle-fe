import { useState } from "react";

import Header from "@/components/common/header/Header";
import NewsModal from "@/components/game/solo/NewsModal";
import NewsPreview from "@/components/game/solo/NewsPreview";
import QuizRenderer from "@/components/game/solo/QuizRenderer";

import { mockNews } from "@/mocks/news";
import { mockQuizzes } from "@/mocks/quizzes";

export default function SoloGamePage() {
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isNewsOpen, setIsNewsOpen] = useState(false);

  const currentQuiz = mockQuizzes[0];

  return (
    <div>
      <Header title="혼자 문제풀기" current={1} total={mockQuizzes.length} />

      <main className="px-5 pb-8 pt-6">
        <NewsPreview onOpen={() => setIsNewsOpen(true)} />

        <QuizRenderer
          quiz={currentQuiz}
          selectedOptionId={selectedOptionId}
          onSelectOption={setSelectedOptionId}
        />
      </main>

      {isNewsOpen && <NewsModal news={mockNews} onClose={() => setIsNewsOpen(false)} />}
    </div>
  );
}
