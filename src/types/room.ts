export type NewsCategory = "ALL" | "ECONOMY" | "SOCIETY" | "WORLD" | "SCIENCE_IT" | "LIFE_CULTURE";

export type Difficulty = "HARD" | "MEDIUM" | "EASY" | "RANDOM";

// 방 설정값
export interface RoomSettings {
  category: NewsCategory;

  // 문제당 제한 시간 (초)
  timeLimit: number;

  maxPlayers: number;
  questionCount: number;
  difficulty: Difficulty;
}

// 방 생성 요청
export type CreateRoomRequest = RoomSettings;

// 방 생성 응답
export interface CreateRoomResponse {
  roomCode: string;
  inviteLink: string;
}

// 설정 옵션 (화면 표시 라벨 / API 전송 값)
export interface RoomOption<T extends string | number = string | number> {
  label: string;
  value: T;
}
