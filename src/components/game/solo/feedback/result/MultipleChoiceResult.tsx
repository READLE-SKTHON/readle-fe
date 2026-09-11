import MultipleChoiceFeedback from "../MultipleChoiceFeedback";

type Choice = {
  id: number;
  text: string;
};

type MultipleChoiceResultProps = {
  choices: Choice[];
  selectedId: number;
  correctId: number;
  explanation?: string;
};

export default function MultipleChoiceResult({
  choices,
  selectedId,
  correctId,
  explanation,
}: MultipleChoiceResultProps) {
  const isCorrect = selectedId === correctId;

  return (
    <div>
      {/* 정답 / 오답 피드백 카드 */}
      <MultipleChoiceFeedback isCorrect={isCorrect} />

      {/* 객관식 결과 */}
      <div className="mt-5 flex flex-col gap-3">
        {choices.map((choice, index) => {
          const isCorrectChoice = choice.id === correctId;
          const isWrongChoice = choice.id === selectedId && selectedId !== correctId;

          const isResultChoice = isCorrectChoice || isWrongChoice;

          return (
            <div
              key={choice.id}
              className={`
                flex w-full items-center rounded-2xl border px-4
                ${isResultChoice ? "min-h-21.5 py-4" : "min-h-16 py-3"}
                ${
                  isCorrectChoice
                    ? "border-[#78D51B] bg-[#E7F8D5]"
                    : isWrongChoice
                      ? "border-[#F02D2D] bg-[#FFDADA]"
                      : "border-transparent bg-[#F7F7F7]"
                }
              `}
            >
              {/* 번호 / 정답 / 오답 아이콘 */}
              <div
                className={`
                  flex h-8 w-8 shrink-0 items-center justify-center
                  rounded-full text-[16px]
                  ${
                    isCorrectChoice
                      ? "bg-[#78D51B] font-bold text-white"
                      : isWrongChoice
                        ? "bg-[#F02D2D] font-bold text-white"
                        : "border border-[#D0CCCC] bg-white text-[#B8B5B5]"
                  }
                `}
              >
                {isCorrectChoice ? "✓" : isWrongChoice ? "×" : index + 1}
              </div>

              {/* 선택지 내용 */}
              <div className="ml-5 flex flex-col justify-center">
                <p
                  className={`text-[16px] ${
                    isResultChoice ? "font-semibold text-black" : "font-medium text-[#666666]"
                  }`}
                >
                  {choice.text}
                </p>

                {/* 정답 / 선택한 오답 해설 */}
                {isResultChoice && explanation && (
                  <p className="mt-1 text-[14px] font-medium leading-5 text-[#929292]">
                    {explanation}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
