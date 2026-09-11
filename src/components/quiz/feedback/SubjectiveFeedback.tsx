import starIcon from "@/assets/icons/game/starIcon.png";

import correctBeluga from "@/assets/images/game/CorrectBeluga.png";
import incorrectBeluga from "@/assets/images/game/IncorrectBeluga.png";
import partialBeluga from "@/assets/images/game/PartialBeluga.png";

import type { FeedbackStatus } from "@/types/quiz";

type OxFeedbackProps = {
  status: FeedbackStatus;
};

export default function OxFeedback({ status }: OxFeedbackProps) {
  const feedback = {
    CORRECT: {
      title: "고래고래!",
      description: (
        <>
          답도 이유도 잘 이해했어요.
          <br />
          기사의 핵심 내용을 정확하게 찾았어요!
        </>
      ),
      image: correctBeluga,
      cardStyle: "border-[#78D51B] bg-[#E7F8D5]",
      titleStyle: "text-[#557536]",
    },

    INCORRECT: {
      title: "너무 아쉬워!",
      description: (
        <>
          답도 이유도 잘 이해했어요.
          <br />
          기사의 핵심 내용을 정확하게 찾았어요!
        </>
      ),
      image: incorrectBeluga,
      cardStyle: "border-[#F02D2D] bg-[#FFDADA]",
      titleStyle: "text-[#E72F2F]",
    },

    PARTIAL: {
      title: "근거가 아쉽..",
      description: (
        <>
          그러나 근거가 너무 부족합니다
          <br />
          이유를 구체적으로 볼까요?
        </>
      ),
      image: partialBeluga,
      cardStyle: "border-[#FFBA18] bg-[#FFF1C9]",
      titleStyle: "text-[#FFB414]",
    },
  };

  const current = feedback[status];

  return (
    <section className={`relative mt-5 min-h-30 rounded-3xl border px-5 py-5 ${current.cardStyle}`}>
      {/* 배경 장식 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        {/* 정답 별 */}
        {status === "CORRECT" && (
          <>
            <img
              src={starIcon}
              alt=""
              className="absolute left-[51%] top-10 h-8 w-8 object-contain"
            />

            <img
              src={starIcon}
              alt=""
              className="absolute bottom-3 right-5 h-4 w-4 object-contain"
            />
          </>
        )}

        {/* 오답 배경 원 */}
        {status === "INCORRECT" && (
          <div className="absolute bottom-5 right-1 h-32 w-32 rounded-full bg-[#F6BDBD]" />
        )}
        {status === "INCORRECT" && (
          <div className="absolute bottom-5 left-3 h-13 w-13 rounded-full bg-[#F6BDBD]" />
        )}

        {/* 부분 정답 배경 원 */}
        {status === "PARTIAL" && (
          <div className="absolute bottom-5 right-1 h-32 w-32 rounded-full bg-[#FFE29A]" />
        )}
        {/* 부분 정답 배경 원 */}
        {status === "PARTIAL" && (
          <div className="absolute bottom-5 left-3 h-13 w-13 rounded-full bg-[#FFE29A]" />
        )}
      </div>

      {/* 텍스트 */}
      <div className="relative z-20">
        {/* 제목만 캐릭터 공간 확보 */}
        <h2
          className={`pr-20 text-[36px] font-extrabold leading-tight ${current.titleStyle} text-shadow-[-2px_-2px_0_white,2px_-2px_0_white,-2px_2px_0_white,2px_2px_0_white]`}
        >
          {current.title}
        </h2>

        {/* 설명은 전체 너비 사용 */}
        <p className="mt-2 text-[16px] font-semibold leading-5 text-[#5F5F5F]">
          {current.description}
        </p>
      </div>

      {/* 고래 캐릭터 */}
      <img
        src={current.image}
        alt=""
        className={`absolute right-2 z-10 object-contain ${
          status === "CORRECT"
            ? "-top-10 h-33"
            : status === "INCORRECT"
              ? "-top-10 h-33"
              : "-top-10 h-33"
        }`}
      />
    </section>
  );
}
