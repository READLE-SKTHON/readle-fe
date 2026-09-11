import CharacterShadow from "@/components/game/friend/CharacterShadow";
import PlayerRow from "@/components/game/friend/PlayerRow";
import type { GameQuestion, MyResult, PlayerResult } from "@/types/game";

import answerCharacter from "@/assets/images/game/MultiGame/AnswerCharacter.png";

type AnswerRevealProps = {
  // 정답 공개 문제 (새로고침 등으로 없으면 정답 텍스트 표시)
  question: GameQuestion | null;

  myResult: MyResult;
  results: PlayerResult[];
  myUserId: number;
};

// 정답 문구 (객관식 보기 번호 표시, 번호·보기 텍스트 응답 모두 처리)
const getAnswerLabel = (question: GameQuestion | null, correctAnswer: string) => {
  if (question?.format !== "multiple_choice") return correctAnswer;

  const choiceIndex = /^\d+$/.test(correctAnswer)
    ? Number(correctAnswer) - 1
    : question.choices.indexOf(correctAnswer);

  return question.choices[choiceIndex] ? `${choiceIndex + 1}번` : correctAnswer;
};

export default function AnswerReveal({ question, myResult, results, myUserId }: AnswerRevealProps) {
  // 이번 문제 점수 높은 순 정렬 (동점은 서버 순서대로)
  const sortedResults = [...results].sort((a, b) => b.score - a.score);

  // 이번 문제 최고 점수 (0점이면 강조 없음)
  const topScore = Math.max(0, ...results.map((result) => result.score));

  return (
    <section className="flex flex-col items-center">
      <img
        src={answerCharacter}
        alt="과연 정답은? 팻말을 든 벨루가"
        className="relative z-10 h-48 w-57 object-contain"
      />

      {/* 캐릭터와 띄운 그림자 */}
      <CharacterShadow className="mt-3 w-36" />

      <h2 className="mt-5 text-center text-[24px] leading-snug font-extrabold break-keep text-black">
        정답은{" "}
        <span className="text-[#78D51B]">{getAnswerLabel(question, myResult.correctAnswer)}</span>{" "}
        입니다
      </h2>

      {myResult.explanation && (
        <p className="mt-3 text-center text-[16px] leading-6 font-medium text-[#5E5E5E]">
          {myResult.explanation}
        </p>
      )}

      {/* 참여자별 이번 문제 점수 (최고점은 동점 모두 강조) */}
      <ul className="mt-5 w-full divide-y divide-[#E3E2E2]">
        {sortedResults.map((result) => {
          const isTop = topScore > 0 && result.score === topScore;

          return (
            <PlayerRow
              key={result.userId}
              nickname={result.nickname}
              isMe={result.userId === myUserId}
              isHighlighted={isTop}
              trailing={
                <span
                  className={`text-[18px] font-bold ${
                    isTop ? "text-[#FF4D4F]" : result.score > 0 ? "text-black" : "text-[#8F8F8F]"
                  }`}
                >
                  +{result.score}
                </span>
              }
            />
          );
        })}
      </ul>
    </section>
  );
}
