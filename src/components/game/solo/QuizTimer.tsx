import { useEffect, useRef, useState } from "react";

import blueClockIcon from "@/assets/icons/game/blueClock.png";
import redClockIcon from "@/assets/icons/game/redClock.png";

type QuizTimerProps = {
  duration: number;
  onTimeUp?: () => void;
};

export default function QuizTimer({ duration, onTimeUp }: QuizTimerProps) {
  const [remainingTime, setRemainingTime] = useState(duration);

  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          onTimeUpRef.current?.();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const isUrgent = remainingTime <= 5;

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const formattedTime = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <>
      <style>
        {`
          @keyframes timer-shake {
            0%, 100% {
              transform: translateX(0);
            }
            20% {
              transform: translateX(-3px);
            }
            40% {
              transform: translateX(3px);
            }
            60% {
              transform: translateX(-2px);
            }
            80% {
              transform: translateX(2px);
            }
          }

          .timer-shake {
            animation: timer-shake 0.4s ease-in-out infinite;
          }
        `}
      </style>

      <section
        className={`
          mb-5 flex h-13 w-full
          items-center justify-center
          rounded-xl
          transition-colors duration-300
          ${isUrgent ? "timer-shake bg-[#FFDADA] text-[#FF0000]" : "bg-[#E8F3FC] text-[#168CF2]"}
        `}
      >
        <div className="flex items-center gap-1.5">
          <img
            src={isUrgent ? redClockIcon : blueClockIcon}
            alt=""
            aria-hidden="true"
            className="size-5 object-contain"
          />

          <span className="text-[16px] font-bold">{formattedTime}</span>
        </div>
      </section>
    </>
  );
}
