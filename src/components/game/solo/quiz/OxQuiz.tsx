import type { OxQuiz as OxQuizType } from "@/types/quiz";

type OxQuizProps = {
  quiz: OxQuizType;
  selectedAnswer: "O" | "X" | null;
  reason: string;
  isSubmitted: boolean;
  onSelect: (answer: "O" | "X") => void;
  onChangeReason: (reason: string) => void;
  onOpenNews: () => void;
};

export default function OxQuiz({
  quiz,
  selectedAnswer,
  reason,
  isSubmitted,
  onSelect,
  onChangeReason,
  onOpenNews,
}: OxQuizProps) {
  return (
    <section>
      {/* 제출 전 문제 화면 */}
      {!isSubmitted && (
        <>
          {/* 문제 유형 / 지문 전체보기 */}
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-[#D5EAFB] px-4 py-1 text-[14px] font-bold text-[#168CF2]">
              O/X문제
            </span>

            <button
              type="button"
              onClick={onOpenNews}
              className="cursor-pointer rounded-full bg-[#2285E3] text-white px-4 py-1 text-[14px] font-bold"
            >
              지문 전체보기
            </button>
          </div>

          {/* 질문 */}
          <h2 className="mt-6 text-[18px] font-bold leading-8">{quiz.question}</h2>

          {/* 판단할 문장 */}
          <div className="mt-5 rounded-3xl bg-[#F5F6FC] px-6 py-6">
            <p className="text-[18px] leading-8 text-gray-700">{quiz.statement}</p>
          </div>

          {/* O / X 선택 */}
          <div className="mt-5 grid grid-cols-2 gap-4">
            {(["O", "X"] as const).map((answer) => {
              const isSelected = selectedAnswer === answer;

              return (
                <button
                  key={answer}
                  type="button"
                  onClick={() => onSelect(answer)}
                  className={`h-16 cursor-pointer rounded-2xl border text-[24px] font-bold ${
                    isSelected
                      ? "border-[#2285E3] bg-[#2285E3] text-white"
                      : "border-gray-200 bg-[#F7F7F7] text-black"
                  }`}
                >
                  {answer}
                </button>
              );
            })}
          </div>

          {/* 근거 입력 */}
          {quiz.requiresReason && (
            <div className="mt-8">
              <h3 className="text-[18px] font-bold">왜 그렇게 생각했나요?</h3>

              <p className="mt-1 text-[15px] text-gray-500">
                기사 내용을 바탕으로 이유를 작성해주세요
              </p>

              <textarea
                value={reason}
                onChange={(e) => onChangeReason(e.target.value)}
                maxLength={500}
                placeholder="답안을 작성하세요"
                className="mt-4 h-40 w-full resize-none rounded-3xl border border-gray-200 p-5 text-[16px] outline-none"
              />

              <p className="mt-2 text-right text-[15px] font-medium text-gray-400">
                {reason.length}/500
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
