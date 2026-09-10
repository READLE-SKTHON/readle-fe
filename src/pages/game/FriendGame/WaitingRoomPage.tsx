import { Share2 } from "lucide-react";

import Button from "@/components/common/button/Button";
import Header from "@/components/common/header/Header";
import Toast from "@/components/common/toast/Toast";
import CharacterShadow from "@/components/game/friend/CharacterShadow";
import InviteSlot from "@/components/game/friend/waitingRoom/InviteSlot";
import ParticipantItem from "@/components/game/friend/waitingRoom/ParticipantItem";
import RoomCodeCard from "@/components/game/friend/waitingRoom/RoomCodeCard";
import useClipboard from "@/hooks/useClipboard";
import useShare from "@/hooks/useShare";
import useToast from "@/hooks/useToast";
import useWaitingRoom from "@/hooks/useWaitingRoom";

import waitingCharacter from "@/assets/images/game/RoomEnter/WaitingCharacter.png";

// 게임 시작 최소 인원
const MIN_START_PLAYERS = 2;

export default function WaitingRoomPage() {
  const { room, myUserId, isHost, emptySlotCount } = useWaitingRoom();

  const { copy } = useClipboard();
  const { share } = useShare();
  const { message, showToast } = useToast();

  // 방 코드 복사 처리
  const handleCopyCode = async () => {
    const isCopied = await copy(room.roomCode);

    showToast(isCopied ? "방 코드가 복사되었어요" : "방 코드 복사에 실패했어요");
  };

  // 초대 링크 공유 처리
  const handleShare = async () => {
    const result = await share(room.inviteLink);

    if (result === "copied") showToast("초대 링크가 복사되었어요");
    if (result === "failed") showToast("링크 공유에 실패했어요");
  };

  // 게임 시작 처리
  const handleStart = () => {
    // TODO: 게임 화면 연결 (디자인 확정 후)
  };

  return (
    <div className="flex h-dvh flex-col">
      {/* TODO: 뒤로가기 시 방 나가기 확인 처리 */}
      <Header
        title="게임 대기방"
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

      <main className="flex min-h-0 flex-1 flex-col px-6.5">
        {isHost ? (
          // 방 코드 및 대기 안내 (방장)
          <section className="mt-8 shrink-0">
            <RoomCodeCard roomCode={room.roomCode} onCopy={handleCopyCode} />

            <h2 className="mt-8 text-center text-[24px] leading-tight font-extrabold text-black">
              친구를 기다리고 있어요!
            </h2>

            <p className="mt-2 text-center text-[20px] leading-snug font-bold text-[#8F8F8F]">
              현재 이 방은 최대 {room.maxPlayers}명까지
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
          {room.participants.map((participant) => (
            <ParticipantItem
              key={participant.userId}
              nickname={participant.nickname}
              profileImageUrl={participant.profileImageUrl}
              isMe={participant.userId === myUserId}
              isHost={participant.userId === room.hostId}
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
              label="시작하기"
              disabled={room.participants.length < MIN_START_PLAYERS}
              onClick={handleStart}
            />

            <p className="mt-3 text-center text-[16px] font-semibold text-[#8F8F8F]">
              2명 이상 모이면 시작할 수 있어요
            </p>
          </div>
        )}
      </main>

      {message && <Toast message={message} />}
    </div>
  );
}
