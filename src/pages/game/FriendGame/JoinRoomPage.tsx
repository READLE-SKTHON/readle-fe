import { useNavigate } from "react-router-dom";

import Button from "@/components/common/button/Button";
import Header from "@/components/common/header/Header";
import CharacterShadow from "@/components/game/friend/CharacterShadow";
import CodeInput from "@/components/game/friend/joinRoom/CodeInput";
import useCodeInput from "@/hooks/useCodeInput";
import { mockGuestUserId, mockGuestWaitingRoom } from "@/mocks/room";
import { useRoomStore } from "@/stores/useRoomStore";

import codeCharacter from "@/assets/images/game/RoomEnter/CodeCharacter.png";

// 방 코드 자릿수
const ROOM_CODE_LENGTH = 4;

export default function JoinRoomPage() {
  const navigate = useNavigate();

  const setWaitingRoom = useRoomStore((state) => state.setWaitingRoom);

  const { digits, isComplete, registerInput, handleChange, handleKeyDown, handlePaste } =
    useCodeInput(ROOM_CODE_LENGTH);

  // 방 코드 입장 처리 (참여자로 입장)
  const handleEnterRoom = () => {
    // TODO: 방 코드 입장 API 연동 (방 코드 전송 → 대기방 정보 수신)
    // TODO: 잘못된 코드·인원 초과·이미 시작된 방 에러 처리 (디자인 확정 후)
    setWaitingRoom(mockGuestWaitingRoom, mockGuestUserId);
    navigate("/game/friend/waiting");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header title="방 코드로 들어가기" backPath="/game/friend" />

      <main className="flex flex-1 flex-col px-6.5 pb-8">
        {/* 캐릭터 및 소개 */}
        <section className="mt-16 flex flex-col items-center">
          <img
            src={codeCharacter}
            alt="방 코드 팻말을 든 벨루가"
            className="relative z-10 w-55 object-contain"
          />

          <CharacterShadow className="mt-3 w-34" />

          <h2 className="mt-14 text-[28px] leading-tight font-extrabold text-black">
            친구가 만든 방에 들어가요!
          </h2>

          <p className="mt-3 text-center text-[20px] leading-snug font-bold text-[#8F8F8F]">
            친구에게 받은 4자리 방 코드를
            <br />
            입력해주세요
          </p>
        </section>

        {/* 방 코드 입력 */}
        <section className="mt-16 mb-6">
          <CodeInput
            digits={digits}
            registerInput={registerInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
          />
        </section>

        <Button
          label="입장하기"
          disabled={!isComplete}
          onClick={handleEnterRoom}
          className="mt-auto"
        />
      </main>
    </div>
  );
}
