// src/mocks/user.ts

export type User = {
  id: number;
  nickname: string;
  school: string;
};

export const users: User[] = [
  {
    id: 1,
    nickname: "김환희",
    school: "환희고등학교",
  },
  {
    id: 2,
    nickname: "장서후",
    school: "서후고등학교",
  },
  {
    id: 3,
    nickname: "오지우",
    school: "지우고등학교",
  },
];
