import { Check } from "lucide-react";

import type { RoomOption } from "@/types/room";

type OptionDropdownProps<T extends string | number> = {
  options: RoomOption<T>[];
  selectedValue: T;
  placement: "down" | "up";
  onSelect: (value: T) => void;
};

export default function OptionDropdown<T extends string | number>({
  options,
  selectedValue,
  placement,
  onSelect,
}: OptionDropdownProps<T>) {
  return (
    <ul
      className={`absolute right-5 z-20 w-40 divide-y divide-[#D4E0E9] overflow-hidden rounded-xl bg-white shadow-lg shadow-black/25 ${
        placement === "up" ? "bottom-full mb-2" : "top-full mt-2"
      }`}
    >
      {options.map((option) => {
        const isSelected = option.value === selectedValue;

        return (
          <li key={option.value}>
            <button
              type="button"
              onClick={() => onSelect(option.value)}
              className={`relative flex h-10 w-full cursor-pointer items-center justify-center text-[15px] font-semibold text-black ${
                isSelected ? "bg-[#E8F1F9]" : ""
              }`}
            >
              {option.label}

              {isSelected && (
                <Check strokeWidth={3} className="absolute right-3 size-4 text-[#2285E3]" />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
