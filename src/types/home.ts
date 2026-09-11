export interface TodayNewsResponse {
  newsId: number;
  title: string;
  publisher: string;
  category: "전체" | "경제" | "사회" | "세계" | "과학IT" | "생활문화";
  publishedAt: string;
  content: string;
  level: number;
}

export interface HomeResponse {
  nickname: string;
  level: number;
  xp: number;
  maxXp: number;
  currentStreak: number;
  newsReadCount: number;
  answerRate: number;
  todayNews: TodayNewsResponse | null;
}
