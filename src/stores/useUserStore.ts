import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "@/types/user";

// 로그인 응답 사용자 정보 (누적 XP 제외)
type LoginUser = Omit<User, "totalXp">;

type UserState = {
  // 로그인 사용자 (로그인 전 null)
  user: User | null;

  // 계정별 누적 XP (다시 로그인해도 유지)
  xpByUserId: Record<number, number>;

  login: (user: LoginUser) => void;
  addXp: (amount: number) => void;
};

// 로그인 사용자 정보·누적 XP (전체 페이지 공유, 새로고침 유지)
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      xpByUserId: {},

      login: (user) =>
        set((state) => ({
          // 이전에 쌓은 XP 유지 (처음 로그인 시 0)
          user: { ...user, totalXp: state.xpByUserId[user.id] ?? 0 },
        })),

      addXp: (amount) =>
        set((state) => {
          if (!state.user) return {};

          const totalXp = state.user.totalXp + amount;

          return {
            user: { ...state.user, totalXp },
            xpByUserId: { ...state.xpByUserId, [state.user.id]: totalXp },
          };
        }),
    }),

    {
      // 브라우저 저장소 키
      name: "readle-user",

      // 저장 형식 버전 (1: 로그인 API 연동)
      version: 1,

      // 이전 목 계정 로그인 정보 제거 (누적 XP 유지, 다시 로그인 필요)
      migrate: (persistedState) => ({ ...(persistedState as UserState), user: null }),
    },
  ),
);
