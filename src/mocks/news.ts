import type { News } from "@/types/news";

export const mockNews: News = {
  newsId: 1,
  title: "식료품 물가 상승, 생활비 부담 커져",
  category: "경제",
  publisher: "중앙일보",
  publishedAt: "2026-08-01T09:00:00",
  content: `
    최근 소비자물가가 계속 상승하면서 가계의 생활비 부담이 커지고 있다.
    특히 식료품과 에너지 가격이 큰 폭으로 오르면서 일상생활에 필요한
    지출이 늘었다.
  `,
  sourceUrl: "https://example.com/news/1",
};
