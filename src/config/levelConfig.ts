import type { UserLevel } from "@/config/gameLevelConfig";

import Level1Character from "@/assets/images/level/Level1Character.png";
import Level2Character from "@/assets/images/level/Level2Character.png";
import Level3Character from "@/assets/images/level/Level3Character.png";
import Level4Character from "@/assets/images/level/level4Character.png";
import Level5Character from "@/assets/images/level/level5Character.png";

type LevelConfig = {
  level: UserLevel;

  // 레벨 시작 누적 XP
  minXp: number;

  title: string;
  description: string;

  // 레벨별 캐릭터 (홈·마이페이지 공통)
  character: string;
};

// 레벨당 필요 XP
export const XP_PER_LEVEL = 2000;

// 누적 XP 레벨 구간 (Lv.1 0~1,999 / Lv.2 2,000~3,999 / Lv.3 4,000~5,999 / Lv.4 6,000~7,999 / Lv.5 8,000~)
// TODO: Lv.2 · Lv.3 칭호·설명 확정 후 교체
export const LEVEL_CONFIG: LevelConfig[] = [
  {
    level: 1,
    minXp: 0,
    title: "문장 수집가",
    description: "문장 속 중요한 단어들을 하나씩 모아가요",
    character: Level1Character,
  },

  {
    level: 2,
    minXp: 2000,
    title: "문단 탐험가",
    description: "문단 속 핵심 내용을 찾아 나서요",
    character: Level2Character,
  },

  {
    level: 3,
    minXp: 4000,
    title: "뉴스 해설가",
    description: "뉴스의 흐름을 읽고 스스로 판단해요",
    character: Level3Character,
  },

  {
    level: 4,
    minXp: 6000,
    title: "비판탐정",
    description: "뉴스 속 주장과 근거를 꼼꼼히 따져볼 수 있어요",
    character: Level4Character,
  },

  {
    level: 5,
    minXp: 8000,
    title: "문해마스터",
    description: "“읽고, 이해하고, 판단하는 힘을 모두 갖췄어요!”",
    character: Level5Character,
  },
];
