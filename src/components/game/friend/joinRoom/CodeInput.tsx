import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from "react";

type CodeInputProps = {
  digits: string[];
  registerInput: (index: number) => (element: HTMLInputElement | null) => void;
  onChange: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (index: number, event: KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (event: ClipboardEvent<HTMLInputElement>) => void;
};

export default function CodeInput({
  digits,
  registerInput,
  onChange,
  onKeyDown,
  onPaste,
}: CodeInputProps) {
  return (
    <div className="flex justify-center gap-3.5">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={registerInput(index)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          value={digit}
          onChange={(event) => onChange(index, event)}
          onKeyDown={(event) => onKeyDown(index, event)}
          onPaste={onPaste}
          aria-label={`방 코드 ${index + 1}번째 자리`}
          className="h-17 w-15 rounded-xl border-[1.5px] border-[#E3E2E2] bg-[#F4F4F4] text-center text-[28px] font-bold text-black outline-none focus:border-[#2285E3]"
        />
      ))}
    </div>
  );
}
