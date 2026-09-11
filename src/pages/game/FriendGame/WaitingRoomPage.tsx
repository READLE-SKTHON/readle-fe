import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Share2 } from "lucide-react";

import Button from "@/components/common/button/Button";
import Header from "@/components/common/header/Header";
import ConfirmModal from "@/components/common/modal/ConfirmModal";
import ErrorState from "@/components/common/status/ErrorState";
import LoadingState from "@/components/common/status/LoadingState";
import Toast from "@/components/common/toast/Toast";
import CharacterShadow from "@/components/game/friend/CharacterShadow";
import { buttonPressStyles } from "@/components/game/friend/buttonPressStyles";
import InviteSlot from "@/components/game/friend/waitingRoom/InviteSlot";
import ParticipantItem from "@/components/game/friend/waitingRoom/ParticipantItem";
import RoomCodeCard from "@/components/game/friend/waitingRoom/RoomCodeCard";
import useClipboard from "@/hooks/useClipboard";
import useGameStartWatcher from "@/hooks/useGameStartWatcher";
import useShare from "@/hooks/useShare";
import useToast from "@/hooks/useToast";
import useWaitingRoom from "@/hooks/useWaitingRoom";
import useStartGameMutation from "@/queries/game/useStartGameMutation";
import { useGameStore } from "@/stores/useGameStore";
import { useRoomStore } from "@/stores/useRoomStore";
import { getApiError } from "@/utils/getApiError";

import waitingCharacter from "@/assets/images/game/RoomEnter/WaitingCharacter.png";

// 게임 시작 최소 인원
const MIN_START_PLAYERS = 2;

export default function WaitingRoomPage() {
  const navigate = useNavigate();

  const {
    roomId,
    startedAt,
    inviteLink,
    roomCode,
    participants,
    memberCount,
    myUserId,
    isHost,
    emptySlotCount,
    isPending,
    isError,
    error,
    refetch,
  } = useWaitingRoom();

  // 게임 시작 감지 후 게임 화면 이동 (방장·참여자 공통)
  useGameStartWatcher(roomId, startedAt);

  const {
    mutate: startGame,
    isPending: isStarting,
    error: startError,
    reset: resetStartError,
  } = useStartGameMutation(roomId);

  const clearRoom = useRoomStore((state) => state.clearRoom);
  const resetGame = useGameStore((state) => state.resetGame);

  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const { copy } = useClipboard();
  const { share } = useShare();
  const { message, showToast } = useToast();

  // 방 코드 복사 처리
  const handleCopyCode = async () => {
    const isCopied = await copy(roomCode);

    showToast(isCopied ? "방 코드가 복사되었어요" : "방 코드 복사에 실패했어요");
  };

  // 초대 링크 공유 처리
  const handleShare = async () => {
    const result = await share(inviteLink);

    if (result === "copied") showToast("초대 링크가 복사되었어요");
    if (result === "failed") showToast("링크 공유에 실패했어요");
  };

  // 게임 시작 처리 (방장 전용, 성공 시 게임 화면 이동)
  const handleStart = () => {
    startGame(undefined, {
      onSuccess: () => navigate("/game/friend/play", { replace: true }),
    });
  };

  // 대기방 나가기 처리 (게임·방 정보 초기화 후 친구와 함께 화면 이동)
  const handleExit = () => {
    navigate("/game/friend", { replace: true });
    resetGame();
    clearRoom();
  };

  return (
    <div className="flex h-dvh flex-col">
      <Header
        title="게임 대기방"
        onBack={() => setIsExitModalOpen(true)}
        rightElement={
          isHost ? (
            <button
              type="button"
              onClick={handleShare}
              aria-label="초대 링크 공유"
              className="flex cursor-pointer items-center"
            >
              <Share2 className="size-6 text-black" />
            </button>
          ) : undefined
        }
      />

      {isError ? (
        // 참여자 목록 조회 실패
        <ErrorState
          message={getApiError(error).message}
          onRetry={() => refetch()}
          className="flex-1 px-6.5"
        />
      ) : isPending ? (
        <LoadingState message="대기방 정보를 불러오는 중이에요" className="flex-1" />
      ) : (
        <main className="flex min-h-0 flex-1 flex-col px-6.5">
          {isHost ? (
            // 방 코드 및 대기 안내 (방장)
            <section className="mt-8 shrink-0">
              <RoomCodeCard roomCode={roomCode} onCopy={handleCopyCode} />

              <h2 className="mt-8 text-center text-[24px] leading-tight font-extrabold text-black">
                친구를 기다리고 있어요!
              </h2>

              <p className="mt-2 text-center text-[20px] leading-snug font-bold text-[#8F8F8F]">
                현재 이 방은 최대 {memberCount}명까지
                <br />
                함께 할 수 있어요.
              </p>
            </section>
          ) : (
            // 게임 시작 대기 안내 (참여자)
            <section className="mt-10 flex shrink-0 flex-col items-center">
              <img
                src={waitingCharacter}
                alt="확성기를 든 벨루가"
                className="relative z-10 w-57 object-contain"
              />

              <CharacterShadow className="mt-1 w-36" />

              <h2 className="mt-6 text-center text-[24px] leading-tight font-extrabold text-black">
                방장님이
                <br />
                게임을 시작할 때까지
                <br />
                잠시만 기다려주세요
              </h2>
            </section>
          )}

          {/* 참여자 목록 (넘칠 경우 목록만 스크롤) */}
          <ul className="mt-4 min-h-0 flex-1 space-y-3 overflow-y-auto pt-4 pb-4">
            {participants.map((participant) => (
              <ParticipantItem
                key={participant.userId}
                nickname={participant.nickname}
                isMe={participant.userId === myUserId}
                isHost={participant.isHost}
              />
            ))}

            {isHost &&
              Array.from({ length: emptySlotCount }, (_, index) => (
                <InviteSlot key={index} onClick={handleShare} />
              ))}
          </ul>

          {isHost && (
            <div className="shrink-0 pt-2 pb-6">
              <Button
                label={isStarting ? "시작하는 중..." : "시작하기"}
                disabled={participants.length < MIN_START_PLAYERS || isStarting}
                onClick={handleStart}
                className={buttonPressStyles.primary}
              />

              <p className="mt-3 text-center text-[16px] font-semibold text-[#8F8F8F]">
                2명 이상 모이면 시작할 수 있어요
              </p>
            </div>
          )}
        </main>
      )}

      {/* 대기방 나가기 확인 */}
      {isExitModalOpen && (
        <ConfirmModal
          message="대기방에서 나갈까요?"
          confirmLabel="나가기"
          cancelLabel="취소"
          onConfirm={handleExit}
          onCancel={() => setIsExitModalOpen(false)}
        />
      )}

      {/* 게임 시작 실패 안내 */}
      {startError && (
        <ConfirmModal message={getApiError(startError).message} onConfirm={resetStartError} />
      )}

      {message && <Toast message={message} />}
    </div>
  );
}
