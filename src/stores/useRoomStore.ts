import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { DEFAULT_ROOM_SETTINGS } from "@/config/roomConfig";
import type { RoomResponse, RoomSettings } from "@/types/room";

type RoomState = {
  // 마지막 방 만들기 설정값 (다음 방 만들기 기본값)
  settings: RoomSettings;

  // 참여 중인 방 (방 생성·입장 응답)
  room: RoomResponse | null;

  setSettings: (settings: RoomSettings) => void;
  setRoom: (room: RoomResponse) => void;
  clearRoom: () => void;
};

// 방 설정값 및 참여 중인 방 정보 (방 만들기 → 초대 → 대기방 → 게임 공유, 새로고침 유지)
export const useRoomStore = create<RoomState>()(
  persist(
    (set) => ({
      settings: DEFAULT_ROOM_SETTINGS,
      room: null,

      setSettings: (settings) => set({ settings }),
      setRoom: (room) => set({ room }),
      clearRoom: () => set({ room: null }),
    }),

    // 탭 단위 저장소 (탭 닫으면 초기화)
    { name: "readle-room", storage: createJSONStorage(() => sessionStorage) },
  ),
);
