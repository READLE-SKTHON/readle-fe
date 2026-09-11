import { useMutation } from "@tanstack/react-query";

import { joinRoom } from "@/api/room/roomApi";
import useUser from "@/hooks/useUser";
import { useRoomStore } from "@/stores/useRoomStore";

// 방 코드 입장 (성공 시 방 정보 저장)
export default function useJoinRoomMutation() {
  const { user } = useUser();
  const setRoom = useRoomStore((state) => state.setRoom);

  return useMutation({
    mutationFn: (roomCode: string) => joinRoom(user.id, roomCode),
    onSuccess: (room) => setRoom(room),
  });
}
