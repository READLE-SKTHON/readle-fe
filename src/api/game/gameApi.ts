import api from "@/api/axios";
import type { ApiResponse } from "@/types/api";
import type {
  GameStatusResponse,
  StartGameResponse,
  SubmitAnswerRequest,
  SubmitAnswerResponse,
} from "@/types/game";

// 게임 시작·재시작 (방장 전용)
export const startGame = async (userId: number, gameRoomId: number) => {
  const { data } = await api.post<ApiResponse<StartGameResponse>>(
    `/api/game/${gameRoomId}/start`,
    null,
    { params: { userId } },
  );

  return data.data;
};

// 답안 제출 (문제당 1회, 문제 풀이 단계에서만 가능)
export const submitAnswer = async (
  userId: number,
  gameRoomId: number,
  order: number,
  request: SubmitAnswerRequest,
) => {
  const { data } = await api.post<ApiResponse<SubmitAnswerResponse>>(
    `/api/game/${gameRoomId}/questions/${order}/answers`,
    request,
    { params: { userId } },
  );

  return data.data;
};

// 게임 상태 조회 (현재 단계·문제·결과·순위)
export const getGameStatus = async (userId: number, gameRoomId: number) => {
  const { data } = await api.get<ApiResponse<GameStatusResponse>>(
    `/api/game/${gameRoomId}/status`,
    { params: { userId } },
  );

  return data.data;
};
