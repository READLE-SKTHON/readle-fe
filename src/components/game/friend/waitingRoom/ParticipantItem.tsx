import ProfileImage from "@/components/common/profile/ProfileImage";

import crownIcon from "@/assets/icons/game/crown.svg";

type ParticipantItemProps = {
  nickname: string;
  profileImageUrl: string | null;
  isMe: boolean;
  isHost: boolean;
};

export default function ParticipantItem({
  nickname,
  profileImageUrl,
  isMe,
  isHost,
}: ParticipantItemProps) {
  return (
    <li
      className={`flex h-17.5 items-center gap-5 rounded-2xl px-6 ${
        isMe ? "bg-[#E8F1F9]" : "bg-[#F4F4F4]"
      }`}
    >
      <div className="relative shrink-0">
        {isHost && (
          <img
            src={crownIcon}
            alt="방장"
            className="absolute -top-7 left-1/2 w-9 -translate-x-1/2"
          />
        )}

        <ProfileImage src={profileImageUrl} alt={`${nickname} 프로필`} className="size-10" />
      </div>

      <span className="text-[18px] font-semibold text-black">
        {nickname}
        {isHost && " (방장)"}
      </span>

      {isMe && <span className="ml-auto text-[18px] font-semibold text-[#0083FF]">나</span>}
    </li>
  );
}
