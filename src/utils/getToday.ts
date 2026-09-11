// 오늘 날짜 (기기 시간 기준 YYYY-MM-DD, 복습 완료·XP 획득 날짜 비교용)
export const getToday = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");

  return `${now.getFullYear()}-${month}-${date}`;
};
