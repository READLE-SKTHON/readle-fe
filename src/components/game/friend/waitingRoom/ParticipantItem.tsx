import ProfileImage from "@/components/common/profile/ProfileImage";

import crownIcon from "@/assets/icons/game/crown.svg";

type ParticipantItemProps = {
  nickname: string;
  isMe: boolean;
  isHost: boolean;
};

export default function ParticipantItem({ nickname, isMe, isHost }: ParticipantItemProps) {
  return (
    <li className="flex h-17.5 items-center gap-5 rounded-2xl bg-[#F4F4F4] px-6">
      <div className="relative shrink-0">
        {isHost && (
          <img
            src={crownIcon}
            alt="방장"
            className="absolute -top-7 left-1/2 w-9 -translate-x-1/2"
          />
        )}

        {/* 프로필 이미지 미제공 (기본 프로필) */}
        <ProfileImage alt={`${nickname} 프로필`} className="size-10" />
      </div>

      {/* 내 행은 이름 대신 나 표시 */}
      <span className="text-[18px] font-semibold text-black">
        {isMe ? <span className="font-bold text-[#0083FF]">나</span> : nickname}
        {isHost && " (방장)"}
      </span>
    </li>
  );
}
