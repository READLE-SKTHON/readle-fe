// 뉴스 카테고리 (API 허용값)
export type NewsCategory = "전체" | "경제" | "세계" | "사회" | "과학IT" | "생활문화";

// 난이도 (API 허용값)
export type Difficulty = "상" | "중" | "하" | "랜덤";

// 방 설정값
export interface RoomSettings {
  category: NewsCategory;
  difficulty: Difficulty;

  // 문제당 제한 시간 (초)
  timer: number;

  // 최대 참여 인원
  memberCount: number;

  questionCount: number;
}

// 방 생성 요청
export type CreateRoomRequest = RoomSettings;

// 방 생성·입장 응답 (참여 중인 방 정보)
export interface RoomResponse extends RoomSettings {
  roomId: number;

  // 숫자 방 코드 (화면 표시 시 4자리 변환)
  roomCode: number;

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
  isHost: boolean;
}

// 대기방 참여자 목록 조회 응답
export interface RoomParticipantsResponse {
  roomId: number;
  currentCount: number;

  // 최대 참여 인원
  memberCount: number;

  participants: Participant[];

  // 게임 시작 시각 (대기 중 null)
  startedAt: string | null;
}
