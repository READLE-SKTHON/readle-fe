import type { Quiz } from "@/types/quiz";

export const mockQuizzes: Quiz[] = [
  // 1. 객관식 - 중심 내용
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

  // 2. O/X - 내용 일치
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

  // 3. 주관식 - 요약
  {
    quizId: 3,
    newsId: 1,
    type: "SUBJECTIVE",
    category: "SUMMARY",

    question: "기사에서 물가 상승의 원인으로 제시한 요인을 두 가지 작성하세요.",

    maxLength: 500,

    articleEvidence:
      "기사에서는 식료품과 에너지 가격이 큰 폭으로 오르면서 일상생활에 필요한 지출이 늘었다고 설명하고 있습니다.",

    feedback:
      "식료품과 에너지 가격이라는 핵심 요인을 잘 찾았어요. 두 요소를 명확하게 구분해서 작성하면 더 좋은 답안이 됩니다.",

    exampleAnswer:
      "물가 상승의 주요 원인으로 식료품 가격 상승과 에너지 가격 상승이 제시되었습니다.",
  },

  // 4. 객관식 - 추론
  {
    quizId: 4,
    newsId: 1,
    type: "MULTIPLE_CHOICE",
    category: "INFERENCE",

    question: "기사의 내용을 바탕으로 추론할 수 있는 것은?",

    options: [
      {
        id: 1,
        text: "가계에서 필수 생활비가 차지하는 부담이 커질 수 있다.",
      },
      {
        id: 2,
        text: "모든 상품의 가격이 하락할 것이다.",
      },
      {
        id: 3,
        text: "식료품 소비가 완전히 사라질 것이다.",
      },
      {
        id: 4,
        text: "에너지 가격은 앞으로 변하지 않을 것이다.",
      },
    ],

    correctAnswer: 1,
  },

  // 5. O/X - 내용 불일치
  {
    quizId: 5,
    newsId: 1,
    type: "OX",
    category: "FACT_CHECK",

    question: "다음 내용이 맞으면 O, 틀리면 X를 선택하세요.",

    statement: "최근 물가 상승으로 가계의 생활비 부담이 줄어들었다.",

    correctAnswer: "X",

    requiresReason: true,

    exampleAnswer:
      "기사에서는 물가 상승으로 가계의 생활비 부담이 커지고 있다고 설명하고 있으므로 X입니다.",

    suggestion: "기사에서 생활비 부담이 늘었다고 했는지 줄었다고 했는지 다시 확인해보세요.",

    differenceReason: "기사에서는 생활비 부담이 감소한 것이 아니라 증가했다고 설명하고 있어요.",

    articleHint: "기사의 '가계의 생활비 부담이 커지고 있다'는 부분을 다시 확인해보세요.",
  },
];
