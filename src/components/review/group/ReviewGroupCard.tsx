import { ChevronRight } from "lucide-react";

import { SUB_CATEGORY_LABELS } from "@/config/questionCategoryConfig";
import type { ReviewGroup } from "@/types/review";

type ReviewGroupCardProps = {
  group: ReviewGroup;

  // 복습 시작 요청 중 비활성
  disabled?: boolean;

  onClick: () => void;
};

// 틀린 날짜 표시 형식 (2026-10-17 → 2026.10.17)
const formatDate = (date: string) => date.replaceAll("-", ".");

// 세부 유형 · 틀린 날짜 카드
export default function ReviewGroupCard({
  group,
  disabled = false,
  onClick,
}: ReviewGroupCardProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex h-18 w-full cursor-pointer items-center rounded-3xl bg-[#F3F4FA] pr-5 pl-7 text-left disabled:cursor-default disabled:opacity-60"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-[16px] leading-6 font-bold text-black">
          {SUB_CATEGORY_LABELS[group.subCategory] ?? group.subCategory}
        </p>

        <p className="text-[14px] leading-5 font-semibold text-[#5E5E5E]">
          {formatDate(group.date)}
        </p>
      </div>

      <ChevronRight className="size-7 shrink-0 text-[#5E5E5E]" />
    </button>
  );
}
