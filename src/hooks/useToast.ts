import { useEffect, useRef, useState } from "react";

// 토스트 메시지 표시 및 자동 숨김
export default function useToast(duration = 2000) {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<number | undefined>(undefined);

  const showToast = (text: string) => {
    window.clearTimeout(timerRef.current);
    setMessage(text);
    timerRef.current = window.setTimeout(() => setMessage(null), duration);
  };

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  return { message, showToast };
}
