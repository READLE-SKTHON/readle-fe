import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import useRoom from "@/hooks/useRoom";
import useUser from "@/hooks/useUser";
import useGameStatusQuery from "@/queries/game/useGameStatusQuery";
import useSubmitAnswerMutation, {
  DUPLICATE_SUBMIT_CODE,
} from "@/queries/game/useSubmitAnswerMutation";
import { useGameStore } from "@/stores/useGameStore";
import { getApiError } from "@/utils/getApiError";
import { toGameQuestion } from "@/utils/toGameQuestion";
import { toSubmitAnswerRequest } from "@/utils/toSubmitAnswerRequest";

// 아직 시작되지 않은 방 에러 코드
const NOT_STARTED_CODE = "R010";

// 게임 상태 조회·화면 전환·답안 제출 (서버 상태 기준, 클라이언트 임의 전환 없음)
export default function useGameFlow() {
  const navigate = useNavigate();

  const { user } = useUser();
  const { room, roomCode } = useRoom();

  const statusQuery = useGameStatusQuery(room.roomId);
  const status = statusQuery.data;

  const syncStatus = useGameStore((state) => state.syncStatus);
  const questions = useGameStore((state) => state.questions);
  const submittedOrders = useGameStore((state) => state.submittedOrders);
  const draftAnswer = useGameStore((state) => state.draftAnswer);
  const setDraftAnswer = useGameStore((state) => state.setDraftAnswer);

  const submitMutation = useSubmitAnswerMutation(room.roomId);

  // 상태 응답 store 반영 (판·문제 전환 감지)
  useEffect(() => {
    if (status) syncStatus(status);
  }, [status, syncStatus]);

  // 게임 종료 시 최종 순위 화면 이동
  useEffect(() => {
    if (status?.phase === "FINISHED") navigate("/game/friend/result", { replace: true });
  }, [status?.phase, navigate]);

  // 시작 전 방 진입 시 대기방 이동
  const statusErrorCode = getApiError(statusQuery.error).code;

  useEffect(() => {
    if (statusErrorCode === NOT_STARTED_CODE) navigate("/game/friend/waiting", { replace: true });
  }, [statusErrorCode, navigate]);

  const order = status?.currentQuestionOrder ?? null;
  const statusQuestion = status?.question ?? null;

  // 현재 문제 (문제 없는 정답 공개 단계는 저장된 문제)
  const currentQuestion = useMemo(
    () => (statusQuestion ? toGameQuestion(statusQuestion) : null),
    [statusQuestion],
  );

  const question = currentQuestion ?? (order !== null ? (questions[order] ?? null) : null);

  const answerStatus = status?.answerStatus ?? [];

  // 내 제출 여부 (제출 기록 또는 서버 제출 현황)
  const isSubmitted =
    order !== null &&
    (submittedOrders.includes(order) ||
      answerStatus.some(({ userId, answered }) => userId === user.id && answered));

  // 전원 제출 완료 여부
  const isAllSubmitted = answerStatus.length > 0 && answerStatus.every(({ answered }) => answered);

  // 답안 선택·입력 완료 여부 (단답형 공백만 입력 시 제출 불가)
  const canSubmit =
    draftAnswer !== null &&
    (draftAnswer.format !== "short_answer" || draftAnswer.text.trim().length > 0);

  // 답안 제출 처리
  const submitAnswer = () => {
    if (order === null || !draftAnswer || !canSubmit || submitMutation.isPending) return;

    submitMutation.mutate({ order, request: toSubmitAnswerRequest(draftAnswer) });
  };

  // 제출 실패 안내 문구 (중복 제출은 제출 완료 처리)
  const submitError = submitMutation.error ? getApiError(submitMutation.error) : null;
  const submitErrorMessage =
    submitError && submitError.code !== DUPLICATE_SUBMIT_CODE ? submitError.message : null;

  // 상태 조회 실패 안내 문구 (받아온 상태가 없을 때만, 시작 전 방 제외)
  const statusErrorMessage =
    statusQuery.isError && !status && statusErrorCode !== NOT_STARTED_CODE
      ? getApiError(statusQuery.error).message
      : null;

  return {
    roomCode,
    myUserId: user.id,
    status,
    question,
    draftAnswer,
    setDraftAnswer,
    isSubmitted,
    isAllSubmitted,
    canSubmit,
    submitAnswer,
    isSubmitting: submitMutation.isPending,
    submitErrorMessage,
    resetSubmitError: submitMutation.reset,
    statusErrorMessage,
    retryStatus: () => {
      statusQuery.refetch();
    },
  };
}
