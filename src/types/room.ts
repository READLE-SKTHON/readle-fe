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

// 대기방 참여자
export interface Participant {
  userId: number;
  nickname: string;

  // 프로필 이미지 (없으면 기본 이미지)
  profileImageUrl: string | null;
}

// 대기방 정보
export interface WaitingRoom {
  // 숫자 4자리 방 코드
  roomCode: string;

  inviteLink: string;
  hostId: number;
  maxPlayers: number;
  participants: Participant[];

  // 방 설정 (화면 미표시, 게임 진행에 적용)
  settings: RoomSettings;
}

// 방 코드 입장 요청
export interface JoinRoomRequest {
  roomCode: string;
}

// 방 코드 입장 응답
export type JoinRoomResponse = WaitingRoom;
