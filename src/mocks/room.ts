import type {
  CreateRoomResponse,
  Difficulty,
  NewsCategory,
  RoomOption,
  RoomSettings,
} from "@/types/room";

// 뉴스 카테고리
export const categoryOptions: RoomOption<NewsCategory>[] = [
  { label: "전체", value: "ALL" },
  { label: "경제", value: "ECONOMY" },
  { label: "사회", value: "SOCIETY" },
  { label: "세계", value: "WORLD" },
  { label: "과학/IT", value: "SCIENCE_IT" },
  { label: "생활/문화", value: "LIFE_CULTURE" },
];

// 문제당 제한 시간 (초 단위)
export const timeLimitOptions: RoomOption<number>[] = [
  { label: "15초", value: 15 },
  { label: "25초", value: 25 },
  { label: "30초", value: 30 },
  { label: "1분", value: 60 },
  { label: "2분", value: 120 },
  { label: "3분", value: 180 },
];

// 참여 인원 수
export const maxPlayersOptions: RoomOption<number>[] = [
  { label: "2명", value: 2 },
  { label: "3명", value: 3 },
  { label: "4명 (최대)", value: 4 },
];

// 한 판당 문제 수
export const questionCountOptions: RoomOption<number>[] = [
  { label: "5문제", value: 5 },
  { label: "7문제", value: 7 },
  { label: "10문제", value: 10 },
  { label: "15문제", value: 15 },
  { label: "20문제", value: 20 },
];

// 난이도
export const difficultyOptions: RoomOption<Difficulty>[] = [
  { label: "상", value: "HARD" },
  { label: "중", value: "MEDIUM" },
  { label: "하", value: "EASY" },
  { label: "랜덤", value: "RANDOM" },
];

// 방 설정 기본값
export const defaultRoomSettings: RoomSettings = {
  category: "ALL",
  timeLimit: 30,
  maxPlayers: 4,
  questionCount: 10,
  difficulty: "MEDIUM",
};

// 방 생성 더미 응답
export const mockCreatedRoom: CreateRoomResponse = {
  roomCode: "abc123",
  inviteLink: "https://readle.app/invite/abc123",
};
