import { useMutation } from "@tanstack/react-query";

import { loginByName } from "@/api/auth/authApi";
import { useGameStore } from "@/stores/useGameStore";
import { useRoomStore } from "@/stores/useRoomStore";
import { useUserStore } from "@/stores/useUserStore";
import type { LoginByNameRequest } from "@/types/auth";

// 닉네임+학교 로그인 (성공 시 사용자 정보 저장, 이전 계정 방·게임 정보 초기화)
export default function useLoginMutation() {
  const login = useUserStore((state) => state.login);
  const clearRoom = useRoomStore((state) => state.clearRoom);
  const resetGame = useGameStore((state) => state.resetGame);

  return useMutation({
    mutationFn: (request: LoginByNameRequest) => loginByName(request),
    onSuccess: ({ userId, nickname, schoolName }) => {
      clearRoom();
      resetGame();
      login({ id: userId, nickname, school: schoolName });
    },
  });
}
