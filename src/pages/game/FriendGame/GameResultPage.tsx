import { useNavigate } from "react-router-dom";

import Button from "@/components/common/button/Button";
import Header from "@/components/common/header/Header";
import RankingList from "@/components/game/friend/RankingList";
import { buttonPressStyles } from "@/components/game/friend/buttonPressStyles";
import useGameRanking from "@/hooks/useGameRanking";
import useGameRoom from "@/hooks/useGameRoom";
import { useGameStore } from "@/stores/useGameStore";
import { useRoomStore } from "@/stores/useRoomStore";

import finalCharacter from "@/assets/images/game/MultiGame/FinalCharacter.png";

export default function GameResultPage() {
  const navigate = useNavigate();

  const { roomCode, participants, myUserId } = useGameRoom();
  const rankings = useGameRanking(participants);
  const resetGame = useGameStore((state) => state.resetGame);
  const clearRoom = useRoomStore((state) => state.clearRoom);

  // 같은 방 대기방 이동 (방장/참여자 분기 유지)
  const handleReplay = () => {
    navigate("/game/friend/waiting", { replace: true });
    resetGame();
  };

  // 홈 이동 (방 나가기, 방 정보 초기화)
  const handleGoHome = () => {
    navigate("/home", { replace: true });
    resetGame();
    clearRoom();
  };

  return (
    <div className="flex h-dvh flex-col">
      <Header title={roomCode} onBack={handleGoHome} />

      <main className="flex min-h-0 flex-1 flex-col px-6.5">
        <section className="mt-6 flex shrink-0 flex-col items-center">
          <div className="relative flex items-center justify-center">
            {/* 캐릭터 뒤 파란 타원 방사형 배경 */}
            <div
              aria-hidden="true"
              className="absolute h-52 w-80 bg-radial-[closest-side] from-[#CEE5F8] to-transparent"
            />

            <img
              src={finalCharacter}
              alt="시상대 위의 벨루가들"
              className="relative h-47 w-50 object-contain"
            />
          </div>

          <h2 className="mt-4 text-[24px] font-extrabold text-black">최종순위</h2>
        </section>

        {/* 순위 목록 (넘칠 경우 목록만 스크롤) */}
        <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
          <RankingList rankings={rankings} myUserId={myUserId} />
        </div>

        <div className="flex shrink-0 flex-col gap-3 pt-4 pb-6">
          <Button
            label="한 판 더하기"
            variant="black"
            onClick={handleReplay}
            className={buttonPressStyles.black}
          />

          <Button
            label="홈화면으로 가기"
            variant="gray"
            onClick={handleGoHome}
            className={buttonPressStyles.gray}
          />
        </div>
      </main>
    </div>
  );
}
