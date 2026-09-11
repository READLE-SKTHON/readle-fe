import CharacterShadow from "@/components/game/friend/CharacterShadow";
import PlayerRow from "@/components/game/friend/PlayerRow";
import type { GameQuestion, RoundScore } from "@/types/game";
import type { Participant } from "@/types/room";

import answerCharacter from "@/assets/images/game/MultiGame/AnswerCharacter.png";

type AnswerRevealProps = {
  question: GameQuestion;
  participants: Participant[];
  myUserId: number;
  roundScores: RoundScore[];
};

// 문제 유형별 정답 문구
const getAnswerLabel = (question: GameQuestion) =>
  question.type === "MULTIPLE_CHOICE" ? `${question.correctAnswer}번` : question.correctAnswer;

export default function AnswerReveal({
  question,
  participants,
  myUserId,
  roundScores,
}: AnswerRevealProps) {
  const getPoints = (userId: number) =>
    roundScores.find((score) => score.userId === userId)?.points ?? 0;

  // 이번 문제 점수 높은 순 정렬 (동점은 참여자 순서대로)
  const sortedParticipants = [...participants].sort(
    (a, b) => getPoints(b.userId) - getPoints(a.userId),
  );

  // 이번 문제 최고 점수 (0점이면 강조 없음)
  const topPoints = Math.max(0, ...roundScores.map((score) => score.points));

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
        정답은 <span className="text-[#78D51B]">{getAnswerLabel(question)}</span> 입니다
      </h2>

      <p className="mt-3 text-center text-[16px] leading-6 font-medium text-[#5E5E5E]">
        {question.explanation}
      </p>

      {/* 참여자별 이번 문제 점수 (최고점은 동점 모두 강조) */}
      <ul className="mt-5 w-full divide-y divide-[#E3E2E2]">
        {sortedParticipants.map((participant) => {
          const points = getPoints(participant.userId);
          const isTop = topPoints > 0 && points === topPoints;

          return (
            <PlayerRow
              key={participant.userId}
              nickname={participant.nickname}
              isMe={participant.userId === myUserId}
              isHighlighted={isTop}
              trailing={
                <span
                  className={`text-[18px] font-bold ${
                    isTop ? "text-[#FF4D4F]" : points > 0 ? "text-black" : "text-[#8F8F8F]"
                  }`}
                >
                  +{points}
                </span>
              }
            />
          );
        })}
      </ul>
    </section>
  );
}
