import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ArticleSheet from "@/components/common/article/ArticleSheet";
import Header from "@/components/common/header/Header";
import GameExitModal from "@/components/common/modal/GameExitModal";
import QuizTimer from "@/components/game/solo/QuizTimer";
import NewsPreview from "@/components/quiz/question/NewsPreview";
import QuizActionButton from "@/components/quiz/question/QuizActionButton";
import QuizMetaBar from "@/components/quiz/question/QuizMetaBar";
import QuizRenderer from "@/components/quiz/question/QuizRenderer";
import QuizResultRenderer from "@/components/quiz/result/QuizResultRenderer";

import { GAME_LEVEL_CONFIG } from "@/config/gameLevelConfig";

import { useSubmitTrainingAnswer, useTodayTraining } from "@/hooks/queries/useTraining";
import useQuizAnswer from "@/hooks/useQuizAnswer";

import { useUserStore } from "@/stores/useUserStore";

import type { News } from "@/types/news";
import type { FeedbackStatus } from "@/types/quiz";
import type { SubmitAnswerResult, TodayTraining } from "@/types/training";

import { getQuestionCategoryLabel } from "@/utils/getQuestionCategoryLabel";
import {
  getTrainingErrorMessage,
  getTrainingFeedback,
  mapTrainingQuestionToQuiz,
  mapTrainingResultToQuiz,
} from "@/utils/trainingMapper";

export default function SoloGamePage() {
  const userId = useUserStore((state) => state.user?.id);
  const { data: training, isPending, isError, error } = useTodayTraining();
  if (!userId)
    return (
      <div>
        <Header title="혼자 문제풀기" />
        <p role="status">로그인이 필요합니다.</p>
      </div>
    );

  if (isPending) {
    return (
      <div>
        <Header title="혼자 문제풀기" />

        <main className="px-5 pt-10">
          <p className="text-center text-gray-500">문제를 불러오는 중입니다.</p>
        </main>
      </div>
    );
  }

  if (
    isError ||
    !training ||
    training.questions.length === 0 ||
    training.questions.some(
      (question) =>
        !["multiple_choice", "ox", "short_answer"].includes(question.questionFormat.toLowerCase()),
    )
  ) {
    return (
      <div>
        <Header title="혼자 문제풀기" />

        <main className="px-5 pt-10">
          <p className="text-center text-gray-500">
            {error ? getTrainingErrorMessage(error) : "오늘의 문제가 아직 준비되지 않았습니다."}
          </p>
        </main>
      </div>
    );
  }

  return <SoloGameContent training={training} />;
}

type SoloGameContentProps = {
  training: TodayTraining;
};

