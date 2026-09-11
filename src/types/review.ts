import type { QuestionMainCategory, QuestionSubCategory } from "@/types/game";

// 문해력 능력치 영역 (문자해독 · 내용이해 · 맥락파악 · 추론 · 비판적사고)
export type SkillCategory = "문자해독" | "내용이해" | "맥락파악" | "추론" | "비판적사고";

// 능력치 결과 항목 (영역별 누적 평균 점수)
export interface SkillResult {
  skillCategory: SkillCategory;
  averageScore: number;
}

// 능력치 결과 조회 응답
export interface SkillResultsResponse {
  skillResults: SkillResult[];
}

// 능력치 차트 항목 (나의 점수 · 전체 평균, 0~100)
export interface AbilityScore {
  key: SkillCategory;
  label: string;
  myScore: number;
  averageScore: number;
}

// 유형별 틀린 문제 개수 (5개 유형 전부, 오답 없으면 0)
export interface ReviewCategory {
  mainCategory: QuestionMainCategory;
  subCategories: QuestionSubCategory[];
  wrongCount: number;
}

// 유형별 틀린 문제 개수 조회 응답
export interface ReviewCategoriesResponse {
  categories: ReviewCategory[];
}

// 날짜·세부 유형별 틀린 문제 묶음
export interface ReviewGroup {
  // 가장 최근에 틀린 날짜 (yyyy-MM-dd)
  date: string;

  subCategory: QuestionSubCategory;
  wrongCount: number;
}

// 날짜·세부 유형별 틀린 문제 묶음 조회 응답
export interface ReviewGroupsResponse {
  groups: ReviewGroup[];
}

// 복습 시작 요청 (세부 유형 목록에서 고른 유형·날짜)
export interface StartReviewRequest {
  mainCategory: QuestionMainCategory;
  subCategory: QuestionSubCategory;
  date: string;
}

// 복습 문제 구분 (틀린 문제 복기 / 같은 유형 다른 기사 문제)
export type ReviewMode = "RECALL" | "PRACTICE";

// 복습 문제 (기사 + 문제)
export interface ReviewQuestion {
  order: number;
  mode: ReviewMode;

  article: {
    newsId: number;
    title: string;
    content: string;
  };

  question: {
    questionId: number;

    // 문제 형식 (OX / multiple_choice / short_answer)
    questionFormat: string;

    mainCategory: string;
    subCategory: string;
    content: string;

    // 보기 목록 (OX·단답형 없음)
    choices: string[] | null;
  };
}

// 복습 시작 응답 (복습 세션)
export interface StartReviewResponse {
  reviewSessionId: number;
  totalQuestions: number;
  questions: ReviewQuestion[];
}

// 복습 답안 제출 요청 (객관식 보기 번호 "1"~ / OX "O"·"X" / 단답형 텍스트)
export interface SubmitReviewAnswerRequest {
  selectedAnswer: string;
}

// 복습 답안 채점 결과
export interface SubmitReviewAnswerResponse {
  correct: boolean;
  correctAnswer: string;
  explanation: string;

  // 이번 제출로 획득한 XP (오답 0)
  earnedXp: number;
}

// 복습 결과 (세션에서 푼 문제 기준)
export interface ReviewResultResponse {
  totalQuestions: number;
  correctCount: number;
  accuracy: number;
}
