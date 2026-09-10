import { mockGuestUserId, mockGuestWaitingRoom } from "@/mocks/room";
import { useRoomStore } from "@/stores/useRoomStore";

// 대기방 정보 및 참여자 목록 제공 (추후 API·WebSocket 연동 지점)
export default function useWaitingRoom() {
  const waitingRoom = useRoomStore((state) => state.waitingRoom);
  const storedMyUserId = useRoomStore((state) => state.myUserId);

  // TODO: 대기방 조회 API 및 WebSocket 참여자 갱신 연동
  // 대기방 정보가 없을 때 임시 기본값 (참여자 입장)
  const room = waitingRoom ?? mockGuestWaitingRoom;
  const myUserId = storedMyUserId ?? mockGuestUserId;

  const isHost = room.hostId === myUserId;
  const emptySlotCount = Math.max(room.maxPlayers - room.participants.length, 0);

  return { room, myUserId, isHost, emptySlotCount };
}
