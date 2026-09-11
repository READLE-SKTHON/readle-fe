// src/mocks/user.ts

import type { User } from "@/types/user";

// 테스트 계정 (시작 누적 XP: 김환희 홈 기준, 나머지 랭킹 기준)
export const users: User[] = [
  {
    id: 1,
    nickname: "김환희",
    school: "환희고등학교",
    totalXp: 320,
  },
  {
    id: 2,
    nickname: "장서후",
    school: "서후고등학교",
    totalXp: 5000,
  },
  {
    id: 3,
    nickname: "오지우",
    school: "지우고등학교",
    totalXp: 2210,
  },
];
