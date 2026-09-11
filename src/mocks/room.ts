import type {
  CreateRoomResponse,
  Difficulty,
  NewsCategory,
  Participant,
  RoomOption,
  RoomSettings,
  WaitingRoom,
} from "@/types/room";
import type { User } from "@/types/user";

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

// 방 생성 더미 응답 (방 코드는 숫자 4자리)
export const mockCreatedRoom: CreateRoomResponse = {
  roomCode: "1017",
  inviteLink: "https://readle.app/invite/1017",
};

// 목데이터 대기방 방장 id (장서후, 방 만들기 입장 시 로그인 사용자로 교체)
export const mockHostUserId = 2;

// 방장 화면용 대기방
export const mockHostWaitingRoom: WaitingRoom = {
  roomCode: mockCreatedRoom.roomCode,
  inviteLink: mockCreatedRoom.inviteLink,
  hostId: mockHostUserId,
  maxPlayers: 4,
  participants: [
    { userId: 2, nickname: "장서후", profileImageUrl: null },
    { userId: 3, nickname: "오지우", profileImageUrl: null },
    { userId: 1, nickname: "김환희", profileImageUrl: null },
  ],
  settings: defaultRoomSettings,
};

// 참여자 화면용 대기방
export const mockGuestWaitingRoom: WaitingRoom = {
  ...mockHostWaitingRoom,
  participants: [
    ...mockHostWaitingRoom.participants,
    { userId: 4, nickname: "김승민", profileImageUrl: null },
  ],
};

// 로그인 사용자 참여자 정보 (프로필 이미지 없음)
const toParticipant = (user: User): Participant => ({
  userId: user.id,
  nickname: user.nickname,
  profileImageUrl: null,
});

// 방장 입장 대기방 목데이터 (방 만들기 설정값 적용, 로그인 사용자 방장)
export const createMockHostWaitingRoom = (settings: RoomSettings, user: User): WaitingRoom => ({
  ...mockHostWaitingRoom,
  hostId: user.id,
  maxPlayers: settings.maxPlayers,
  participants: [
    toParticipant(user),
    ...mockHostWaitingRoom.participants.filter(({ userId }) => userId !== user.id),
  ].slice(0, settings.maxPlayers),
  settings,
});

// 참여자 입장 대기방 목데이터 (로그인 사용자 참여자, 다른 참여자 방장)
export const createMockGuestWaitingRoom = (user: User): WaitingRoom => {
  const others = mockGuestWaitingRoom.participants.filter(({ userId }) => userId !== user.id);

  return {
    ...mockGuestWaitingRoom,
    hostId: others[0].userId,
    participants: [...others.slice(0, mockGuestWaitingRoom.maxPlayers - 1), toParticipant(user)],
  };
};
