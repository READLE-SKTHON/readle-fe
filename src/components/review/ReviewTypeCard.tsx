import {
  CaseSensitive,
  Check,
  ChevronRight,
  Highlighter,
  Lightbulb,
  Puzzle,
  SearchCheck,
  type LucideIcon,
} from "lucide-react";

import { REVIEW_XP_PER_TYPE } from "@/stores/useReviewStore";
import type { ReviewTypeId, ReviewTypeSummary } from "@/types/review";

type ReviewTypeCardProps = {
  reviewType: ReviewTypeSummary;
  isXpEarned: boolean;
  onClick: () => void;
};

const typeIcons: Record<ReviewTypeId, LucideIcon> = {
  VOCABULARY: CaseSensitive,
  INFORMATION: SearchCheck,
  MAIN_IDEA: Highlighter,
  INFERENCE: Lightbulb,
  STRUCTURE: Puzzle,
};

// 복습 유형 카드 (오답 0개 클릭 불가, 오늘 XP 획득 시 획득 완료 표시)
export default function ReviewTypeCard({ reviewType, isXpEarned, onClick }: ReviewTypeCardProps) {
  const Icon = typeIcons[reviewType.typeId];

  return (
    <button
      type="button"
      disabled={reviewType.wrongCount === 0}
      onClick={onClick}
      className="flex w-full cursor-pointer items-center rounded-2xl bg-[#F3F4FA] py-2.5 pr-4 pl-5 text-left disabled:cursor-default"
    >
      <Icon className="size-8 shrink-0 text-[#2285E3]" />

      <div className="ml-6 min-w-0 flex-1">
        <p className="text-[15px] leading-5 font-bold text-black">{reviewType.name}</p>

        <p className="text-[12px] leading-4 font-medium text-[#5E5E5E]">
          {reviewType.subTypes.join(" · ")}
        </p>

        <div className="flex items-center justify-between pr-5 text-[12px] leading-4 font-medium text-[#8F8F8F]">
          <span>틀린문제 {reviewType.wrongCount}개</span>

          {isXpEarned ? (
            <span className="flex items-center gap-0.5 font-semibold text-[#2285E3]">
              <Check strokeWidth={3} className="size-3" />
              획득 완료
            </span>
          ) : (
            <span className="font-semibold">+{REVIEW_XP_PER_TYPE}XP</span>
          )}
        </div>
      </div>

      <ChevronRight className="ml-2 size-6 shrink-0 text-[#5E5E5E]" />
    </button>
  );
}
