import correctWhale from "@/assets/images/game/CorrectWhale.png";
import incorrectWhale from "@/assets/images/game/IncorrectWhale.png";

type MultipleChoiceFeedbackProps = {
  isCorrect: boolean;
};

export default function MultipleChoiceFeedback({ isCorrect }: MultipleChoiceFeedbackProps) {
  return (
    <section
      className={`mt-2 flex flex-col items-center rounded-3xl border px-6 py-6 ${
        isCorrect ? "border-[#78D51B] bg-[#E7F8D5]" : "border-[#FF4D4F] bg-[#FFDADA]"
      }`}
    >
      <img src={isCorrect ? correctWhale : incorrectWhale} alt="" className="h-28 object-contain" />

      <h2 className="mt-2 text-[24px] font-bold">{isCorrect ? "고래고래" : "으악 틀렸어!"}</h2>

      <p className="mt-2 text-center text-[16px] font-semibold leading-7 text-gray-500">
        이 글은 블라블라를 위한
        <br />
        블라블라 나라의 똥을 다루고 있어요
      </p>
    </section>
  );
}
