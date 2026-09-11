import type { Difficulty, NewsCategory, RoomOption, RoomSettings } from "@/types/room";

// 방 코드 자릿수
export const ROOM_CODE_LENGTH = 4;

// 뉴스 카테고리 (값은 API 허용값)
export const CATEGORY_OPTIONS: RoomOption<NewsCategory>[] = [
  { label: "전체", value: "전체" },
  { label: "경제", value: "경제" },
  { label: "사회", value: "사회" },
  { label: "세계", value: "세계" },
  { label: "과학/IT", value: "과학IT" },
  { label: "생활/문화", value: "생활문화" },
];

// 문제당 제한 시간 (초 단위)
export const TIMER_OPTIONS: RoomOption<number>[] = [
  { label: "15초", value: 15 },
  { label: "25초", value: 25 },
  { label: "30초", value: 30 },
  { label: "1분", value: 60 },
  { label: "2분", value: 120 },
  { label: "3분", value: 180 },
];

// 참여 인원 수
export const MEMBER_COUNT_OPTIONS: RoomOption<number>[] = [
  { label: "2명", value: 2 },
  { label: "3명", value: 3 },
  { label: "4명 (최대)", value: 4 },
];

// 한 판당 문제 수
export const QUESTION_COUNT_OPTIONS: RoomOption<number>[] = [
  { label: "5문제", value: 5 },
  { label: "7문제", value: 7 },
  { label: "10문제", value: 10 },
  { label: "15문제", value: 15 },
  { label: "20문제", value: 20 },
];

// 난이도 (값은 API 허용값)
export const DIFFICULTY_OPTIONS: RoomOption<Difficulty>[] = [
  { label: "상", value: "상" },
  { label: "중", value: "중" },
  { label: "하", value: "하" },
  { label: "랜덤", value: "랜덤" },
];

// 방 설정 기본값
export const DEFAULT_ROOM_SETTINGS: RoomSettings = {
  category: "전체",
  difficulty: "중",
  timer: 30,
  memberCount: 4,
  questionCount: 10,
};
