import correctBeluga from "@/assets/images/game/CorrectBeluga.png";
import incorrectBeluga from "@/assets/images/game/IncorrectBeluga.png";

type MultipleChoiceFeedbackProps = {
  isCorrect: boolean;
};

export default function MultipleChoiceFeedback({ isCorrect }: MultipleChoiceFeedbackProps) {
  return (
    <section
      className={`relative mt-20 flex min-h-46 flex-col items-center rounded-3xl border px-6 pb-7 pt-16 ${
        isCorrect ? "border-[#78D51B] bg-[#E7F8D5]" : "border-[#FF4D4F] bg-[#FFDADA]"
      }`}
    >
      {/* 캐릭터 */}
      <img
        src={isCorrect ? correctBeluga : incorrectBeluga}
        alt=""
        className="absolute -top-20.5 h-37.5 object-contain"
      />

      {/* 피드백 제목 */}
      <h2
        className={`text-[32px] font-extrabold ${isCorrect ? "text-[#597536]" : "text-[#FF4D4F]"}`}
      >
        {isCorrect ? "고래고래!" : "아쉬워!!!"}
      </h2>

      {/* 피드백 내용 */}
      <p className="mt-3 text-center text-[16px] font-semibold leading-6 text-[#666666]">
        {isCorrect ? (
          <>
            답도 이유도 잘 이해했어요.
            <br />
            기사의 핵심 내용을 정확하게 찾았어요!
          </>
        ) : (
          <>
            해설을 보고 어디서 놓쳤는지
            <br />
            확인해볼까요?
          </>
        )}
      </p>
    </section>
  );
}
