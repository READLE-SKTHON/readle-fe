import { mockNews } from "@/mocks/news";
import type { News } from "@/types/news";
import type {
  AbilityScore,
  ReviewQuiz,
  ReviewQuizContent,
  ReviewTypeId,
  ReviewTypeSummary,
  ReviewWrongAnswer,
} from "@/types/review";
import { getToday } from "@/utils/getToday";

// 복습 메인 헤더
export const mockReviewHeader = {
  userName: "김환희",
  notificationCount: 1,
};

// 문해력 능력치 (나의 점수 · 전체 평균)
export const mockAbilityScores: AbilityScore[] = [
  { key: "VOCABULARY", label: "어휘력", myScore: 75, averageScore: 62 },
  { key: "READING", label: "독해력", myScore: 80, averageScore: 66 },
  { key: "INFERENCE", label: "추론력", myScore: 76, averageScore: 58 },
  { key: "CRITICAL_THINKING", label: "비판적 사고력", myScore: 70, averageScore: 64 },
  { key: "EXPRESSION", label: "표현력", myScore: 62, averageScore: 70 },
];

// 복습 유형 (틀린 문제 개수는 저장된 오답 기준 계산, 정보추출: XP 획득 완료 확인용)
export const mockReviewTypes: Omit<ReviewTypeSummary, "wrongCount">[] = [
  {
    typeId: "VOCABULARY",
    name: "어휘",
    subTypes: ["어휘 적절성", "사전적/문맥적 의미", "바꿔 쓰기"],
    isXpEarnedToday: false,
  },
  {
    typeId: "INFORMATION",
    name: "정보추출",
    subTypes: ["일치/불일치", "근거찾기"],
    isXpEarnedToday: true,
  },
  {
    typeId: "MAIN_IDEA",
    name: "핵심파악",
    subTypes: ["주제", "제목", "요지", "주장"],
    isXpEarnedToday: false,
  },
  {
    typeId: "INFERENCE",
    name: "추론 및 판단",
    subTypes: ["빈칸추론", "함축적 의미 추론", "이어질 내용 유추"],
    isXpEarnedToday: false,
  },
  {
    typeId: "STRUCTURE",
    name: "구조파악",
    subTypes: ["문장삽입", "글의 순서", "무관한 문장 찾기"],
    isXpEarnedToday: false,
  },
];

// 응용 문제 기사 (동일 유형 신규 지문)
const organizationNews: News = {
  newsId: 202,
  title: "새 제도 도입, 구성원 반발은 왜 생길까",
  category: "사회",
  publisher: "리들일보",
  publishedAt: "2026-09-03T09:00:00",
  content: `조직에서 새로운 제도를 도입할 때 구성원들의 반발이 발생하는 이유는 단순히 변화에 대한 거부감으로만 설명하기는 어렵다. 기존 제도에 익숙해진 사람들은 새로운 방식이 가져올 이익뿐 아니라 자신이 잃게 될 권한이나 익숙함에도 민감하게 반응한다.

전문가들은 제도를 도입하기 전 구성원들과 충분히 소통하고, 변화로 달라지는 점을 구체적으로 안내하는 과정이 필요하다고 조언한다.`,
  sourceUrl: "https://example.com/news/202",
};

// 저장된 오답 (정보추출: 오늘 복습 완료 확인용, 추론 및 판단: 복습 전 확인용, 나머지: 틀린 문제 없음 확인용)
export const mockWrongAnswers: ReviewWrongAnswer[] = [
  {
    typeId: "INFORMATION",
    subType: "일치/불일치",
    reviewedDate: getToday(),
    quiz: {
      quizId: 101,
      newsId: mockNews.newsId,
      type: "OX",
      category: "FACT_CHECK",
      news: mockNews,
      question: "다음 내용이 맞으면 O, 틀리면 X를 선택하세요.",
      statement: "소비자심리지수는 전달보다 상승했다.",
      correctAnswer: "X",
      requiresReason: true,
      exampleAnswer:
        "기사에서는 소비자심리지수가 전달보다 하락했다고 설명하고 있기 때문에 X라고 판단할 수 있습니다.",
      suggestion: "소비자심리지수가 어떻게 변했는지 기사 속 표현을 함께 근거로 작성해보세요.",
      differenceReason:
        "기사에서는 소비자심리지수가 상승한 것이 아니라 하락했다고 설명하고 있어요.",
      articleHint: "기사의 '소비자심리지수는 전달보다 하락해'라는 부분을 다시 확인해보세요.",
    },
  },
  {
    typeId: "INFORMATION",
    subType: "근거찾기",
    reviewedDate: getToday(),
    quiz: {
      quizId: 102,
      newsId: mockNews.newsId,
      type: "SUBJECTIVE",
      category: "SUMMARY",
      news: mockNews,
      question: "기사에서 가격이 큰 폭으로 올랐다고 제시한 두 가지 품목을 작성하세요.",
      maxLength: 500,
      articleEvidence:
        "기사에서는 식료품과 에너지 가격이 큰 폭으로 오르면서 일상생활에 필요한 지출이 늘었다고 설명하고 있습니다.",
      feedback:
        "식료품과 에너지라는 두 품목을 잘 찾았어요. 기사 속 표현을 그대로 활용하면 더 정확한 답안이 됩니다.",
      exampleAnswer: "기사에서 가격이 큰 폭으로 올랐다고 제시한 품목은 식료품과 에너지입니다.",
    },
  },
  {
    typeId: "INFERENCE",
    subType: "이어질 내용 유추",
    reviewedDate: null,
    quiz: {
      quizId: 103,
      newsId: mockNews.newsId,
      type: "MULTIPLE_CHOICE",
      category: "INFERENCE",
      news: mockNews,
      question: "기사를 바탕으로 앞으로 나타날 수 있는 모습으로 가장 적절한 것은?",
      options: [
        { id: 1, text: "소비자들이 지출을 줄이고 더 신중하게 소비할 수 있다." },
        { id: 2, text: "식료품 가격이 곧바로 크게 떨어질 것이다." },
        { id: 3, text: "소비자심리지수가 크게 오를 것이다." },
        { id: 4, text: "에너지 가격은 소비에 아무 영향을 주지 않을 것이다." },
      ],
      correctAnswer: 1,
      explanation:
        "소비자들이 앞으로의 경기에 더 신중한 태도를 보인다고 했으므로 지출을 줄일 수 있다고 추론할 수 있어요.",
    },
  },
];

