import starIcon from "@/assets/icons/game/starIcon.png";
import correctBeluga from "@/assets/images/game/CorrectBeluga.png";
import incorrectBeluga from "@/assets/images/game/IncorrectBeluga.png";

type MultipleChoiceFeedbackProps = {
  isCorrect: boolean;
};

export default function MultipleChoiceFeedback({ isCorrect }: MultipleChoiceFeedbackProps) {
  return (
    <section
      className={`relative mt-12 h-45 rounded-3xl border px-6 pb-7 pt-20 ${
        isCorrect ? "border-[#78D51B] bg-[#E7F8D5]" : "border-[#F02D2D] bg-[#FFDADA]"
      }`}
    >
      {/* 카드 내부 배경 장식 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        {/* 정답 장식 */}
        {isCorrect && (
          <>
            <img src={starIcon} alt="" className="absolute left-12 top-3 h-9 w-9 object-contain" />

            <img
              src={starIcon}
              alt=""
              className="absolute right-13 top-15 h-9 w-9 object-contain"
            />
          </>
        )}

        {/* 오답 장식 */}
        {!isCorrect && (
          <>
            {/* 왼쪽 아래 큰 원 */}
            <div className="absolute -bottom-10 -left-5 h-35 w-35 rounded-full bg-[#F6BDBD]" />

            {/* 왼쪽 작은 원 */}
            <div className="absolute left-5 top-14  h-13 w-13 rounded-full bg-[#F6BDBD]" />

            {/* 오른쪽 원 */}
            <div className="absolute right-7 top-10 h-13 w-13 rounded-full bg-[#F6BDBD]" />
          </>
        )}
      </div>

      {/* 고래 캐릭터 */}
      <img
        src={isCorrect ? correctBeluga : incorrectBeluga}
        alt=""
        className={`absolute left-[55%] z-10 -translate-x-1/2 -scale-x-100 object-contain ${
          isCorrect ? "-top-19 h-42" : "-top-16 h-41"
        }`}
      />

      {/* 피드백 내용 */}
      <div className="relative z-20 flex flex-col items-center">
        <h2
          className={`-mt-4 text-center text-[36px] font-extrabold leading-tight ${
            isCorrect
              ? "text-[#557536] [text-shadow:_-2px_-2px_0_white,_2px_-2px_0_white,_-2px_2px_0_white,_2px_2px_0_white]"
              : "text-[#E72F2F] [text-shadow:_-2px_-2px_0_white,_2px_-2px_0_white,_-2px_2px_0_white,_2px_2px_0_white]"
          }`}
        >
          {isCorrect ? "고래고래!" : "아쉬워!!!"}
        </h2>

        <p className="mt-1 text-center text-[16px] font-semibold leading-6 text-[#5F5F5F]">
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
      </div>
    </section>
  );
}
