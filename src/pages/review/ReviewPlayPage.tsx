import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import ArticleSheet from "@/components/common/article/ArticleSheet";
import Header from "@/components/common/header/Header";
import ConfirmModal from "@/components/common/modal/ConfirmModal";
import GameExitModal from "@/components/common/modal/GameExitModal";
import NewsPreview from "@/components/quiz/question/NewsPreview";
import QuizActionButton from "@/components/quiz/question/QuizActionButton";
import QuizRenderer from "@/components/quiz/question/QuizRenderer";
import QuizResultRenderer from "@/components/quiz/result/QuizResultRenderer";
import ReviewMetaBar from "@/components/review/play/ReviewMetaBar";
import useQuizAnswer from "@/hooks/useQuizAnswer";
import useSubmitReviewAnswerMutation from "@/queries/review/useSubmitReviewAnswerMutation";
import { useReviewStore } from "@/stores/useReviewStore";
import type { News } from "@/types/news";
import type { ReviewQuestion } from "@/types/review";
import { getApiError } from "@/utils/getApiError";
import { getQuestionCategoryLabel } from "@/utils/getQuestionCategoryLabel";
import { applyReviewResult, toReviewQuiz } from "@/utils/toReviewQuiz";

export default function ReviewPlayPage() {
  const navigate = useNavigate();

  const session = useReviewStore((state) => state.session);
  const clearSession = useReviewStore((state) => state.clearSession);

  const [currentIndex, setCurrentIndex] = useState(0);

  // 복습 종료 경고 모달
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  // 복습 세션 없이 진입 시 유형 선택 이동
  if (!session || session.questions.length === 0) return <Navigate to="/review/types" replace />;

  const question = session.questions[currentIndex];
  const isLastQuestion = currentIndex === session.questions.length - 1;

  // 다음 문제 이동 또는 결과 화면 이동
  const handleNext = () => {
    if (isLastQuestion) {
      navigate("/review/result", { replace: true });
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  // 복습 종료 처리 (세션 초기화 후 유형 선택 이동)
  const handleExit = () => {
    navigate("/review/types", { replace: true });
    clearSession();
  };

  return (
    <div>
      <Header
        title="훈련하기"
        current={currentIndex + 1}
        total={session.questions.length}
        onBack={() => setIsExitModalOpen(true)}
      />

      <ReviewStep
        key={currentIndex}
        reviewSessionId={session.reviewSessionId}
        question={question}
        onNext={handleNext}
      />

      {/* 복습 종료 경고 모달 */}
      {isExitModalOpen && (
        <GameExitModal
          title="복습을 종료할까요?"
          description={
            <>
              지금 나가면 진행 중인
              <br />
              복습이 저장되지 않아요.
            </>
          }
          onClose={() => setIsExitModalOpen(false)}
          onExit={handleExit}
        />
      )}
    </div>
  );
}

type ReviewStepProps = {
  reviewSessionId: number;
  question: ReviewQuestion;
  onNext: () => void;
};

// 문제별 풀이 단계 (혼자 문제풀기와 같은 화면, 서버 채점)
function ReviewStep({ reviewSessionId, question, onNext }: ReviewStepProps) {
  const quiz = useMemo(() => toReviewQuiz(question), [question]);

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
  } = useQuizAnswer(quiz);

  const {
    mutate: submitAnswer,
    data: result,
    isPending,
    error,
    reset,
  } = useSubmitReviewAnswerMutation(reviewSessionId);

  // 지문 전체보기
  const [isArticleOpen, setIsArticleOpen] = useState(false);

  // 답안 제출값 (객관식 보기 번호, OX 값, 단답형 앞뒤 공백 제거)
  const getSelectedAnswer = () => {
    if (quiz.type === "MULTIPLE_CHOICE") return String(selectedOptionId);
    if (quiz.type === "OX") return selectedOxAnswer ?? "";

    return subjectiveAnswer.trim();
  };

  // 하단 버튼 처리 (제출 → 다음 문제)
  const handleAction = () => {
    if (result) {
      onNext();
      return;
    }

    if (!canSubmit || isPending) return;

    submitAnswer({
      questionId: question.question.questionId,
      request: { selectedAnswer: getSelectedAnswer() },
    });
  };

  // 문제 유형 태그 (응용: 같은 유형 다른 기사 문제)
  const tag = getQuestionCategoryLabel(
    question.question.mainCategory,
    question.question.subCategory,
  );

  const metaBar = (
    <ReviewMetaBar
      typeName={tag.type}
      subType={tag.subtype}
      isApply={question.mode === "PRACTICE"}
      onOpenNews={() => setIsArticleOpen(true)}
    />
  );

  // 지문 전체보기 기사 (출처·게시일 미제공)
  const news: News = {
    newsId: question.article.newsId,
    title: question.article.title,
    category: "",
    publisher: "",
    publishedAt: "",
    content: question.article.content,
    sourceUrl: "",
  };

  return (
    <>
      <main className="px-5 pb-8 pt-6">
        {/* 객관식 풀이 전 */}
        {!result && quiz.type === "MULTIPLE_CHOICE" && (
          <>
            {metaBar}

            {/* 기사 미리보기 */}
            <NewsPreview content={question.article.content} />
          </>
        )}

        {/* 제출 후 결과 (서버 채점) */}
        {result && (
          <QuizResultRenderer
            quiz={applyReviewResult(quiz, result)}
            status={result.correct ? "CORRECT" : "INCORRECT"}
            selectedOptionId={selectedOptionId}
            selectedOxAnswer={selectedOxAnswer}
            reason={reason}
            subjectiveAnswer={subjectiveAnswer}
            explanation={result.explanation}
          />
        )}

        {/* 제출 전 문제 풀이 화면 */}
        {!result && (
          <QuizRenderer
            quiz={quiz}
            selectedOptionId={selectedOptionId}
            onSelectOption={setSelectedOptionId}
            selectedOxAnswer={selectedOxAnswer}
            reason={reason}
            onSelectOxAnswer={setSelectedOxAnswer}
            onChangeReason={setReason}
            subjectiveAnswer={subjectiveAnswer}
            onChangeSubjectiveAnswer={setSubjectiveAnswer}
            isSubmitted={false}
            onOpenNews={() => setIsArticleOpen(true)}
            metaBar={metaBar}
          />
        )}

        {/* 제출 / 다음 버튼 */}
        <QuizActionButton
          label={result ? "다음" : quiz.type === "SUBJECTIVE" ? "다음" : "제출하기"}
          disabled={(!result && !canSubmit) || isPending}
          onClick={handleAction}
        />
      </main>

      {/* 지문 전체보기 */}
      {isArticleOpen && <ArticleSheet news={news} onClose={() => setIsArticleOpen(false)} />}

      {/* 답안 제출 실패 안내 */}
      {error && <ConfirmModal message={getApiError(error).message} onConfirm={reset} />}
    </>
  );
}
