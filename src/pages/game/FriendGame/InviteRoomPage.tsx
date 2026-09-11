import { useNavigate } from "react-router-dom";

import Button from "@/components/common/button/Button";
import Header from "@/components/common/header/Header";
import Toast from "@/components/common/toast/Toast";
import CharacterShadow from "@/components/game/friend/CharacterShadow";
import InviteLinkCard from "@/components/game/friend/invite/InviteLinkCard";
import useClipboard from "@/hooks/useClipboard";
import useToast from "@/hooks/useToast";
import { createMockHostWaitingRoom, mockCreatedRoom, mockHostUserId } from "@/mocks/room";
import { useRoomStore } from "@/stores/useRoomStore";

import inviteCharacter from "@/assets/images/game/RoomCreate/InviteCharacter.png";

export default function InviteRoomPage() {
  const navigate = useNavigate();

  const createdRoom = useRoomStore((state) => state.createdRoom);
  const settings = useRoomStore((state) => state.settings);
  const setWaitingRoom = useRoomStore((state) => state.setWaitingRoom);

  const { copy } = useClipboard();
  const { message, showToast } = useToast();

  // 방 정보가 없을 때 임시 기본값
  const inviteLink = createdRoom?.inviteLink ?? mockCreatedRoom.inviteLink;

  // 초대 링크 복사 처리
  const handleCopyLink = async () => {
    const isCopied = await copy(inviteLink);

    showToast(isCopied ? "초대 링크가 복사되었어요" : "링크 복사에 실패했어요");
  };

  // 대기방 입장 처리 (방장으로 입장)
  const handleEnterRoom = () => {
    // TODO: 대기방 입장 API 연동 (생성한 방 정보 수신)
    setWaitingRoom(createMockHostWaitingRoom(settings), mockHostUserId);
    navigate("/game/friend/waiting");
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* 생성된 방 정보 유지 후 친구와 함께 페이지 복귀 */}
      <Header title="방 만들기" backPath="/game/friend" />

      <main className="flex flex-1 flex-col px-6.5 pb-8">
        {/* 캐릭터 및 소개 */}
        <section className="mt-24 flex flex-col items-center">
          <img
            src={inviteCharacter}
            alt="초대장을 들고 있는 벨루가"
            className="relative z-10 w-48 object-contain"
          />

          <CharacterShadow className="-mt-4 w-36" />

          <h2 className="mt-6 text-[28px] font-extrabold text-black">친구를 초대해요!</h2>

          <p className="mt-2 text-center text-[20px] leading-snug font-bold text-[#8F8F8F]">
            링크를 공유해서 친구와 함께
            <br />
            문제 대결을 해보세요.
          </p>
        </section>

        {/* 초대 링크 */}
        <section className="mt-8 mb-6">
          <InviteLinkCard link={inviteLink} onCopy={handleCopyLink} />
        </section>

        <Button label="입장하기" onClick={handleEnterRoom} className="mt-auto" />
      </main>

      {message && <Toast message={message} />}
    </div>
  );
}
