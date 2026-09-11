import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";

// 숫자 코드 칸별 입력 처리 (자동 이동, 붙여넣기, 첫 칸 자동 포커스)
export default function useCodeInput(length: number) {
  const [digits, setDigits] = useState<string[]>(() => Array.from({ length }, () => ""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 진입 시 첫 칸 자동 포커스
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  // 칸별 input 요소 등록
  const registerInput = (index: number) => (element: HTMLInputElement | null) => {
    inputRefs.current[index] = element;
  };

  // 전체 칸 채움 (붙여넣기·자동완성)
  const fillDigits = (value: string) => {
    setDigits(Array.from({ length }, (_, index) => value[index] ?? ""));
    focusInput(Math.min(value.length, length - 1));
  };

  // 숫자 입력 후 다음 칸 이동
  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "");

    if (value.length >= length) {
      fillDigits(value.slice(0, length));
      return;
    }

    const digit = value.slice(-1);

    setDigits((prev) => prev.map((prevDigit, i) => (i === index ? digit : prevDigit)));

    if (digit && index < length - 1) focusInput(index + 1);
  };

  // 빈 칸에서 지우기 시 이전 칸 이동
  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Backspace" || digits[index] || index === 0) return;

    event.preventDefault();
    setDigits((prev) => prev.map((prevDigit, i) => (i === index - 1 ? "" : prevDigit)));
    focusInput(index - 1);
  };

  // 코드 붙여넣기 시 전체 칸 입력
  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const value = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);

    if (!value) return;

    event.preventDefault();
    fillDigits(value);
  };

  const code = digits.join("");

  return {
    digits,
    code,
    isComplete: code.length === length,
    registerInput,
    handleChange,
    handleKeyDown,
    handlePaste,
  };
}
