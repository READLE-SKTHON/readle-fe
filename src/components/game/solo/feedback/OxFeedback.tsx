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
      style: "border-[#78D51B] bg-[#E7F8D5]",
    },

    INCORRECT: {
      title: "으악 틀렸어!",
      description: (
        <>
          답도 이유도 잘 이해했어요.
          <br />
          기사의 핵심 내용을 정확하게 찾았어요!
        </>
      ),
      image: incorrectBeluga,
      style: "border-[#FF4D4F] bg-[#FFDADA]",
    },

    PARTIAL: {
      title: "선택은 맞았어요!",
      description: (
        <>
          그러나 근거가 너무 부족합니다
          <br />
          이유를 구체적으로 볼까요?
        </>
      ),
      image: partialBeluga,
      style: "border-[#FFBA18] bg-[#FFF1C9]",
    },
  };

  const current = feedback[status];

  return (
    <section
      className={`relative mt-2 overflow-hidden rounded-3xl border px-6 py-6 ${current.style}`}
    >
      <div className="pr-24">
        <h2 className="text-[22px] font-bold">{current.title}</h2>

        <p className="mt-1 text-[15px] font-semibold leading-6 text-gray-500">
          {current.description}
        </p>
      </div>

      <img src={current.image} alt="" className="absolute bottom-0 right-0 h-28 object-contain" />
    </section>
  );
}
