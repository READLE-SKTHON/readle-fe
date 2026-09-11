import { useRoomStore } from "@/stores/useRoomStore";
import { formatRoomCode } from "@/utils/formatRoomCode";

// 참여 중인 방 정보 (RoomLayout 하위 페이지 전용)
export default function useRoom() {
  const room = useRoomStore((state) => state.room);

  // 방 정보 없이 진입 시 RoomLayout에서 이전 화면 이동
  if (!room) throw new Error("참여 중인 방 정보가 없습니다.");

  return { room, roomCode: formatRoomCode(room.roomCode) };
}
