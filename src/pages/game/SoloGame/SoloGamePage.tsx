import { useState } from "react";

import Header from "@/components/common/header/Header";
import FeedbackRenderer from "@/components/game/solo/feedback/FeedbackRenderer";
import NewsModal from "@/components/game/solo/NewsModal";
import NewsPreview from "@/components/game/solo/NewsPreview";
import QuizActionButton from "@/components/game/solo/QuizActionButton";
import QuizRenderer from "@/components/game/solo/QuizRenderer";

import { mockNews } from "@/mocks/news";
import { mockQuizzes } from "@/mocks/quizzes";

export default function SoloGamePage() {
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuiz = mockQuizzes[0];

  const handleSubmit = () => {
    if (selectedOptionId === null) return;

    setIsSubmitted(true);
  };

  const isCorrect =
    currentQuiz.type === "MULTIPLE_CHOICE" && selectedOptionId === currentQuiz.correctAnswer;

  return (
    <div>
      <Header title="혼자 문제풀기" current={1} total={mockQuizzes.length} />

      <main className="px-5 pb-8 pt-6">
        {/* 풀이 전 */}
        {!isSubmitted && <NewsPreview onOpen={() => setIsNewsOpen(true)} />}

        {/* 제출 후 피드백 */}
        {isSubmitted && currentQuiz.type === "MULTIPLE_CHOICE" && (
          <FeedbackRenderer quiz={currentQuiz} status={isCorrect ? "CORRECT" : "INCORRECT"} />
        )}

        <QuizRenderer
          quiz={currentQuiz}
          selectedOptionId={selectedOptionId}
          onSelectOption={setSelectedOptionId}
          isSubmitted={isSubmitted}
        />

        <QuizActionButton
          label={isSubmitted ? "다음" : "제출하기"}
          disabled={!isSubmitted && selectedOptionId === null}
          onClick={handleSubmit}
        />
      </main>

      {isNewsOpen && <NewsModal news={mockNews} onClose={() => setIsNewsOpen(false)} />}
    </div>
  );
}
