import { useQuery } from "@tanstack/react-query";

import { getRoomParticipants } from "@/api/room/roomApi";
import useUser from "@/hooks/useUser";
import { roomKeys } from "@/queries/room/roomKeys";

// 참여자 목록 갱신 주기 (ms)
const POLLING_INTERVAL_MS = 2000;

type RoomParticipantsQueryOptions = {
  // 주기적 갱신 여부 (대기방 전용, 화면 이탈 시 자동 중단)
  isPolling?: boolean;
};

// 대기방 참여자 목록 조회
export default function useRoomParticipantsQuery(
  roomId: number,
  { isPolling = true }: RoomParticipantsQueryOptions = {},
) {
  const { user } = useUser();

  return useQuery({
    queryKey: roomKeys.participants(roomId, user.id),
    queryFn: () => getRoomParticipants(user.id, roomId),

    // 요청 실패 시 폴링 중단 (다시 시도로 재요청)
    refetchInterval: (query) =>
      isPolling && query.state.status !== "error" ? POLLING_INTERVAL_MS : false,

    // 폴링하지 않는 화면은 받아온 목록 유지
    staleTime: isPolling ? 0 : Infinity,
  });
}
