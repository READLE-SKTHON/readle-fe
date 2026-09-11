// XP 표시 형식 (소수점 반올림 · 천 단위 콤마, 예: 2,540XP)
export const formatXp = (xp: number) => `${Math.round(xp).toLocaleString("ko-KR")}XP`;
