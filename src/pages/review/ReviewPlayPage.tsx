import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import ArticleSheet from "@/components/common/article/ArticleSheet";
import Header from "@/components/common/header/Header";
import NewsPreview from "@/components/quiz/question/NewsPreview";
import QuizActionButton from "@/components/quiz/question/QuizActionButton";
import QuizRenderer from "@/components/quiz/question/QuizRenderer";
import QuizResultRenderer from "@/components/quiz/result/QuizResultRenderer";
import ReviewMetaBar from "@/components/review/play/ReviewMetaBar";
import useQuizAnswer from "@/hooks/useQuizAnswer";
import { createMockReviewQuizzes, mockReviewTypes } from "@/mocks/review";
import { useReviewStore } from "@/stores/useReviewStore";
import type { ReviewQuiz } from "@/types/review";
import { getReviewTargets } from "@/utils/getReviewTargets";

export default function ReviewPlayPage() {
  const navigate = useNavigate();
  const { typeId } = useParams();

  const earnTodayXp = useReviewStore((state) => state.earnTodayXp);
  const completeReview = useReviewStore((state) => state.completeReview);

  const reviewType = mockReviewTypes.find((type) => type.typeId === typeId);

  // 오답 1개당 복기·응용 문제 (입장 시점 복습 대상 기준 고정)
  const [questions] = useState(() => {
    if (!reviewType) return [];

    const { targets } = getReviewTargets(useReviewStore.getState().wrongAnswers, reviewType.typeId);

    return createMockReviewQuizzes(reviewType, targets);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // 잘못된 유형·틀린 문제 없는 유형은 유형 선택 이동
  if (!reviewType || questions.length === 0) return <Navigate to="/review/types" replace />;

  const question = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  // 다음 문제 이동 또는 복습 완료 처리
  const handleNext = (isCorrect: boolean) => {
    const nextCorrectCount = correctCount + (isCorrect ? 1 : 0);

    if (isLastQuestion) {
      // 복기한 오답 복습 완료 처리 (유형별 틀린 문제 개수 제외)
      completeReview(
        questions.filter(({ reviewKind }) => reviewKind === "RETRY").map(({ quizId }) => quizId),
      );

      // 유형별 일일 XP 획득 (오늘 이미 받은 유형 제외)
      earnTodayXp(reviewType.typeId);

      navigate("/review/result", {
        replace: true,
        state: { solvedCount: questions.length, correctCount: nextCorrectCount },
      });
      return;
    }

    setCorrectCount(nextCorrectCount);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div>
      {/* TODO: 복습 중단 확인 (디자인 없음) */}
      <Header
        title="훈련하기"
        current={currentIndex + 1}
        total={questions.length}
        backPath="/review/types"
      />

      <ReviewStep key={currentIndex} question={question} onNext={handleNext} />
    </div>
  );
}

type ReviewStepProps = {
  question: ReviewQuiz;
  onNext: (isCorrect: boolean) => void;
};

// 문제별 풀이 단계 (혼자 문제풀기와 같은 화면, 답안·제출 여부는 문제별 내부 상태)
function ReviewStep({ question, onNext }: ReviewStepProps) {
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
  } = useQuizAnswer(question);

  // 제출 여부
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 지문 전체보기
  const [isArticleOpen, setIsArticleOpen] = useState(false);

  // 하단 버튼 (제출 → 다음 문제)
  const handleAction = () => {
    if (isSubmitted) {
      onNext(feedbackStatus === "CORRECT");
      return;
    }

    if (!canSubmit) return;

    setIsSubmitted(true);
  };

  // 훈련하기 유형 태그·응용 태그
  const metaBar = (
    <ReviewMetaBar
      typeName={question.typeName}
      subType={question.subType}
      isApply={question.reviewKind === "APPLY"}
      onOpenNews={() => setIsArticleOpen(true)}
    />
  );

  return (
    <>
      <main className="px-5 pb-8 pt-6">
        {/* 객관식 풀이 전 */}
        {!isSubmitted && question.type === "MULTIPLE_CHOICE" && (
          <>
            {metaBar}

            {/* 기사 미리보기 */}
            <NewsPreview content={question.news.content} />
          </>
        )}

        {/* 제출 후 결과 */}
        {isSubmitted && (
          <QuizResultRenderer
            quiz={question}
            status={feedbackStatus}
            selectedOptionId={selectedOptionId}
            selectedOxAnswer={selectedOxAnswer}
            reason={reason}
            subjectiveAnswer={subjectiveAnswer}
            explanation={question.explanation}
          />
        )}

        {/* 제출 전 문제 풀이 화면 */}
        {!isSubmitted && (
          <QuizRenderer
            quiz={question}
            selectedOptionId={selectedOptionId}
            onSelectOption={setSelectedOptionId}
            selectedOxAnswer={selectedOxAnswer}
            reason={reason}
            onSelectOxAnswer={setSelectedOxAnswer}
            onChangeReason={setReason}
            subjectiveAnswer={subjectiveAnswer}
            onChangeSubjectiveAnswer={setSubjectiveAnswer}
            isSubmitted={isSubmitted}
            onOpenNews={() => setIsArticleOpen(true)}
            metaBar={metaBar}
          />
        )}

        {/* 제출 / 다음 버튼 */}
        <QuizActionButton
          label={isSubmitted ? "다음" : question.type === "SUBJECTIVE" ? "다음" : "제출하기"}
          disabled={!isSubmitted && !canSubmit}
          onClick={handleAction}
        />
      </main>

      {/* 지문 전체보기 */}
      {isArticleOpen && (
        <ArticleSheet news={question.news} onClose={() => setIsArticleOpen(false)} />
      )}
    </>
  );
}
