import { ChevronRight, type LucideIcon } from "lucide-react";

type FriendModeCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
};

export default function FriendModeCard({
  icon: Icon,
  title,
  description,
  onClick,
}: FriendModeCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-22.25 w-full cursor-pointer items-center gap-4 rounded-2xl bg-[#E8F1F9] px-5 text-left"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#CEE5F8]">
        <Icon className="size-6 text-[#2285E3]" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[20px] font-bold text-black">{title}</span>

        <span className="mt-1 block text-[14px] font-semibold text-[#5E5E5E]">{description}</span>
      </span>

      <ChevronRight className="size-6 shrink-0 text-[#0083FF]" />
    </button>
  );
}
