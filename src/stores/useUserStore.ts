import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "@/types/user";

type UserState = {
  // 로그인 사용자 (로그인 전 null)
  user: User | null;

  // 계정별 누적 XP (다시 로그인해도 유지)
  xpByUserId: Record<number, number>;

  login: (user: User) => void;
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
          // 이전에 쌓은 XP 유지
          user: { ...user, totalXp: state.xpByUserId[user.id] ?? user.totalXp },
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

    // 브라우저 저장소 키
    { name: "readle-user" },
  ),
);
