import useRoom from "@/hooks/useRoom";
import useUser from "@/hooks/useUser";
import useRoomParticipantsQuery from "@/queries/room/useRoomParticipantsQuery";
import type { Participant } from "@/types/room";

// 참여자 목록 수신 전 빈 목록 (참조 유지)
const EMPTY_PARTICIPANTS: Participant[] = [];

// 게임 진행·결과 화면 방 정보 및 참여자 (대기방 목록 기준, 폴링 없음)
export default function useGameRoom() {
  const { user } = useUser();
  const { room, roomCode } = useRoom();

  const { data } = useRoomParticipantsQuery(room.roomId, { isPolling: false });

  return {
    room,
    roomCode,
    participants: data?.participants ?? EMPTY_PARTICIPANTS,
    myUserId: user.id,
  };
}
