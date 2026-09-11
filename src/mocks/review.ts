import type { News } from "@/types/news";
import type {
  AbilityScore,
  ReviewQuestion,
  ReviewQuestionPair,
  ReviewTypeSummary,
} from "@/types/review";

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

// 유형별 오답 개수 (구조파악: 오답 0개 확인용, 정보추출: XP 획득 완료 확인용)
export const mockReviewTypes: ReviewTypeSummary[] = [
  {
    typeId: "VOCABULARY",
    name: "어휘",
    subTypes: ["어휘 적절성", "사전적/문맥적 의미", "바꿔 쓰기"],
    wrongCount: 6,
    isXpEarnedToday: false,
  },
  {
    typeId: "INFORMATION",
    name: "정보추출",
    subTypes: ["일치/불일치", "근거찾기"],
    wrongCount: 6,
    isXpEarnedToday: true,
  },
  {
    typeId: "MAIN_IDEA",
    name: "핵심파악",
    subTypes: ["주제", "제목", "요지", "주장"],
    wrongCount: 6,
    isXpEarnedToday: false,
  },
  {
    typeId: "INFERENCE",
    name: "추론 및 판단",
    subTypes: ["빈칸추론", "함축적 의미 추론", "이어질 내용 유추"],
    wrongCount: 6,
    isXpEarnedToday: false,
  },
  {
    typeId: "STRUCTURE",
    name: "구조파악",
    subTypes: ["문장삽입", "글의 순서", "무관한 문장 찾기"],
    wrongCount: 0,
    isXpEarnedToday: false,
  },
];

// 복기 문제 기사
const priceNews: News = {
  newsId: 201,
  title: "물가 상승 속 가계 부담 증가",
  category: "경제",
  publisher: "리들일보",
  publishedAt: "2026-09-01T09:00:00",
  content: `최근 소비자물가가 계속 상승하면서 가계의 생활비 부담이 커지고 있다. 지난달 소비자물가지수는 전년 같은 달보다 3.6% 상승해, 물가 상승세가 여전히 이어지고 있는 것으로 나타났다.

특히 식료품과 에너지 가격이 큰 폭으로 오르면서 일상생활에 필요한 지출이 늘었다. 전문가들은 국제 유가와 원자재 가격의 불안정, 기후 변화에 따른 농산물 생산량 감소 등이 복합적으로 작용한 결과라고 분석한다.

이러한 물가 상승은 소비 심리에도 영향을 미치고 있다. 소비자심리지수는 전달보다 하락해, 소비자들이 앞으로의 경기 상황에 대해 더 신중한 태도를 보이고 있는 것으로 나타났다.`,
  sourceUrl: "https://example.com/news/201",
};

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

const meaningQuestion = "다음 글의 밑줄 친 표현과 의미가 가장 가까운 것을 고르세요.";

