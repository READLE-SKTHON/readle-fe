import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useGameStatusQuery from "@/queries/game/useGameStatusQuery";

// 대기방 게임 시작 감지 (시작 이력 있을 때 상태 조회, 진행 중인 판 있으면 게임 화면 이동)
export default function useGameStartWatcher(gameRoomId: number, startedAt: string | null) {
  const navigate = useNavigate();

  // 한 판 더하기 대기 중 새 판 감지 (종료 상태에서도 폴링 유지)
  const { data: status } = useGameStatusQuery(gameRoomId, {
    enabled: startedAt !== null,
    keepPollingAfterFinish: true,
  });

  useEffect(() => {
    if (status && status.phase !== "FINISHED") navigate("/game/friend/play", { replace: true });
  }, [status, navigate]);
}
