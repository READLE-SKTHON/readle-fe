import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Blocks, BookPlus, Newspaper, Timer, User } from "lucide-react";

import Button from "@/components/common/button/Button";
import Header from "@/components/common/header/Header";
import RoomOptionRow from "@/components/game/friend/createRoom/RoomOptionRow";
import useOutsideClick from "@/hooks/useOutsideClick";
import {
  categoryOptions,
  difficultyOptions,
  maxPlayersOptions,
  mockCreatedRoom,
  questionCountOptions,
  timeLimitOptions,
} from "@/mocks/room";
import { useRoomStore } from "@/stores/useRoomStore";
import type { RoomSettings } from "@/types/room";

import roomCreateCharacter from "@/assets/images/game/RoomCreate/RoomCreateCharacter.png";

export default function CreateRoomPage() {
  const navigate = useNavigate();

  const savedSettings = useRoomStore((state) => state.settings);
  const saveSettings = useRoomStore((state) => state.setSettings);
  const setCreatedRoom = useRoomStore((state) => state.setCreatedRoom);

  const [settings, setSettings] = useState<RoomSettings>(savedSettings);
  const [openKey, setOpenKey] = useState<keyof RoomSettings | null>(null);

  const optionListRef = useRef<HTMLElement>(null);

  // 설정 리스트 바깥 클릭 시 드롭다운 닫힘
  useOutsideClick(optionListRef, () => setOpenKey(null), openKey !== null);

  // 드롭다운 열림 전환 (한 번에 하나만 열림)
  const toggleDropdown = (key: keyof RoomSettings) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  // 옵션 선택 후 드롭다운 닫힘
  const handleSelect = <K extends keyof RoomSettings>(key: K, value: RoomSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setOpenKey(null);
  };

  // 방 생성 처리
  const handleCreateRoom = () => {
    // TODO: 방 생성 API 연동 (설정값 전송 → 방 코드·초대 링크 수신)
    saveSettings(settings);
    setCreatedRoom(mockCreatedRoom);

    // 뒤로가기 시 방 만들기 화면 복귀 방지
    navigate("/game/friend/invite", { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header title="방 만들기" backPath="/game/friend" />

      <main className="flex flex-1 flex-col px-6.5 pb-8">
        {/* 캐릭터 및 소개 */}
        <section className="mt-8 flex flex-col items-center">
          <img
            src={roomCreateCharacter}
            alt="게임방 문을 여는 벨루가"
            className="h-44 w-34 object-contain"
          />

          <h2 className="mt-3 text-[28px] leading-tight font-extrabold text-black">
            어떤 방을 만들까요?
          </h2>

          <p className="mt-2 text-center text-[20px] leading-snug font-bold text-[#8F8F8F]">
            아래 설정을 선택하고 자유롭게
            <br />
            방을 만들어보세요
          </p>
        </section>

        {/* 방 설정 */}
        <section
          ref={optionListRef}
          className="mt-6 mb-5 divide-y divide-[#D4E0E9] rounded-3xl border-[1.5px] border-[#E5E5E5] bg-white"
        >
          <RoomOptionRow
            icon={Newspaper}
            label="뉴스 카테고리"
            options={categoryOptions}
            value={settings.category}
            isOpen={openKey === "category"}
            onToggle={() => toggleDropdown("category")}
            onSelect={(value) => handleSelect("category", value)}
          />

          <RoomOptionRow
            icon={Timer}
            label="문제당 제한 시간"
            options={timeLimitOptions}
            value={settings.timeLimit}
            isOpen={openKey === "timeLimit"}
            onToggle={() => toggleDropdown("timeLimit")}
            onSelect={(value) => handleSelect("timeLimit", value)}
          />

          <RoomOptionRow
            icon={User}
            label="참여 인원 수"
            options={maxPlayersOptions}
            value={settings.maxPlayers}
            isOpen={openKey === "maxPlayers"}
            onToggle={() => toggleDropdown("maxPlayers")}
            onSelect={(value) => handleSelect("maxPlayers", value)}
          />

          <RoomOptionRow
            icon={BookPlus}
            label="한 판당 문제 수"
            options={questionCountOptions}
            value={settings.questionCount}
            isOpen={openKey === "questionCount"}
            onToggle={() => toggleDropdown("questionCount")}
            onSelect={(value) => handleSelect("questionCount", value)}
          />

          <RoomOptionRow
            icon={Blocks}
            label="난이도"
            options={difficultyOptions}
            value={settings.difficulty}
            isOpen={openKey === "difficulty"}
            onToggle={() => toggleDropdown("difficulty")}
            onSelect={(value) => handleSelect("difficulty", value)}
          />
        </section>

        <Button label="방 생성하기" onClick={handleCreateRoom} className="mt-auto" />
      </main>
    </div>
  );
}
