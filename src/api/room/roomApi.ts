import api from "@/api/axios";
import type { ApiResponse } from "@/types/api";
import type { CreateRoomRequest, RoomParticipantsResponse, RoomResponse } from "@/types/room";

// 게임방 생성
export const createRoom = async (userId: number, request: CreateRoomRequest) => {
  const { data } = await api.post<ApiResponse<RoomResponse>>("/api/rooms", request, {
    params: { userId },
  });

  return data.data;
};

// 방 코드 입장
export const joinRoom = async (userId: number, roomCode: string) => {
  const { data } = await api.post<ApiResponse<RoomResponse>>(`/api/rooms/join/${roomCode}`, null, {
    params: { userId },
  });

  return data.data;
};

// 대기방 참여자 목록 조회
export const getRoomParticipants = async (userId: number, roomId: number) => {
  const { data } = await api.get<ApiResponse<RoomParticipantsResponse>>(
    `/api/rooms/${roomId}/participants`,
    { params: { userId } },
  );

  return data.data;
};
