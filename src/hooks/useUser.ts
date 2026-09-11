import { LEVEL_CONFIG, XP_PER_LEVEL } from "@/config/levelConfig";
import { useUserStore } from "@/stores/useUserStore";

// 로그인 사용자 정보·누적 XP 기준 레벨 (페이지 공통)
export default function useUser() {
  const user = useUserStore((state) => state.user);

  // 로그인 후 페이지 전용 (로그인 전 접근은 AppLayout에서 로그인 이동)
  if (!user) throw new Error("로그인 사용자 정보가 없습니다.");

  // 누적 XP 기준 현재 레벨
  const levelInfo = LEVEL_CONFIG.findLast(({ minXp }) => user.totalXp >= minXp) ?? LEVEL_CONFIG[0];

  // 현재 레벨에서 모은 XP (최고 레벨은 게이지 최대)
  const levelXp = Math.min(user.totalXp - levelInfo.minXp, XP_PER_LEVEL);

  return {
    user,
    totalXp: user.totalXp,
    levelInfo,
    levelXp,

    // 레벨 게이지 비율 (%)
    levelProgress: (levelXp / XP_PER_LEVEL) * 100,
  };
}