function SoloGameContent({ training }: SoloGameContentProps) {
  const navigate = useNavigate();

  // 답안 제출 API
  const submitTraining = useSubmitTrainingAnswer();

  // 사용자 레벨
  const userLevel = training.userLevel === 2 || training.userLevel === 3 ? training.userLevel : 1;

  // 현재 레벨 게임 설정
  const gameConfig = GAME_LEVEL_CONFIG[userLevel];

  // 현재 문제 번호
  const [currentIndex, setCurrentIndex] = useState(0);

  // 뉴스 모달
  const [isNewsOpen, setIsNewsOpen] = useState(false);

  // 게임 종료 경고 모달
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  // 제출 여부
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 서버 제출 결과
  const [submitResult, setSubmitResult] = useState<SubmitAnswerResult | null>(null);

  // 현재 서버 문제
  const currentQuestion = training.questions[currentIndex];

  // 서버 문제 → 기존 Quiz UI 타입으로 변환
  const currentQuiz = mapTrainingQuestionToQuiz(currentQuestion);

  // 서버 기사 → 기존 News 타입으로 변환
  const currentNews: News = {
    newsId: training.article.newsId,
    title: training.article.title ?? "",
    category: training.article.category,
    publisher: training.article.publisher,
    publishedAt: training.article.publishedAt,
    content: training.article.content,
    sourceUrl: training.article.sourceUrl ?? "",
  };

  // 문제 유형 태그 (같이 게임하기와 같은 한글 유형 이름)
  const quizTag = getQuestionCategoryLabel(
    currentQuestion.mainCategory,
    currentQuestion.subCategory,
  );

  // 답안 입력 상태
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
    resetAnswer,
  } = useQuizAnswer(currentQuiz);

  // 서버 채점 결과 → 기존 UI 상태로 변환
  const feedbackStatus: FeedbackStatus | null =
    submitResult?.resultStatus === "correct"
      ? "CORRECT"
      : submitResult?.resultStatus === "incorrect"
        ? "INCORRECT"
        : submitResult?.resultStatus === "insufficient_reasoning"
          ? "PARTIAL"
          : null;

  // 답안 제출
  const handleSubmit = () => {
    if (isSubmitted || !canSubmit || submitTraining.isPending) return;

    let selectedAnswer = "";

    // 객관식
    if (currentQuiz.type === "MULTIPLE_CHOICE" && selectedOptionId !== null) {
      selectedAnswer =
        currentQuiz.options.find((option) => option.id === selectedOptionId)?.text ?? "";
    }

    // O/X
    if (currentQuiz.type === "OX") {
      selectedAnswer = selectedOxAnswer ?? "";
    }

    // 주관식
    if (currentQuiz.type === "SUBJECTIVE") {
      selectedAnswer = subjectiveAnswer.trim();
    }

    submitTraining.mutate(
      {
        questionId: currentQuestion.questionId,
        body: {
          selectedAnswer,
          reason: reason.trim() || undefined,
        },
      },
      {
        onSuccess: (result) => {
          setSubmitResult(result);

          setIsSubmitted(true);
        },

        onError: (error) => {
          console.error("답안 제출 실패", error);
        },
      },
    );
  };

  // 다음 문제
  const handleNext = () => {
    const isLastQuiz = currentIndex === training.questions.length - 1;

    // 마지막 문제면 결과 페이지 이동
    if (isLastQuiz) {
      navigate("/game/solo/result");
      return;
    }

    setCurrentIndex((prev) => prev + 1);

    // 이전 문제 상태 초기화
    resetAnswer();
    submitTraining.reset();
    setSubmitResult(null);
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

  // 문제 유형 / 지문 전체보기
  const metaBar = (
    <QuizMetaBar
      type={quizTag.type}
      subtype={quizTag.subtype}
      canOpenNews={gameConfig.canOpenNews}
      onOpenNews={() => setIsNewsOpen(true)}
    />
  );

  return (
    <div>
      <Header
        title="혼자 문제풀기"
        current={currentIndex + 1}
        total={training.questionCount}
        onBack={() => setIsExitModalOpen(true)}
      />

      <main className="px-5 pb-8 pt-6">
        {/* Lv.2 / Lv.3 타이머 */}
        {gameConfig.hasTimer && !isSubmitted && <QuizTimer key={currentIndex} duration={60} />}

        {/* 객관식 풀이 전 */}
        {!isSubmitted && currentQuiz.type === "MULTIPLE_CHOICE" && (
          <>
            {metaBar}

            <NewsPreview content={training.article.content} />
          </>
        )}

        {/* 제출 후 결과 */}
        {isSubmitted && (
          <QuizResultRenderer
            quiz={mapTrainingResultToQuiz(currentQuiz, submitResult, selectedOptionId)}
            status={feedbackStatus}
            selectedOptionId={selectedOptionId}
            selectedOxAnswer={selectedOxAnswer}
            reason={reason}
            subjectiveAnswer={subjectiveAnswer}
            explanation={Object.values(getTrainingFeedback(submitResult))
              .filter(Boolean)
              .join("\n")}
          />
        )}

        {/* 제출 전 문제 풀이 */}
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
            metaBar={metaBar}
          />
        )}

        {submitTraining.isError && (
          <p role="alert">답안 제출에 실패했습니다. 다시 시도해 주세요.</p>
        )}

        {/* 제출 / 다음 버튼 */}
        <QuizActionButton
          label={isSubmitted ? "다음" : currentQuiz.type === "SUBJECTIVE" ? "다음" : "제출하기"}
          disabled={(!isSubmitted && !canSubmit) || submitTraining.isPending}
          onClick={handleAction}
        />
      </main>

      {/* 지문 전체보기 */}
      {isNewsOpen && gameConfig.canOpenNews && (
        <ArticleSheet news={currentNews} onClose={() => setIsNewsOpen(false)} />
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
