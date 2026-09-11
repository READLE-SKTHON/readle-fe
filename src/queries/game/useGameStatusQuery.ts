import { useQuery } from "@tanstack/react-query";

import { getGameStatus } from "@/api/game/gameApi";
import useUser from "@/hooks/useUser";
import { gameKeys } from "@/queries/game/gameKeys";

// 게임 상태 갱신 주기 (ms, 서버 1초 폴링 전제)
const POLLING_INTERVAL_MS = 1000;

type GameStatusQueryOptions = {
  enabled?: boolean;

  // 게임 종료 후 폴링 유지 여부 (대기방 새 라운드 감지용)
  keepPollingAfterFinish?: boolean;
};

// 게임 상태 조회 (폴링, 일시적 오류 시 이전 상태 유지, 화면 이탈 시 자동 중단)
export default function useGameStatusQuery(
  gameRoomId: number,
  { enabled = true, keepPollingAfterFinish = false }: GameStatusQueryOptions = {},
) {
  const { user } = useUser();

  return useQuery({
    queryKey: gameKeys.status(gameRoomId, user.id),
    queryFn: () => getGameStatus(user.id, gameRoomId),
    enabled,

    // 게임 종료 시 폴링 중단
    refetchInterval: (query) =>
      !keepPollingAfterFinish && query.state.data?.phase === "FINISHED"
        ? false
        : POLLING_INTERVAL_MS,
  });
}
