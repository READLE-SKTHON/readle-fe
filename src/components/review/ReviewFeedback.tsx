import correctBeluga from "@/assets/images/game/CorrectBeluga.png";
import incorrectBeluga from "@/assets/images/game/IncorrectBeluga.png";

type ReviewFeedbackProps = {
  isCorrect: boolean;
  explanation: string;
};

// 제출 후 정답·오답 피드백 카드 (혼자 문제풀기와 같은 구성, 해설 표시)
export default function ReviewFeedback({ isCorrect, explanation }: ReviewFeedbackProps) {
  return (
    <section
      className={`flex flex-col items-center rounded-3xl border px-6 py-6 ${
        isCorrect ? "border-[#78D51B] bg-[#E7F8D5]" : "border-[#FF4D4F] bg-[#FFDADA]"
      }`}
    >
      <img
        src={isCorrect ? correctBeluga : incorrectBeluga}
        alt=""
        className="h-28 object-contain"
      />

      <h2 className="mt-2 text-[24px] font-bold text-black">
        {isCorrect ? "고래고래" : "으악 틀렸어!"}
      </h2>

      <p className="mt-2 text-center text-[16px] leading-7 font-semibold break-keep text-[#5E5E5E]">
        {explanation}
      </p>
    </section>
  );
}
