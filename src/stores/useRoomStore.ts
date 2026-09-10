import { create } from "zustand";

import { defaultRoomSettings } from "@/mocks/room";
import type { CreateRoomResponse, RoomSettings } from "@/types/room";

type RoomState = {
  settings: RoomSettings;
  createdRoom: CreateRoomResponse | null;
  setSettings: (settings: RoomSettings) => void;
  setCreatedRoom: (room: CreateRoomResponse) => void;
};

// 방 설정값 및 생성된 방 정보 (방 만들기 → 초대 → 대기방 공유)
export const useRoomStore = create<RoomState>()((set) => ({
  settings: defaultRoomSettings,
  createdRoom: null,
  setSettings: (settings) => set({ settings }),
  setCreatedRoom: (createdRoom) => set({ createdRoom }),
}));
