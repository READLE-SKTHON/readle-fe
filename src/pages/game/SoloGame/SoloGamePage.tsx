import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/common/header/Header";
import ArticleSheet from "@/components/common/article/ArticleSheet";
import GameExitModal from "@/components/game/solo/GameExitModal";
import QuizTimer from "@/components/game/solo/QuizTimer";
import NewsPreview from "@/components/quiz/question/NewsPreview";
import QuizActionButton from "@/components/quiz/question/QuizActionButton";
import QuizMetaBar from "@/components/quiz/question/QuizMetaBar";
import QuizRenderer from "@/components/quiz/question/QuizRenderer";
import QuizResultRenderer from "@/components/quiz/result/QuizResultRenderer";

import { GAME_LEVEL_CONFIG, type UserLevel } from "@/config/gameLevelConfig";

import useQuizAnswer from "@/hooks/useQuizAnswer";

import { mockNews } from "@/mocks/news";
import { mockQuizzes } from "@/mocks/quizzes";

import { useReviewStore } from "@/stores/useReviewStore";

export default function SoloGamePage() {
  const navigate = useNavigate();

  // 오답 저장 (훈련하기 유형별 정리)
  const saveWrongAnswer = useReviewStore((state) => state.saveWrongAnswer);

  // 임시 사용자 레벨
  const userLevel: UserLevel = 2;

  // 현재 레벨 게임 설정
  const gameConfig = GAME_LEVEL_CONFIG[userLevel];

  // 현재 문제 번호
  const [currentIndex, setCurrentIndex] = useState(0);

  // 맞힌 문제 수
  const [correctCount, setCorrectCount] = useState(0);

  // 뉴스 모달
  const [isNewsOpen, setIsNewsOpen] = useState(false);

  // 게임 종료 경고 모달
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  // 제출 여부
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 현재 퀴즈
  const currentQuiz = mockQuizzes[currentIndex];

  // 답안 상태·제출 가능 여부·피드백 상태
  const {
    selectedOptionId,
    setSelectedOptionId,
    selectedOxAnswer,
    setSelectedOxAnswer,
    reason,
    setReason,
    subjectiveAnswer,
    setSubjectiveAnswer,
    canSubmit,
    feedbackStatus,
    resetAnswer,
  } = useQuizAnswer(currentQuiz);

  // 제출
  const handleSubmit = () => {
    if (!canSubmit) return;

    if (feedbackStatus === "CORRECT") {
      setCorrectCount((prev) => prev + 1);
    }

    // 오답 훈련하기 유형별 저장
    if (feedbackStatus === "INCORRECT") {
      saveWrongAnswer(currentQuiz, mockNews);
    }

    setIsSubmitted(true);
  };

  // 다음 문제
  const handleNext = () => {
    const isLastQuiz = currentIndex === mockQuizzes.length - 1;

    // 마지막 문제면 결과 페이지로 이동
    if (isLastQuiz) {
      navigate("/game/solo/result", {
        state: {
          total: mockQuizzes.length,
          correctCount,
          exp: correctCount * 80,
        },
      });

      return;
    }

    // 다음 문제
    setCurrentIndex((prev) => prev + 1);

    // 이전 문제 상태 초기화
    resetAnswer();
    setIsSubmitted(false);
  };

  // 하단 버튼
  const handleAction = () => {
    if (isSubmitted) {
      handleNext();
      return;
    }

    handleSubmit();
  };

  return (
    <div>
      <Header
        title="혼자 문제풀기"
        current={currentIndex + 1}
        total={mockQuizzes.length}
        onBack={() => setIsExitModalOpen(true)}
      />

      <main className="px-5 pb-8 pt-6">
        {/* Lv.2 / Lv.3 타이머 */}
        {gameConfig.hasTimer && !isSubmitted && <QuizTimer key={currentIndex} duration={60} />}

        {/* 객관식 풀이 전 */}
        {!isSubmitted && currentQuiz.type === "MULTIPLE_CHOICE" && (
          <>
            {/* 문제 유형 / 지문 전체보기 */}
            <QuizMetaBar
              type="객관식"
              subtype="요지"
              canOpenNews={gameConfig.canOpenNews}
              onOpenNews={() => setIsNewsOpen(true)}
            />

            {/* 뉴스 미리보기 */}
            <NewsPreview />
          </>
        )}

        {/* 제출 후 결과 */}
        {isSubmitted && (
          <QuizResultRenderer
            quiz={currentQuiz}
            status={feedbackStatus}
            selectedOptionId={selectedOptionId}
            selectedOxAnswer={selectedOxAnswer}
            reason={reason}
            subjectiveAnswer={subjectiveAnswer}
            explanation="왜냐하면 블라블라이기 때문"
          />
        )}

        {/* 제출 전 문제 풀이 화면 */}
        {!isSubmitted && (
          <QuizRenderer
            quiz={currentQuiz}
            selectedOptionId={selectedOptionId}
            onSelectOption={setSelectedOptionId}
            selectedOxAnswer={selectedOxAnswer}
            reason={reason}
            onSelectOxAnswer={setSelectedOxAnswer}
            onChangeReason={setReason}
            subjectiveAnswer={subjectiveAnswer}
            onChangeSubjectiveAnswer={setSubjectiveAnswer}
            isSubmitted={isSubmitted}
            onOpenNews={() => setIsNewsOpen(true)}
          />
        )}

        {/* 제출 / 다음 버튼 */}
        <QuizActionButton
          label={isSubmitted ? "다음" : currentQuiz.type === "SUBJECTIVE" ? "다음" : "제출하기"}
          disabled={!isSubmitted && !canSubmit}
          onClick={handleAction}
        />
      </main>

      {/* 지문 전체보기 */}
      {isNewsOpen && gameConfig.canOpenNews && (
        <ArticleSheet news={mockNews} onClose={() => setIsNewsOpen(false)} />
      )}

      {/* 게임 종료 경고 모달 */}
      {isExitModalOpen && (
        <GameExitModal
          onClose={() => setIsExitModalOpen(false)}
          onExit={() => navigate("/game/solo")}
        />
      )}
    </div>
  );
}
