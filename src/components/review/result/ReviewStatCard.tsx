import type { LucideIcon } from "lucide-react";

type ReviewStatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

// 복습 완료 결과 카드 (오늘 푼 문제 · 정답률)
export default function ReviewStatCard({ icon: Icon, label, value }: ReviewStatCardProps) {
  return (
    <div className="flex h-17.5 items-center rounded-2xl border border-[#B8DAF8] bg-[#E8F1F9] px-6">
      <Icon className="size-5 shrink-0 text-[#5E5E5E]" />

      <span className="ml-2.5 flex-1 text-[20px] font-medium text-[#5E5E5E]">{label}</span>

      <strong className="w-14 shrink-0 text-[24px] font-bold text-black">{value}</strong>
    </div>
  );
}
