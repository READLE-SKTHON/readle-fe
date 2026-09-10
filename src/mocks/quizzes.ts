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

    question: "다음 내용이 맞으면 O, 틀리면 X를 선택하세요.",

    statement: "최근 식료품과 에너지 가격이 큰 폭으로 상승했다.",

    correctAnswer: "O",

    requiresReason: true,

    exampleAnswer:
      "기사에서 식료품과 에너지 가격이 큰 폭으로 올랐다고 설명하고 있기 때문에 O라고 판단할 수 있습니다.",

    suggestion:
      "가격이 올랐다는 내용뿐만 아니라 어떤 품목의 가격이 상승했는지 기사 속 내용을 함께 근거로 작성해보세요.",

    differenceReason: "기사의 핵심 내용과 연결되는 구체적인 근거가 충분히 포함되지 않았어요.",

    articleHint:
      "기사에서 식료품과 에너지 가격이 큰 폭으로 올랐다고 설명하는 부분을 다시 확인해보세요.",
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
