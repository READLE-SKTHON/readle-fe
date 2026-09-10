import { useRef, useState } from "react";
import { ChevronDown, ChevronRight, type LucideIcon } from "lucide-react";

import OptionDropdown from "@/components/game/friend/createRoom/OptionDropdown";
import type { RoomOption } from "@/types/room";

// 옵션 항목 높이 및 행과의 간격 (OptionDropdown h-10, mt-2 기준)
const OPTION_HEIGHT = 40;
const DROPDOWN_GAP = 8;

type RoomOptionRowProps<T extends string | number> = {
  icon: LucideIcon;
  label: string;
  options: RoomOption<T>[];
  value: T;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: T) => void;
};

export default function RoomOptionRow<T extends string | number>({
  icon: Icon,
  label,
  options,
  value,
  isOpen,
  onToggle,
  onSelect,
}: RoomOptionRowProps<T>) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<"down" | "up">("down");

  const selectedLabel = options.find((option) => option.value === value)?.label;

  // 하단 공간 부족 시 위쪽 펼침 처리
  const handleToggle = () => {
    if (!isOpen && rowRef.current) {
      const { top, bottom } = rowRef.current.getBoundingClientRect();
      const dropdownHeight = options.length * OPTION_HEIGHT + DROPDOWN_GAP;
      const hasSpaceBelow = window.innerHeight - bottom >= dropdownHeight;

      setPlacement(!hasSpaceBelow && top > dropdownHeight ? "up" : "down");
    }

    onToggle();
  };

  return (
    <div ref={rowRef} className="relative">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        className="flex h-15 w-full cursor-pointer items-center gap-3 px-5"
      >
        <Icon className="size-6 shrink-0 text-[#2285E3]" />

        <span className="text-[16px] font-semibold text-black">{label}</span>

        <span className="ml-auto text-[16px] font-semibold text-[#2285E3]">{selectedLabel}</span>

        {isOpen ? (
          <ChevronDown className="size-5 shrink-0 text-[#0083FF]" />
        ) : (
          <ChevronRight className="size-5 shrink-0 text-[#0083FF]" />
        )}
      </button>

      {isOpen && (
        <OptionDropdown
          options={options}
          selectedValue={value}
          placement={placement}
          onSelect={onSelect}
        />
      )}
    </div>
  );
}
