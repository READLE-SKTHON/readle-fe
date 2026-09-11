import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import useCountdown from "@/hooks/useCountdown";
import useGameRoom from "@/hooks/useGameRoom";
import { createMockQuestions, gradeMockRound, mockSubmitTimings } from "@/mocks/game";
import { useGameStore } from "@/stores/useGameStore";

// 전원 제출 완료 표시 후 정답 발표까지 대기 시간
const ALL_SUBMITTED_HOLD_MS = 1500;

// 정답 발표·중간 순위 화면 유지 시간
const REVEAL_DURATION_MS = 3000;
const RANKING_DURATION_MS = 3000;

// 게임 진행 단계 전환 및 서버 이벤트 수신 (현재는 목데이터·타이머 시뮬레이션)
export default function useGameFlow() {
  const navigate = useNavigate();
  const { room, roomCode, participants, myUserId } = useGameRoom();

  const questions = useGameStore((state) => state.questions);
  const currentIndex = useGameStore((state) => state.currentIndex);
  const phase = useGameStore((state) => state.phase);
  const submitStatuses = useGameStore((state) => state.submitStatuses);
  const myAnswer = useGameStore((state) => state.myAnswer);
  const roundScores = useGameStore((state) => state.roundScores);

  const startGame = useGameStore((state) => state.startGame);
  const updateSubmitStatus = useGameStore((state) => state.updateSubmitStatus);
  const submitMyAnswer = useGameStore((state) => state.submitMyAnswer);
  const revealResult = useGameStore((state) => state.revealResult);
  const showRanking = useGameStore((state) => state.showRanking);
  const goToNextQuestion = useGameStore((state) => state.goToNextQuestion);

  const participantIds = useMemo(
    () => participants.map((participant) => participant.userId),
    [participants],
  );

  const otherIds = useMemo(
    () => participantIds.filter((userId) => userId !== myUserId),
    [participantIds, myUserId],
  );

  const isAnswerPhase = phase === "ANSWERING" || phase === "WAITING";
  const isLastQuestion = currentIndex === questions.length - 1;

  // 문제당 제한 시간 (문제 풀이·제출 대기 동안 진행)
  const remainingSeconds = useCountdown(room.timer, isAnswerPhase, currentIndex);
  const isTimeUp = remainingSeconds === 0;

  // 게임 시작
  useEffect(() => {
    // TODO: 문제 목록 조회 API 연동
    startGame(createMockQuestions(room.questionCount), participantIds);
  }, [startGame, room.questionCount, participantIds]);

  // 다른 참여자 제출 현황 수신
  useEffect(() => {
    if (!isAnswerPhase) return;

    // TODO: WebSocket 제출 현황 이벤트로 교체
    const timers = otherIds.flatMap((userId, index) => {
      const { selectingAt, submittedAt, isAfterMySubmit } =
        mockSubmitTimings[index % mockSubmitTimings.length];

      const selectingTimer = window.setTimeout(
        () => updateSubmitStatus(userId, "SELECTING"),
        selectingAt,
      );

      if (isAfterMySubmit) return [selectingTimer];

      return [
        selectingTimer,
        window.setTimeout(() => updateSubmitStatus(userId, "SUBMITTED"), submittedAt),
      ];
    });

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [isAnswerPhase, currentIndex, questions, otherIds, updateSubmitStatus]);

  // 내 제출 이후 제출하는 참여자 (제출 대기 화면 시뮬레이션)
  useEffect(() => {
    if (phase !== "WAITING") return;

    const timers = otherIds.flatMap((userId, index) => {
      const { submittedAt, isAfterMySubmit } = mockSubmitTimings[index % mockSubmitTimings.length];

      return isAfterMySubmit
        ? [window.setTimeout(() => updateSubmitStatus(userId, "SUBMITTED"), submittedAt)]
        : [];
    });

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [phase, otherIds, updateSubmitStatus]);

  // 전원 제출(완료 표시 후) 또는 제한 시간 종료 시 정답 발표
  useEffect(() => {
    const state = useGameStore.getState();
    const question = state.questions[state.currentIndex];

    const isAnswering = state.phase === "ANSWERING" || state.phase === "WAITING";
    const isAllSubmitted = state.participantIds.every(
      (userId) => state.submitStatuses[userId] === "SUBMITTED",
    );

    if (!question || !isAnswering || !(isAllSubmitted || isTimeUp)) return;

    // 정답 발표 시점 상태로 채점
    const reveal = () => {
      const latest = useGameStore.getState();

      // TODO: 서버 정답·점수 결과 수신으로 교체
      revealResult(
        gradeMockRound({
          question,
          questionIndex: latest.currentIndex,
          participantIds: latest.participantIds,
          myUserId,
          myAnswer: latest.myAnswer,
          submitStatuses: latest.submitStatuses,
        }),
      );
    };

    if (isTimeUp) {
      reveal();
      return;
    }

    // 전원 제출 완료 상태 표시 후 이동
    const timer = window.setTimeout(reveal, ALL_SUBMITTED_HOLD_MS);

    return () => window.clearTimeout(timer);
  }, [submitStatuses, phase, isTimeUp, myUserId, revealResult]);

  // 정답 발표 → 중간 순위(마지막 문제는 최종 순위) → 다음 문제 자동 전환
  useEffect(() => {
    if (phase === "REVEAL") {
      const timer = window.setTimeout(() => {
        if (isLastQuestion) {
          navigate("/game/friend/result", { replace: true });
          return;
        }

        showRanking();
      }, REVEAL_DURATION_MS);

      return () => window.clearTimeout(timer);
    }

    if (phase === "RANKING") {
      const timer = window.setTimeout(goToNextQuestion, RANKING_DURATION_MS);

      return () => window.clearTimeout(timer);
    }
  }, [phase, isLastQuestion, navigate, showRanking, goToNextQuestion]);

  // 내 답안 제출
  const submitAnswer = (answer: string) => {
    // TODO: 답안 제출 API 연동
    submitMyAnswer(myUserId, answer);
  };

  return {
    roomCode,
    participants,
    myUserId,
    question: questions[currentIndex],
    questionNumber: currentIndex + 1,
    totalCount: questions.length,
    phase,
    remainingSeconds,
    submitStatuses,
    myAnswer,
    roundScores,
    submitAnswer,
  };
}
