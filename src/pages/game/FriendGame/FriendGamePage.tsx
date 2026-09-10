import { useNavigate } from "react-router-dom";
import { CirclePlus, Hash } from "lucide-react";

import Header from "@/components/common/header/Header";
import CharacterShadow from "@/components/game/friend/CharacterShadow";
import FriendModeCard from "@/components/game/friend/FriendModeCard";

import friendGameCharacter from "@/assets/images/game/RoomCreate/FriendGameCharacter.png";

export default function FriendGamePage() {
  const navigate = useNavigate();

  // 방 코드 입장 처리
  const handleJoinByCode = () => {
    // TODO: 방 코드 입력 화면 연결 (디자인 확정 후)
  };

  return (
    <div className="min-h-screen">
      <Header title="친구와 함께" />

      <main className="px-6.5 pb-10">
        {/* 소개 문구 */}
        <section className="mt-14">
          <h2 className="text-[32px] leading-tight font-extrabold text-black">
            친구와 함께
            <br />
            문제로 겨뤄보세요
          </h2>

          <p className="mt-3 text-[20px] leading-snug font-bold text-[#8F8F8F]">
            같은 뉴스로 더 재미있게!
            <br />
            지금 바로 친구들을 초대해요
          </p>
        </section>

        {/* 캐릭터 */}
        <div className="relative mt-8 flex justify-center">
          <img
            src={friendGameCharacter}
            alt="게임기를 들고 있는 벨루가 두 마리"
            className="relative z-10 h-46 w-85 object-contain"
          />

          {/* 캐릭터별 그림자 */}
          <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 gap-12">
            <CharacterShadow className="w-28" />
            <CharacterShadow className="w-28" />
          </div>
        </div>

        {/* 입장 방식 선택 */}
        <section className="mt-14 flex flex-col gap-4">
          <FriendModeCard
            icon={CirclePlus}
            title="방 만들기"
            description="방을 생성하고 친구를 초대해요"
            onClick={() => navigate("/game/friend/create")}
          />

          <FriendModeCard
            icon={Hash}
            title="방 코드로 들어가기"
            description="친구가 만든 방에 참여해요"
            onClick={handleJoinByCode}
          />
        </section>
      </main>
    </div>
  );
}
