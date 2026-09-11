import PlayerRow from "@/components/game/friend/PlayerRow";
import type { AnswerStatus } from "@/types/game";

type SubmitStatusListProps = {
  statuses: AnswerStatus[];
  myUserId: number;
};

// 참여자별 답안 제출 현황
export default function SubmitStatusList({ statuses, myUserId }: SubmitStatusListProps) {
  return (
    <ul className="divide-y divide-[#E3E2E2]">
      {statuses.map((status) => (
        <PlayerRow
          key={status.userId}
          nickname={status.nickname}
          isMe={status.userId === myUserId}
          trailing={
            status.answered ? (
              <span className="text-[16px] font-semibold text-[#0083FF]">제출 완료</span>
            ) : (
              <span className="text-[16px] font-medium text-[#8F8F8F]">아직 제출 안 함</span>
            )
          }
        />
      ))}
    </ul>
  );
}
