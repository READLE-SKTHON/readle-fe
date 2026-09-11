import type { GameQuestion, RoundScore, SubmitStatus } from "@/types/game";
import type { News } from "@/types/news";

// 문제 기사
const priceNews: News = {
  newsId: 101,
  title: "물가 상승 속 가계 부담 증가",
  category: "경제",
  publisher: "리들일보",
  publishedAt: "2026-09-01T09:00:00",
  content: `지속되는 물가 상승으로 가계의 생활비 부담이 커지고 있다. 지난달 소비자물가는 1년 전보다 3%대 상승률을 기록하며 오름세를 이어갔다.

특히 식료품과 에너지 가격이 큰 폭으로 오르면서 장바구니 물가와 난방비, 교통비 부담이 함께 늘었다. 전문가들은 국제 원자재 가격 불안과 이상 기후에 따른 작황 부진이 겹친 결과로 보고 있다.

물가 부담은 소비 심리에도 영향을 주고 있다. 소비자 심리지수는 전달보다 하락해, 가계가 지출을 줄이며 신중한 태도를 보이는 것으로 나타났다.

정부는 주요 품목의 수급을 관리하고 취약 계층 지원을 늘리는 등 물가 안정 대책을 강화하겠다고 밝혔다.`,
  sourceUrl: "https://example.com/news/101",
};

// 게임 문제 목록 (방 설정 문제 수만큼 순환 사용)
export const mockGameQuestions: GameQuestion[] = [
  {
    questionId: 1,
    type: "MULTIPLE_CHOICE",
    news: priceNews,
    category: "핵심파악",
    subCategory: "요지",
    question: "이 글의 중심 내용으로 적절한 것은?",
    options: [
      { id: 1, text: "물가가 안정되면서 가계의 소비가 늘고 있다." },
      { id: 2, text: "물가 상승으로 가계의 생활비 부담이 커지고 있다." },
      { id: 3, text: "정부는 물가 관리에 관심을 두지 않고 있다." },
      { id: 4, text: "에너지 가격 하락으로 생활비가 줄어들고 있다." },
    ],
    correctAnswer: 2,
    explanation:
      "기사는 물가 상승으로 가계의 생활비 부담이 커지고 있다는 내용을 중심으로 다루고 있어요.",
    points: 25,
  },
  {
    questionId: 2,
    type: "SHORT_ANSWER",
    news: priceNews,
    question: "기사에서 가격이 큰 폭으로 올랐다고 제시한 두 가지 품목을 쓰시오.",
    instruction: ",를 붙여서 쓰시오",
    maxLength: 500,
    correctAnswer: "식료품, 에너지",
    explanation: "기사에서는 식료품과 에너지 가격이 큰 폭으로 올랐다고 설명하고 있어요.",
    points: 25,
  },
  {
    questionId: 3,
    type: "OX",
    news: priceNews,
    question: "에너지 가격은 큰 폭으로 줄었다",
    correctAnswer: "X",
    explanation: "기사에서는 에너지 가격이 큰 폭으로 올랐다고 설명하고 있어요.",
    points: 25,
  },
  {
    questionId: 4,
    type: "MULTIPLE_CHOICE",
    news: priceNews,
    category: "추론",
    subCategory: "내용 추론",
    question: "이 글을 바탕으로 추론할 수 있는 것은?",
    options: [
      { id: 1, text: "소비자들이 지출을 줄이려 할 수 있다." },
      { id: 2, text: "모든 품목의 가격이 곧 하락할 것이다." },
      { id: 3, text: "가계의 생활비 부담은 이미 해소되었다." },
      { id: 4, text: "소비 심리는 앞으로 크게 좋아질 것이다." },
    ],
    correctAnswer: 1,
    explanation:
      "소비자 심리지수가 하락하고 가계가 신중한 태도를 보인다는 내용에서 추론할 수 있어요.",
    points: 25,
  },
  {
    questionId: 5,
    type: "OX",
    news: priceNews,
    question: "소비자 심리지수는 전달보다 하락했다",
    correctAnswer: "O",
    explanation: "기사에서 소비자 심리지수가 전달보다 하락했다고 설명하고 있어요.",
    points: 25,
  },
];

// 방 설정 문제 수만큼 문제 구성
export const createMockQuestions = (count: number): GameQuestion[] =>
  Array.from({ length: count }, (_, index) => ({
    ...mockGameQuestions[index % mockGameQuestions.length],
    questionId: index + 1,
  }));

// 다른 참여자 답안 선택·제출 시점 (ms, 참여자 순서별)
// isAfterMySubmit: 내 제출 이후 submittedAt 뒤에 제출 (제출 대기 화면 확인용)
export const mockSubmitTimings = [
  { selectingAt: 2000, submittedAt: 2500, isAfterMySubmit: true },
  { selectingAt: 1000, submittedAt: 3000, isAfterMySubmit: false },
  { selectingAt: 1500, submittedAt: 5000, isAfterMySubmit: false },
];

type GradeMockRoundParams = {
  question: GameQuestion;
  questionIndex: number;
  participantIds: number[];
  myUserId: number;
  myAnswer: string | null;
  submitStatuses: Record<number, SubmitStatus>;
};

// 단답형 비교용 공백 제거
const normalizeAnswer = (answer: string) => answer.replace(/\s/g, "");

// 참여자별 문제 점수 채점 (미제출 +0)
export const gradeMockRound = ({
  question,
  questionIndex,
  participantIds,
  myUserId,
  myAnswer,
  submitStatuses,
}: GradeMockRoundParams): RoundScore[] =>
  participantIds.map((userId) => {
    const isSubmitted = submitStatuses[userId] === "SUBMITTED";

    const isCorrect =
      isSubmitted &&
      (userId === myUserId
        ? normalizeAnswer(myAnswer ?? "") === normalizeAnswer(String(question.correctAnswer))
        : (questionIndex + userId) % 3 !== 0);

    return { userId, isCorrect, points: isCorrect ? question.points : 0 };
  });
