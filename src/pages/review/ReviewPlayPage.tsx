import { useMemo, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import ArticleSheet from "@/components/common/article/ArticleSheet";
import Button from "@/components/common/button/Button";
import Header from "@/components/common/header/Header";
import QuizMetaBar from "@/components/game/solo/quiz/QuizMetaBar";
import ReviewFeedback from "@/components/review/ReviewFeedback";
import ReviewQuestionRenderer from "@/components/review/ReviewQuestionRenderer";
import { createMockReviewQuestions, gradeMockReviewAnswer, mockReviewTypes } from "@/mocks/review";
import { useReviewStore } from "@/stores/useReviewStore";
import type { ReviewQuestion } from "@/types/review";

export default function ReviewPlayPage() {
  const navigate = useNavigate();
  const { typeId } = useParams();

  const earnTodayXp = useReviewStore((state) => state.earnTodayXp);

  const reviewType = mockReviewTypes.find((type) => type.typeId === typeId);

  // 오답 1개당 복기·응용 문제 (전체 = 오답 수 × 2)
  const questions = useMemo(
    () => (reviewType ? createMockReviewQuestions(reviewType) : []),
    [reviewType],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // 잘못된 유형·오답 없는 유형은 유형 선택 이동
  if (!reviewType || questions.length === 0) return <Navigate to="/review/types" replace />;

  const question = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  // 다음 문제 이동 또는 복습 완료 처리
  const handleNext = (isCorrect: boolean) => {
    const nextCorrectCount = correctCount + (isCorrect ? 1 : 0);

    if (isLastQuestion) {
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
    <div className="flex h-dvh flex-col">
      {/* TODO: 복습 중단 확인 (디자인 없음) */}
      <Header
        title="훈련하기"
        current={currentIndex + 1}
        total={questions.length}
        backPath="/review/types"
      />

      <ReviewStep key={question.questionId} question={question} onNext={handleNext} />
    </div>
  );
}

type ReviewStepProps = {
  question: ReviewQuestion;
  onNext: (isCorrect: boolean) => void;
};

// 문제별 풀이 단계 (답안·제출 여부는 문제별 내부 상태)
function ReviewStep({ question, onNext }: ReviewStepProps) {
  const [answer, setAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isArticleOpen, setIsArticleOpen] = useState(false);

  const mainRef = useRef<HTMLElement>(null);

  const isCorrect = isSubmitted && gradeMockReviewAnswer(question, answer);

  // 동일 유형 신규 지문 응용 문제
  const isApply = question.reviewKind === "APPLY";

  // 공백만 입력한 경우 제출 불가
  const canSubmit = answer.trim().length > 0;

  // 제출 후 피드백 확인 → 다음 문제
  const handleAction = () => {
    if (!isSubmitted) {
      setIsSubmitted(true);
      mainRef.current?.scrollTo({ top: 0 });
      return;
    }

    onNext(isCorrect);
  };

  // 태그·피드백과 문제 사이 간격
  const questionSpacing = isSubmitted ? "mt-6" : isApply ? "mt-3" : "mt-10";

  return (
    <>
      <main ref={mainRef} className="min-h-0 flex-1 overflow-y-auto px-6 pt-5 pb-4">
        {isSubmitted ? (
          <ReviewFeedback isCorrect={isCorrect} explanation={question.explanation} />
        ) : (
          <>
            <QuizMetaBar
              type={question.category}
              subtype={question.subCategory}
              onOpenNews={() => setIsArticleOpen(true)}
            />

            {/* 응용 문제 태그 */}
            {isApply && (
              <span className="mt-6 inline-block rounded-full bg-[#2285E3] px-4 py-1 text-[14px] font-bold text-white">
                응용
              </span>
            )}
          </>
        )}

        <div className={questionSpacing}>
          <ReviewQuestionRenderer
            question={question}
            answer={answer}
            onChangeAnswer={setAnswer}
            isSubmitted={isSubmitted}
            isCorrect={isCorrect}
          />
        </div>
      </main>

      <div className="shrink-0 px-6 pt-3 pb-6">
        <Button
          label={isSubmitted ? "다음" : "제출하기"}
          disabled={!isSubmitted && !canSubmit}
          onClick={handleAction}
        />
      </div>

      {/* 지문 전체보기 */}
      {isArticleOpen && (
        <ArticleSheet news={question.news} onClose={() => setIsArticleOpen(false)} />
      )}
    </>
  );
}
