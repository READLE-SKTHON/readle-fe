import Button from "@/components/common/button/Button";
import Header from "@/components/common/header/Header";
import ConfirmModal from "@/components/common/modal/ConfirmModal";
import ErrorState from "@/components/common/status/ErrorState";
import LoadingState from "@/components/common/status/LoadingState";
import CharacterShadow from "@/components/game/friend/CharacterShadow";
import { buttonPressStyles } from "@/components/game/friend/buttonPressStyles";
import RankingList from "@/components/game/friend/RankingList";
import AnswerReveal from "@/components/game/friend/gamePlay/AnswerReveal";
import QuestionRenderer from "@/components/game/friend/gamePlay/QuestionRenderer";
import SubmitStatusList from "@/components/game/friend/gamePlay/SubmitStatusList";
import TimerCard from "@/components/game/friend/gamePlay/TimerCard";
import useGameFlow from "@/hooks/useGameFlow";
import type { GameAnswer, GameQuestion } from "@/types/game";

import middleCharacter from "@/assets/images/game/MultiGame/middleCharacter.png";

export default function GamePlayPage() {
  const {
    roomCode,
    myUserId,
    status,
    question,
    draftAnswer,
    setDraftAnswer,
    isSubmitted,
    isAllSubmitted,
    canSubmit,
    submitAnswer,
    isSubmitting,
    submitErrorMessage,
    resetSubmitError,
    statusErrorMessage,
    retryStatus,
  } = useGameFlow();

  return (
    <div className="flex h-dvh flex-col">
      {/* 게임 진행 중 뒤로가기 없음 */}
      <Header
        title={roomCode}
        current={status?.currentQuestionNumber}
        total={status?.totalQuestions}
        showBack={false}
      />

      {statusErrorMessage ? (
        // 게임 상태 조회 실패
        <ErrorState message={statusErrorMessage} onRetry={retryStatus} className="flex-1 px-6.5" />
      ) : !status || (status.phase === "ANSWERING" && !question) ? (
        <LoadingState message="게임을 불러오는 중이에요" className="flex-1" />
      ) : (
        <>
          {/* 제한 시간 (서버 기준 남은 시간) */}
          {status.phase === "ANSWERING" && (
            <div className="shrink-0 px-6.5 pt-4">
              <TimerCard remainingSeconds={status.remainingSeconds} />
            </div>
          )}

          {status.phase === "ANSWERING" && question && !isSubmitted && (
            <AnsweringStep
              question={question}
              answer={draftAnswer}
              onChangeAnswer={setDraftAnswer}
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
              onSubmit={submitAnswer}
            />
          )}

          {/* 제출 후 대기 */}
          {status.phase === "ANSWERING" && question && isSubmitted && (
            <main className="min-h-0 flex-1 overflow-y-auto px-6.5 pt-6 pb-8">
              <QuestionRenderer question={question} answer={draftAnswer} isLocked />

              <h3 className="mt-8 text-[18px] font-bold text-black">친구들의 답안 현황</h3>

              <div className="mt-2">
                <SubmitStatusList statuses={status.answerStatus ?? []} myUserId={myUserId} />
              </div>

              {isAllSubmitted && (
                <p className="mt-4 text-center text-[16px] font-semibold text-[#0083FF]">
                  모두 제출했어요! 시간이 끝나면 정답이 공개돼요
                </p>
              )}
            </main>
          )}

          {status.phase === "REVEAL" && status.myResult && (
            <main className="min-h-0 flex-1 overflow-y-auto px-6.5 pt-12 pb-8">
              <AnswerReveal
                question={question}
                myResult={status.myResult}
                results={status.allResults ?? []}
                myUserId={myUserId}
              />
            </main>
          )}

          {status.phase === "LEADERBOARD" && (
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
                <RankingList rankings={status.scoreboard ?? []} myUserId={myUserId} />
              </div>
            </main>
          )}
        </>
      )}

      {/* 답안 제출 실패 안내 */}
      {submitErrorMessage && (
        <ConfirmModal message={submitErrorMessage} onConfirm={resetSubmitError} />
      )}
    </div>
  );
}

type AnsweringStepProps = {
  question: GameQuestion;
  answer: GameAnswer | null;
  onChangeAnswer: (answer: GameAnswer) => void;
  canSubmit: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
};

// 문제 풀이 단계 (선택·입력 중인 답안은 게임 store 관리)
function AnsweringStep({
  question,
  answer,
  onChangeAnswer,
  canSubmit,
  isSubmitting,
  onSubmit,
}: AnsweringStepProps) {
  return (
    <>
      <main className="min-h-0 flex-1 overflow-y-auto px-6.5 pt-6 pb-4">
        <QuestionRenderer question={question} answer={answer} onChangeAnswer={onChangeAnswer} />
      </main>

      <div className="shrink-0 px-6.5 pt-3 pb-6">
        <Button
          label={isSubmitting ? "제출 중..." : "제출하기"}
          disabled={!canSubmit || isSubmitting}
          onClick={onSubmit}
          className={buttonPressStyles.primary}
        />
      </div>
    </>
  );
}
