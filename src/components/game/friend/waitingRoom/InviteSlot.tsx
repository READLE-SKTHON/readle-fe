import { Plus } from "lucide-react";

type InviteSlotProps = {
  onClick: () => void;
};

export default function InviteSlot({ onClick }: InviteSlotProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="flex h-17.5 w-full cursor-pointer items-center gap-5 rounded-2xl bg-[#F4F4F4] px-6 text-[18px] font-semibold text-[#8F8F8F]"
      >
        {/* 프로필 자리 초대 아이콘 */}
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#8F8F8F]">
          <Plus className="size-5 text-[#8F8F8F]" />
        </span>
        친구 초대하기
      </button>
    </li>
  );
}
