import useRoom from "@/hooks/useRoom";
import useUser from "@/hooks/useUser";
import useRoomParticipantsQuery from "@/queries/room/useRoomParticipantsQuery";

// 대기방 정보 및 서버 참여자 목록 제공 (폴링 갱신)
export default function useWaitingRoom() {
  const { user } = useUser();
  const { room, roomCode } = useRoom();

  const { data, isPending, isError, error, refetch } = useRoomParticipantsQuery(room.roomId);

  const participants = data?.participants ?? [];
  const memberCount = data?.memberCount ?? room.memberCount;

  // 서버 참여자 목록 기준 방장 여부
  const isHost = participants.some(
    (participant) => participant.userId === user.id && participant.isHost,
  );

  const emptySlotCount = Math.max(memberCount - participants.length, 0);

  return {
    inviteLink: room.inviteLink,
    roomCode,
    participants,
    memberCount,
    myUserId: user.id,
    isHost,
    emptySlotCount,
    isPending,
    isError,
    error,
    refetch,
  };
}
