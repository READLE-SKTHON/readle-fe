// 기사
export interface TrainingArticle {
  newsId: number;
  title?: string;
  publisher: string;
  publishedAt: string;
  category: string;
  content: string;
  level: number;
  sourceUrl?: string;
}

// 문제
export interface TrainingQuestion {
  questionId: number;
  order: number;
  questionFormat: string;
  mainCategory: string;
  subCategory: string;
  content: string;
  choices: string[] | null;
  level: number;
  requireReason: boolean;
}

// 오늘의 문제 조회
export interface TodayTraining {
  userLevel: number;
  article: TrainingArticle;
  questionCount: number;
  questions: TrainingQuestion[];
}

// 답안 제출 요청
export interface SubmitAnswerRequest {
  selectedAnswer: string;
  reason?: string;
}

// 답안 제출 결과
export interface SubmitAnswerResult {
  resultStatus: string;
  score: number;
  explanation?: string;
  feedback?: { explanation?: string; mistakeFeedback?: string; hint?: string } | string | null;
  mistakeFeedback?: string;
  hint?: string;
}

// 오늘의 학습 결과
export interface TodayTrainingResult {
  totalQuestion: number;
  correctCount: number;
  incorrectCount: number;
  accuracy: number;
  earnedXp?: number;
}
