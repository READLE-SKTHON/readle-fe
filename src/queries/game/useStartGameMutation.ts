import { useMutation, useQueryClient } from "@tanstack/react-query";

import { startGame } from "@/api/game/gameApi";
import useUser from "@/hooks/useUser";
import { gameKeys } from "@/queries/game/gameKeys";
import { useGameStore } from "@/stores/useGameStore";

// 게임 시작·재시작 (성공 시 이전 게임 진행 상태·조회 결과 초기화)
export default function useStartGameMutation(gameRoomId: number) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const resetGame = useGameStore((state) => state.resetGame);

  return useMutation({
    mutationFn: () => startGame(user.id, gameRoomId),
    onSuccess: () => {
      resetGame();

      // 이전 판 종료 상태로 결과 화면 이동 방지
      queryClient.resetQueries({ queryKey: gameKeys.status(gameRoomId, user.id) });
    },
  });
}
