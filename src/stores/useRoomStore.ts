import { create } from "zustand";

import { defaultRoomSettings } from "@/mocks/room";
import type { CreateRoomResponse, RoomSettings, WaitingRoom } from "@/types/room";

type RoomState = {
  settings: RoomSettings;
  createdRoom: CreateRoomResponse | null;

  // 대기방 정보 (추후 WebSocket 참여자 갱신 반영)
  waitingRoom: WaitingRoom | null;

  // 대기방 내 사용자 id
  myUserId: number | null;

  setSettings: (settings: RoomSettings) => void;
  setCreatedRoom: (room: CreateRoomResponse) => void;
  setWaitingRoom: (room: WaitingRoom, myUserId: number) => void;
};

// 방 설정값 및 생성된 방 정보 (방 만들기 → 초대 → 대기방 공유)
export const useRoomStore = create<RoomState>()((set) => ({
  settings: defaultRoomSettings,
  createdRoom: null,
  waitingRoom: null,
  myUserId: null,
  setSettings: (settings) => set({ settings }),
  setCreatedRoom: (createdRoom) => set({ createdRoom }),
  setWaitingRoom: (waitingRoom, myUserId) => set({ waitingRoom, myUserId }),
}));
