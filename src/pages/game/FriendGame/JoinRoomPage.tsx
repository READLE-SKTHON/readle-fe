import { useNavigate } from "react-router-dom";

import Button from "@/components/common/button/Button";
import Header from "@/components/common/header/Header";
import ConfirmModal from "@/components/common/modal/ConfirmModal";
import CharacterShadow from "@/components/game/friend/CharacterShadow";
import { buttonPressStyles } from "@/components/game/friend/buttonPressStyles";
import CodeInput from "@/components/game/friend/joinRoom/CodeInput";
import { ROOM_CODE_LENGTH } from "@/config/roomConfig";
import useCodeInput from "@/hooks/useCodeInput";
import useJoinRoomMutation from "@/queries/room/useJoinRoomMutation";
import { getApiError } from "@/utils/getApiError";

import codeCharacter from "@/assets/images/game/RoomEnter/CodeCharacter.png";

// 방 입장 실패 안내 문구 (에러 코드별, 없으면 서버 메시지)
const JOIN_ERROR_MESSAGES: Partial<Record<string, string>> = {
  R001: "존재하지 않는 방 코드예요.\n방 코드를 다시 확인해주세요.",
  R002: "이미 참가한 방이에요.",
  R003: "방이 가득 찼어요.\n다른 방 코드를 입력해주세요.",
};

// 방 입장 실패 안내 문구 변환
const getJoinErrorMessage = (error: Error) => {
  const { code, message } = getApiError(error);

  return (code ? JOIN_ERROR_MESSAGES[code] : undefined) ?? message;
};

export default function JoinRoomPage() {
  const navigate = useNavigate();

  const { mutate: joinRoom, isPending, error, reset } = useJoinRoomMutation();

  const { digits, code, isComplete, registerInput, handleChange, handleKeyDown, handlePaste } =
    useCodeInput(ROOM_CODE_LENGTH);

  // 방 코드 입장 처리 (성공 시 대기방 이동)
  const handleEnterRoom = () => {
    if (!isComplete) return;

    joinRoom(code, {
      onSuccess: () => navigate("/game/friend/waiting"),
    });
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
          label={isPending ? "입장 중..." : "입장하기"}
          disabled={!isComplete || isPending}
          onClick={handleEnterRoom}
          className={`mt-auto ${buttonPressStyles.primary}`}
        />
      </main>

      {/* 방 입장 실패 안내 */}
      {error && <ConfirmModal message={getJoinErrorMessage(error)} onConfirm={reset} />}
    </div>
  );
}
