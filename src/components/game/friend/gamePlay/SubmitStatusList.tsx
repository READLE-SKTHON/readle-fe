import PlayerRow from "@/components/game/friend/PlayerRow";
import type { SubmitStatus } from "@/types/game";
import type { Participant } from "@/types/room";

type SubmitStatusListProps = {
  participants: Participant[];
  myUserId: number;
  submitStatuses: Record<number, SubmitStatus>;
};

export default function SubmitStatusList({
  participants,
  myUserId,
  submitStatuses,
}: SubmitStatusListProps) {
  return (
    <ul className="divide-y divide-[#E3E2E2]">
      {participants.map((participant) => (
        <PlayerRow
          key={participant.userId}
          nickname={participant.nickname}
          profileImageUrl={participant.profileImageUrl}
          isMe={participant.userId === myUserId}
          trailing={
            <SubmitStatusText status={submitStatuses[participant.userId] ?? "NOT_SUBMITTED"} />
          }
        />
      ))}
    </ul>
  );
}

type SubmitStatusTextProps = {
  status: SubmitStatus;
};

// 참여자 제출 상태 문구
function SubmitStatusText({ status }: SubmitStatusTextProps) {
  if (status === "SUBMITTED") {
    return <span className="text-[16px] font-semibold text-[#0083FF]">제출 완료</span>;
  }

  if (status === "SELECTING") {
    return (
      <span className="flex items-center gap-1.5 text-[16px] font-medium text-[#8F8F8F]">
        <span className="size-2 rounded-full bg-[#8F8F8F]" />
        답안 선택 중 ...
      </span>
    );
  }

  return <span className="text-[16px] font-medium text-[#8F8F8F]">아직 제출 안 함</span>;
}
