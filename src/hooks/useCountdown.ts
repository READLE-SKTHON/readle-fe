import { useEffect, useState } from "react";

// 초 단위 카운트다운 (resetKey 변경 시 재시작, isRunning false면 정지)
export default function useCountdown(seconds: number, isRunning: boolean, resetKey: unknown) {
  const [remaining, setRemaining] = useState(seconds);
  const [prevResetKey, setPrevResetKey] = useState(resetKey);

  // 문제 변경 시 제한 시간 초기화
  if (prevResetKey !== resetKey) {
    setPrevResetKey(resetKey);
    setRemaining(seconds);
  }

  useEffect(() => {
    if (!isRunning || remaining <= 0) return;

    const timer = window.setTimeout(() => setRemaining((prev) => prev - 1), 1000);

    return () => window.clearTimeout(timer);
  }, [isRunning, remaining]);

  return remaining;
}
