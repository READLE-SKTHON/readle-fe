import { useState } from "react";

import Button from "@/components/common/button/Button";
import Header from "@/components/common/header/Header";
import CharacterShadow from "@/components/game/friend/CharacterShadow";
import { buttonPressStyles } from "@/components/game/friend/buttonPressStyles";
import RankingList from "@/components/game/friend/RankingList";
import AnswerReveal from "@/components/game/friend/gamePlay/AnswerReveal";
import QuestionRenderer from "@/components/game/friend/gamePlay/QuestionRenderer";
import SubmitStatusList from "@/components/game/friend/gamePlay/SubmitStatusList";
import TimerCard from "@/components/game/friend/gamePlay/TimerCard";
import useGameFlow from "@/hooks/useGameFlow";
import useGameRanking from "@/hooks/useGameRanking";
import type { GameQuestion } from "@/types/game";

import middleCharacter from "@/assets/images/game/MultiGame/middleCharacter.png";

export default function GamePlayPage() {
  const {
    room,
    myUserId,
    question,
    questionNumber,
    totalCount,
    phase,
    remainingSeconds,
    submitStatuses,
    myAnswer,
    roundScores,
    submitAnswer,
  } = useGameFlow();

  const rankings = useGameRanking(room.participants);

  if (!question) return null;

  const isAnswerPhase = phase === "ANSWERING" || phase === "WAITING";

  return (
    <div className="flex h-dvh flex-col">
      {/* 게임 진행 중 뒤로가기 없음 */}
      <Header title={room.roomCode} current={questionNumber} total={totalCount} showBack={false} />

      {/* 제한 시간 (문제 풀이·제출 대기) */}
      {isAnswerPhase && (
        <div className="shrink-0 px-6.5 pt-4">
          <TimerCard remainingSeconds={remainingSeconds} />
        </div>
      )}

      {phase === "ANSWERING" && (
        <AnsweringStep key={questionNumber} question={question} onSubmit={submitAnswer} />
      )}

      {phase === "WAITING" && (
        <main className="min-h-0 flex-1 overflow-y-auto px-6.5 pt-6 pb-8">
          <QuestionRenderer question={question} answer={myAnswer ?? ""} isLocked />

          <h3 className="mt-8 text-[18px] font-bold text-black">친구들의 답안 현황</h3>

          <div className="mt-2">
            <SubmitStatusList
              participants={room.participants}
              myUserId={myUserId}
              submitStatuses={submitStatuses}
            />
          </div>
        </main>
      )}

      {phase === "REVEAL" && (
        <main className="min-h-0 flex-1 overflow-y-auto px-6.5 pt-12 pb-8">
          <AnswerReveal
            question={question}
            participants={room.participants}
            myUserId={myUserId}
            roundScores={roundScores}
          />
        </main>
      )}

      {phase === "RANKING" && (
        <main className="min-h-0 flex-1 overflow-y-auto px-6.5 pt-16 pb-8">
          <section className="flex flex-col items-center">
            <img
              src={middleCharacter}
              alt="트로피를 든 벨루가"
              className="relative z-10 h-49 w-56 object-contain"
            />

            {/* 캐릭터와 띄운 그림자 */}
            <CharacterShadow className="mt-3 w-36" />

            <h2 className="mt-4 text-[24px] font-extrabold text-black">현재까지의 중간순위</h2>
          </section>

          <div className="mt-4">
            <RankingList rankings={rankings} myUserId={myUserId} />
          </div>
        </main>
      )}
    </div>
  );
}

type AnsweringStepProps = {
  question: GameQuestion;
  onSubmit: (answer: string) => void;
};

// 문제 풀이 단계 (입력 중인 답안은 문제별 화면 내부 상태)
function AnsweringStep({ question, onSubmit }: AnsweringStepProps) {
  const [answer, setAnswer] = useState("");

  // 공백만 입력한 경우 제출 불가
  const canSubmit = answer.trim().length > 0;

  return (
    <>
      <main className="min-h-0 flex-1 overflow-y-auto px-6.5 pt-6 pb-4">
        <QuestionRenderer question={question} answer={answer} onChangeAnswer={setAnswer} />
      </main>

      <div className="shrink-0 px-6.5 pt-3 pb-6">
        <Button
          label="제출하기"
          disabled={!canSubmit}
          onClick={() => onSubmit(answer)}
          className={buttonPressStyles.primary}
        />
      </div>
    </>
  );
}
