import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/common/header/Header";
import FeedbackRenderer from "@/components/game/solo/feedback/FeedbackRenderer";
import OxResult from "@/components/game/solo/feedback/result/OxResult";
import SubjectiveResult from "@/components/game/solo/feedback/result/SubjectiveResult";
import NewsModal from "@/components/game/solo/NewsModal";
import NewsPreview from "@/components/game/solo/NewsPreview";
import QuizTimer from "@/components/game/solo/QuizTimer";
import QuizActionButton from "@/components/game/solo/quiz/QuizActionButton";
import QuizMetaBar from "@/components/game/solo/quiz/QuizMetaBar";
import QuizRenderer from "@/components/game/solo/quiz/QuizRenderer";

import { GAME_LEVEL_CONFIG, type UserLevel } from "@/config/gameLevelConfig";

import { mockNews } from "@/mocks/news";
import { mockQuizzes } from "@/mocks/quizzes";

import type { FeedbackStatus } from "@/types/quiz";

export default function SoloGamePage() {
  const navigate = useNavigate();

  //임시 사용자 레벨

  const userLevel: UserLevel = 3;

  // 현재 레벨 게임 설정
  const gameConfig = GAME_LEVEL_CONFIG[userLevel];

  // 현재 문제 번호
  const [currentIndex, setCurrentIndex] = useState(0);

  // 맞힌 문제 수
  const [correctCount, setCorrectCount] = useState(0);

  // 객관식 답
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);

  // O/X 답
  const [selectedOxAnswer, setSelectedOxAnswer] = useState<"O" | "X" | null>(null);

  // O/X 근거
  const [reason, setReason] = useState("");

  // 주관식 답
  const [subjectiveAnswer, setSubjectiveAnswer] = useState("");

  // 뉴스 모달
  const [isNewsOpen, setIsNewsOpen] = useState(false);

  // 제출 여부
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 현재 퀴즈
  const currentQuiz = mockQuizzes[currentIndex];

  // 제출 가능 여부
  const canSubmit = (() => {
    if (currentQuiz.type === "MULTIPLE_CHOICE") {
      return selectedOptionId !== null;
    }

    if (currentQuiz.type === "OX") {
      return selectedOxAnswer !== null && (!currentQuiz.requiresReason || reason.trim().length > 0);
    }

    if (currentQuiz.type === "SUBJECTIVE") {
      return subjectiveAnswer.trim().length > 0;
    }

    return false;
  })();

  // 피드백 상태
  const getFeedbackStatus = (): FeedbackStatus | null => {
    // 객관식
    if (currentQuiz.type === "MULTIPLE_CHOICE") {
      return selectedOptionId === currentQuiz.correctAnswer ? "CORRECT" : "INCORRECT";
    }

    // O/X
    if (currentQuiz.type === "OX") {
      if (selectedOxAnswer !== currentQuiz.correctAnswer) {
        return "INCORRECT";
      }

      // 임시 기준
      // 추후 AI/API 평가 결과로 변경
      if (reason.trim().length < 10) {
        return "PARTIAL";
      }

      return "CORRECT";
    }

    // 주관식
    if (currentQuiz.type === "SUBJECTIVE") {
      // 임시 처리
      // 추후 AI/API 채점 결과로 변경
      return "CORRECT";
    }

    return null;
  };

  // 제출
  const handleSubmit = () => {
    if (!canSubmit) return;

    const status = getFeedbackStatus();

    if (status === "CORRECT") {
      setCorrectCount((prev) => prev + 1);
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
    setSelectedOptionId(null);
    setSelectedOxAnswer(null);
    setReason("");
    setSubjectiveAnswer("");
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

  const feedbackStatus = getFeedbackStatus();

  return (
    <div>
      <Header
        title="혼자 문제풀기"
        current={currentIndex + 1}
        total={mockQuizzes.length}
        backPath="/game/solo"
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

        {/* 제출 후 상단 피드백 */}
        {isSubmitted && feedbackStatus && (
          <FeedbackRenderer quiz={currentQuiz} status={feedbackStatus} />
        )}

        {/* O/X 제출 후 상세 결과 */}
        {isSubmitted && currentQuiz.type === "OX" && selectedOxAnswer && feedbackStatus && (
          <OxResult
            quiz={currentQuiz}
            selectedAnswer={selectedOxAnswer}
            reason={reason}
            status={feedbackStatus}
          />
        )}

        {/* 주관식 제출 후 상세 결과 */}
        {isSubmitted && currentQuiz.type === "SUBJECTIVE" && feedbackStatus && (
          <SubjectiveResult quiz={currentQuiz} answer={subjectiveAnswer} />
        )}

        {/* 문제 풀이 화면 */}
        {(!isSubmitted || currentQuiz.type === "MULTIPLE_CHOICE") && (
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

        {/* 제출 / 다음 */}
        <QuizActionButton
          label={isSubmitted ? "다음" : currentQuiz.type === "SUBJECTIVE" ? "다음" : "제출하기"}
          disabled={!isSubmitted && !canSubmit}
          onClick={handleAction}
        />
      </main>

      {/* 뉴스 전체보기 */}
      {isNewsOpen && gameConfig.canOpenNews && (
        <NewsModal news={mockNews} onClose={() => setIsNewsOpen(false)} />
      )}
    </div>
  );
}
