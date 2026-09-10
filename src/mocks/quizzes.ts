import type { Quiz } from "@/types/quiz";

export const mockQuizzes: Quiz[] = [
  {
    quizId: 1,
    newsId: 1,
    type: "MULTIPLE_CHOICE",
    category: "MAIN_IDEA",
    question: "다음 글의 중심 내용으로 가장 적절한 것은?",
    options: [
      {
        id: 1,
        text: "식료품 가격이 하락하면서 생활비 부담이 줄어들고 있다.",
      },
      {
        id: 2,
        text: "소비자물가 상승으로 가계의 생활비 부담이 커지고 있다.",
      },
      {
        id: 3,
        text: "에너지 가격은 소비자물가에 영향을 주지 않는다.",
      },
      {
        id: 4,
        text: "최근 소비자물가는 계속 하락하고 있다.",
      },
    ],
    correctAnswer: 2,
  },

  {
    quizId: 2,
    newsId: 1,
    type: "OX",
    category: "FACT_CHECK",
    question: "다음 내용이 기사와 일치하는지 판단하세요.",
    statement: "최근 식료품과 에너지 가격이 큰 폭으로 상승했다.",
    correctAnswer: "O",
    requiresReason: true,
  },

  {
    quizId: 3,
    newsId: 1,
    type: "SUBJECTIVE",
    category: "SUMMARY",
    question: "기사 내용을 한 문장으로 요약해보세요.",
    maxLength: 100,
    exampleAnswer:
      "소비자물가 상승으로 식료품과 에너지 가격이 오르면서 가계의 생활비 부담이 커지고 있다.",
  },
];