// 복기·응용 문제 쌍 (객관식 · O/X · 주관식 분기 확인용)
const mockReviewQuestionPairs: ReviewQuestionPair[] = [
  {
    wrongQuestionId: 1,
    retry: {
      questionId: 1,
      type: "MULTIPLE_CHOICE",
      reviewKind: "RETRY",
      news: priceNews,
      category: "어휘",
      subCategory: "의미찾기",
      question: meaningQuestion,
      passage:
        "특히 식료품과 에너지 가격이 큰 폭으로 오르면서 일상생활에 필요한 지출이 늘었다. 전문가들은 국제 유가와 원자재 가격의 불안정, 기후 변화에 따른 농산물 생산량 감소 등이 복합적으로 작용한 결과라고 분석한다.",
      underline: "농산물 생산량 감소",
      options: [
        { id: 1, text: "농산물 가격이 크게 오름" },
        { id: 2, text: "농작물을 거둬들이는 양이 줄어듦" },
        { id: 3, text: "농사를 짓는 사람이 늘어남" },
        { id: 4, text: "농산물을 수입하는 양이 늘어남" },
      ],
      correctAnswer: 2,
      explanation: "'농산물 생산량 감소'는 농작물을 거둬들이는 양이 줄어든다는 뜻이에요.",
    },
    apply: {
      questionId: 2,
      type: "MULTIPLE_CHOICE",
      reviewKind: "APPLY",
      news: organizationNews,
      category: "어휘",
      subCategory: "의미찾기",
      question: meaningQuestion,
      passage:
        "조직에서 새로운 제도를 도입할 때 구성원들의 반발이 발생하는 이유는 단순히 변화에 대한 거부감으로만 설명하기는 어렵다. 기존 제도에 익숙해진 사람들은 새로운 방식이 가져올 이익뿐 아니라 자신이 잃게 될 권한이나 익숙함에도 민감하게 반응한다",
      underline: "새로운 방식이 가져올 이익",
      options: [
        { id: 1, text: "기존 제도에서 누리던 권한" },
        { id: 2, text: "변화에 대한 막연한 거부감" },
        { id: 3, text: "새 제도로 얻게 될 좋은 점" },
        { id: 4, text: "새 제도를 만드는 데 드는 비용" },
      ],
      correctAnswer: 3,
      explanation: "'새로운 방식이 가져올 이익'은 새 제도를 통해 얻게 될 좋은 점을 말해요.",
    },
  },
  {
    wrongQuestionId: 2,
    retry: {
      questionId: 3,
      type: "OX",
      reviewKind: "RETRY",
      news: priceNews,
      category: "정보추출",
      subCategory: "일치/불일치",
      question: "소비자심리지수는 전달보다 상승했다",
      correctAnswer: "X",
      explanation: "기사에서는 소비자심리지수가 전달보다 하락했다고 설명하고 있어요.",
    },
    apply: {
      questionId: 4,
      type: "OX",
      reviewKind: "APPLY",
      news: organizationNews,
      category: "정보추출",
      subCategory: "일치/불일치",
      question: "기존 제도에 익숙한 사람들은 자신이 잃게 될 권한에도 민감하게 반응한다",
      correctAnswer: "O",
      explanation:
        "기사에서 기존 제도에 익숙한 사람들은 잃게 될 권한이나 익숙함에도 민감하게 반응한다고 설명하고 있어요.",
    },
  },
  {
    wrongQuestionId: 3,
    retry: {
      questionId: 5,
      type: "SHORT_ANSWER",
      reviewKind: "RETRY",
      news: priceNews,
      category: "정보추출",
      subCategory: "근거찾기",
      question: "기사에서 가격이 큰 폭으로 올랐다고 제시한 두 가지 품목을 쓰시오.",
      instruction: ",를 붙여서 쓰시오",
      maxLength: 500,
      correctAnswer: "식료품, 에너지",
      explanation: "기사에서는 식료품과 에너지 가격이 큰 폭으로 올랐다고 설명하고 있어요.",
    },
    apply: {
      questionId: 6,
      type: "SHORT_ANSWER",
      reviewKind: "APPLY",
      news: organizationNews,
      category: "정보추출",
      subCategory: "근거찾기",
      question: "기존 제도에 익숙해진 사람들이 잃게 될까 봐 민감하게 반응하는 두 가지를 쓰시오.",
      instruction: ",를 붙여서 쓰시오",
      maxLength: 500,
      correctAnswer: "권한, 익숙함",
      explanation:
        "기사에서는 사람들이 자신이 잃게 될 권한이나 익숙함에도 민감하게 반응한다고 설명하고 있어요.",
    },
  },
];

// 유형 오답 개수만큼 복기 → 응용 순서로 문제 구성 (문제 쌍 순환 사용)
export const createMockReviewQuestions = (reviewType: ReviewTypeSummary): ReviewQuestion[] =>
  Array.from({ length: reviewType.wrongCount }, (_, index) => {
    const { retry, apply } = mockReviewQuestionPairs[index % mockReviewQuestionPairs.length];

    // 선택한 유형 기준 태그
    const tag = {
      category: reviewType.name,
      subCategory: reviewType.subTypes[index % reviewType.subTypes.length],
    };

    return [
      { ...retry, ...tag, questionId: index * 2 + 1 },
      { ...apply, ...tag, questionId: index * 2 + 2 },
    ];
  }).flat();

// 주관식 비교용 공백 제거
const normalizeAnswer = (answer: string) => answer.replace(/\s/g, "");

// 복습 답안 채점 (추후 서버 채점 결과로 변경)
export const gradeMockReviewAnswer = (question: ReviewQuestion, answer: string): boolean =>
  normalizeAnswer(answer) === normalizeAnswer(String(question.correctAnswer));
