import { useMutation } from "@tanstack/react-query";

import { createRoom } from "@/api/room/roomApi";
import useUser from "@/hooks/useUser";
import { useRoomStore } from "@/stores/useRoomStore";
import type { CreateRoomRequest } from "@/types/room";

// 게임방 생성 (성공 시 방 정보 저장)
export default function useCreateRoomMutation() {
  const { user } = useUser();
  const setRoom = useRoomStore((state) => state.setRoom);

  return useMutation({
    mutationFn: (request: CreateRoomRequest) => createRoom(user.id, request),
    onSuccess: (room) => setRoom(room),
  });
}