// 유형별 응용 문제 (동일 유형 신규 지문, 혼자 문제풀기 오답 저장 유형 기준)
const mockApplyQuizzes: Partial<Record<ReviewTypeId, ReviewQuizContent>> = {
  MAIN_IDEA: {
    quizId: 201,
    newsId: organizationNews.newsId,
    type: "MULTIPLE_CHOICE",
    category: "MAIN_IDEA",
    news: organizationNews,
    question: "다음 글의 중심 내용으로 가장 적절한 것은?",
    options: [
      { id: 1, text: "새 제도는 구성원에게 항상 이익만 가져다준다." },
      { id: 2, text: "제도 변화에 대한 반발은 잃게 될 것에 대한 민감함과도 관련이 있다." },
      { id: 3, text: "구성원들은 새로운 제도 도입에 모두 찬성한다." },
      { id: 4, text: "제도를 도입할 때 구성원과의 소통은 필요하지 않다." },
    ],
    correctAnswer: 2,
    explanation:
      "반발은 단순한 거부감이 아니라 잃게 될 권한이나 익숙함에 대한 민감함과도 관련 있다는 것이 글의 중심 내용이에요.",
  },

  INFORMATION: {
    quizId: 202,
    newsId: organizationNews.newsId,
    type: "OX",
    category: "FACT_CHECK",
    news: organizationNews,
    question: "다음 내용이 맞으면 O, 틀리면 X를 선택하세요.",
    statement: "기존 제도에 익숙한 사람들은 자신이 잃게 될 권한에도 민감하게 반응한다.",
    correctAnswer: "O",
    requiresReason: true,
    exampleAnswer:
      "기사에서 기존 제도에 익숙해진 사람들은 자신이 잃게 될 권한이나 익숙함에도 민감하게 반응한다고 설명하고 있기 때문에 O라고 판단할 수 있습니다.",
    suggestion:
      "사람들이 잃게 될까 봐 민감하게 반응하는 것이 무엇인지 기사 속 표현을 함께 근거로 작성해보세요.",
    differenceReason:
      "기사에서는 기존 제도에 익숙한 사람들이 잃게 될 권한에도 민감하게 반응한다고 설명하고 있어요.",
    articleHint:
      "기사의 '자신이 잃게 될 권한이나 익숙함에도 민감하게 반응한다'는 부분을 다시 확인해보세요.",
  },

  INFERENCE: {
    quizId: 203,
    newsId: organizationNews.newsId,
    type: "MULTIPLE_CHOICE",
    category: "INFERENCE",
    news: organizationNews,
    question: "기사의 내용을 바탕으로 추론할 수 있는 것은?",
    options: [
      { id: 1, text: "달라지는 점을 구체적으로 안내하면 구성원의 반발을 줄일 수 있다." },
      { id: 2, text: "새 제도는 소통 없이 빠르게 도입하는 것이 가장 효과적이다." },
      { id: 3, text: "기존 제도에 익숙한 사람일수록 변화에 무관심하다." },
      { id: 4, text: "새 제도를 도입하면 반발은 전혀 생기지 않는다." },
    ],
    correctAnswer: 1,
    explanation:
      "전문가들이 충분한 소통과 구체적인 안내가 필요하다고 조언했으므로 이를 통해 반발을 줄일 수 있다고 추론할 수 있어요.",
  },
};

// 오답 1개당 복기 → 응용 순서로 문제 구성 (응용 문제 없는 유형은 복기만)
export const createMockReviewQuizzes = (
  reviewType: Pick<ReviewTypeSummary, "typeId" | "name">,
  wrongAnswers: ReviewWrongAnswer[],
): ReviewQuiz[] => {
  const applyQuiz = mockApplyQuizzes[reviewType.typeId];

  return wrongAnswers.flatMap(({ quiz, subType }) => {
    // 선택한 유형 기준 태그
    const tag = { typeName: reviewType.name, subType };

    const retry: ReviewQuiz = { ...quiz, ...tag, reviewKind: "RETRY" };

    if (!applyQuiz) return [retry];

    const apply: ReviewQuiz = { ...applyQuiz, ...tag, reviewKind: "APPLY" };

    return [retry, apply];
  });
};
