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

  // 3. 객관식 - 내용 확인
  {
    quizId: 3,
    newsId: 1,
    type: "MULTIPLE_CHOICE",
    category: "FACT_CHECK",

    question: "기사의 내용과 일치하는 것은?",

    options: [
      {
        id: 1,
        text: "최근 소비자물가는 지속적으로 하락하고 있다.",
      },
      {
        id: 2,
        text: "식료품 가격은 변하지 않았다.",
      },
      {
        id: 3,
        text: "물가 상승으로 일상생활에 필요한 지출이 늘었다.",
      },
      {
        id: 4,
        text: "에너지 가격은 큰 폭으로 하락했다.",
      },
    ],

    correctAnswer: 3,
  },

  // 4. O/X - 내용 불일치
  {
    quizId: 4,
    newsId: 1,
    type: "OX",
    category: "FACT_CHECK",

    question: "다음 내용이 맞으면 O, 틀리면 X를 선택하세요.",

    statement: "최근 물가 상승으로 가계의 생활비 부담이 줄어들었다.",

    correctAnswer: "X",

    requiresReason: true,

    exampleAnswer:
      "기사에서는 물가 상승으로 가계의 생활비 부담이 커지고 있다고 설명하고 있으므로 X입니다.",

    suggestion: "생활비 부담이 늘었는지 줄었는지 기사에서 사용한 표현을 다시 확인해보세요.",

    differenceReason: "기사에서는 생활비 부담이 감소한 것이 아니라 증가했다고 설명하고 있어요.",

    articleHint: "기사 첫 문장의 '가계의 생활비 부담이 커지고 있다'는 부분을 다시 확인해보세요.",
  },

  // 5. 객관식 - 추론
  {
    quizId: 5,
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

  // 6. 주관식 - 요약
  {
    quizId: 6,
    newsId: 1,
    type: "SUBJECTIVE",
    category: "SUMMARY",

    question: "기사의 핵심 내용을 한 문장으로 요약해보세요.",

    maxLength: 100,

    exampleAnswer: "소비자물가와 식료품·에너지 가격 상승으로 가계의 생활비 부담이 커지고 있다.",
  },

  // 7. 객관식 - 중심 내용
  {
    quizId: 7,
    newsId: 1,
    type: "MULTIPLE_CHOICE",
    category: "MAIN_IDEA",

    question: "이 기사에서 가장 중요하게 다루고 있는 문제는 무엇인가요?",

    options: [
      {
        id: 1,
        text: "가계의 여행 지출 증가",
      },
      {
        id: 2,
        text: "식료품 생산량 증가",
      },
      {
        id: 3,
        text: "물가 상승에 따른 생활비 부담 증가",
      },
      {
        id: 4,
        text: "에너지 사용량 감소",
      },
    ],

    correctAnswer: 3,
  },

  // 8. O/X - 추론
  {
    quizId: 8,
    newsId: 1,
    type: "OX",
    category: "INFERENCE",

    question: "다음 내용이 맞으면 O, 틀리면 X를 선택하세요.",

    statement: "식료품과 에너지 가격 상승은 가계의 일상적인 지출 부담에 영향을 줄 수 있다.",

    correctAnswer: "O",

    requiresReason: true,

    exampleAnswer:
      "식료품과 에너지는 일상생활에 필요한 항목이므로 가격이 오르면 가계가 부담해야 하는 생활비도 증가할 수 있습니다.",

    suggestion: "식료품과 에너지가 일상생활에서 어떤 성격의 지출인지 생각해보세요.",

    differenceReason: "가격 상승과 가계 지출 증가 사이의 관계를 충분히 설명하지 않았어요.",

    articleHint: "기사에서 '일상생활에 필요한 지출이 늘었다'고 설명한 부분을 다시 확인해보세요.",
  },

  // 9. 객관식 - 내용 확인
  {
    quizId: 9,
    newsId: 1,
    type: "MULTIPLE_CHOICE",
    category: "FACT_CHECK",

    question: "기사에서 가격이 크게 올랐다고 언급한 항목은?",

    options: [
      {
        id: 1,
        text: "의류와 자동차",
      },
      {
        id: 2,
        text: "식료품과 에너지",
      },
      {
        id: 3,
        text: "교육과 여행",
      },
      {
        id: 4,
        text: "주택과 통신",
      },
    ],

    correctAnswer: 2,
  },

  // 10. 주관식 - 추론
  {
    quizId: 10,
    newsId: 1,
    type: "SUBJECTIVE",
    category: "INFERENCE",

    question: "식료품과 에너지 가격 상승이 가계에 어떤 영향을 줄 수 있는지 작성해보세요.",

    maxLength: 150,

    exampleAnswer:
      "식료품과 에너지는 일상생활에 필요한 지출이기 때문에 가격이 상승하면 가계가 부담해야 하는 생활비가 증가할 수 있습니다.",
  },
];
