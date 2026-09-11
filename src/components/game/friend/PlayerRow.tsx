import type { CSSProperties, ReactNode } from "react";

import ProfileImage from "@/components/common/profile/ProfileImage";

type PlayerRowProps = {
  nickname: string;
  isMe: boolean;
  isHighlighted?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function PlayerRow({
  nickname,
  isMe,
  isHighlighted = false,
  leading,
  trailing,
  className = "",
  style,
}: PlayerRowProps) {
  return (
    // 행 사이 여백 (강조 배경끼리 붙지 않도록)
    <li style={style} className={`py-1 ${className}`}>
      <div
        className={`flex h-16 items-center gap-4 rounded-xl px-3 ${
          isHighlighted ? "bg-[#F3F4FA]" : ""
        }`}
      >
        {leading}

        {/* 프로필 이미지 미제공 (기본 프로필) */}
        <ProfileImage alt={`${nickname} 프로필`} className="size-10 shrink-0" />

        {/* 내 행은 이름 대신 나 표시 */}
        <span
          className={`min-w-0 flex-1 truncate text-[18px] ${
            isMe ? "font-bold text-[#0083FF]" : "font-semibold text-black"
          }`}
        >
          {isMe ? "나" : nickname}
        </span>

        {trailing}
      </div>
    </li>
  );
}
