import { Timer } from "lucide-react";

type TimerCardProps = {
  remainingSeconds: number;
};

// mm:ss 형식 변환
const formatTime = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

export default function TimerCard({ remainingSeconds }: TimerCardProps) {
  return (
    <div className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#E8F1F9]">
      <Timer className="size-6 text-[#0083FF]" />

      <span className="text-[20px] font-bold text-[#0083FF] tabular-nums">
        {formatTime(remainingSeconds)}
      </span>
    </div>
  );
}
