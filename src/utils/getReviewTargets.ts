import type { ReviewStatus, ReviewTypeId, ReviewWrongAnswer } from "@/types/review";
import { getToday } from "@/utils/getToday";

type ReviewTargets = {
  status: ReviewStatus;
  targets: ReviewWrongAnswer[];
};

// 유형별 복습 대상 오답 (복습 전 오답 우선, 모두 복습 시 오늘 복습한 오답)
export const getReviewTargets = (
  wrongAnswers: ReviewWrongAnswer[],
  typeId: ReviewTypeId,
): ReviewTargets => {
  const typeAnswers = wrongAnswers.filter((wrongAnswer) => wrongAnswer.typeId === typeId);

  const unreviewed = typeAnswers.filter(({ reviewedDate }) => reviewedDate === null);

  if (unreviewed.length > 0) return { status: "UNREVIEWED", targets: unreviewed };

  // 전날 복습 완료 오답 제외
  const today = getToday();
  const reviewedToday = typeAnswers.filter(({ reviewedDate }) => reviewedDate === today);

  if (reviewedToday.length > 0) return { status: "REVIEWED", targets: reviewedToday };

  return { status: "EMPTY", targets: [] };
};
