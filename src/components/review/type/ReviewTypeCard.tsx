import {
  CaseSensitive,
  ChevronRight,
  Highlighter,
  Lightbulb,
  Puzzle,
  SearchCheck,
  type LucideIcon,
} from "lucide-react";

import { MAIN_CATEGORY_LABELS, SUB_CATEGORY_LABELS } from "@/config/questionCategoryConfig";
import type { QuestionMainCategory } from "@/types/game";
import type { ReviewCategory } from "@/types/review";

type ReviewTypeCardProps = {
  category: ReviewCategory;
  onClick: () => void;
};

const typeIcons: Record<QuestionMainCategory, LucideIcon> = {
  vocab: CaseSensitive,
  info_extraction: SearchCheck,
  core_understanding: Highlighter,
  inference_judgment: Lightbulb,
  structure: Puzzle,
};

// 복습 유형 카드 (유형 이름 · 세부 유형 · 틀린 문제 개수, 오답 0개도 클릭 시 안내 모달)
export default function ReviewTypeCard({ category, onClick }: ReviewTypeCardProps) {
  const Icon = typeIcons[category.mainCategory];

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center rounded-2xl bg-[#F3F4FA] py-2.5 pr-4 pl-5 text-left"
    >
      <Icon className="size-8 shrink-0 text-[#2285E3]" />

      <div className="ml-6 min-w-0 flex-1">
        <p className="text-[15px] leading-5 font-bold text-black">
          {MAIN_CATEGORY_LABELS[category.mainCategory]}
        </p>

        <p className="text-[12px] leading-4 font-medium text-[#5E5E5E]">
          {category.subCategories
            .map((subCategory) => SUB_CATEGORY_LABELS[subCategory] ?? subCategory)
            .join(" · ")}
        </p>

        <p className="text-[12px] leading-4 font-medium text-[#8F8F8F]">
          틀린문제 {category.wrongCount}개
        </p>
      </div>

      <ChevronRight className="ml-2 size-6 shrink-0 text-[#5E5E5E]" />
    </button>
  );
}
