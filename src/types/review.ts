import type { News } from "@/types/news";
import type { Quiz } from "@/types/quiz";

// 문해력 능력치 축 (어휘력 · 독해력 · 추론력 · 비판적 사고력 · 표현력)
export type AbilityKey =
  "VOCABULARY" | "READING" | "INFERENCE" | "CRITICAL_THINKING" | "EXPRESSION";

// 능력치 조회 응답 (서버 AI 주관식 분석 결과, 0~100)
export interface AbilityScore {
  key: AbilityKey;
  label: string;
  myScore: number;
  averageScore: number;
}

// 복습 유형
export type ReviewTypeId = "VOCABULARY" | "INFORMATION" | "MAIN_IDEA" | "INFERENCE" | "STRUCTURE";

// 유형별 오답 개수 조회 응답
export interface ReviewTypeSummary {
  typeId: ReviewTypeId;
  name: string;
  subTypes: string[];
  wrongCount: number;

  // 오늘 복습 XP 획득 여부
  isXpEarnedToday: boolean;
}

// 유형 복습 상태 (복습 전 오답 있음 / 오늘 모두 복습 완료 / 틀린 문제 없음)
export type ReviewStatus = "UNREVIEWED" | "REVIEWED" | "EMPTY";

// 복기(기존 오답) / 응용(동일 유형 신규 지문)
export type ReviewKind = "RETRY" | "APPLY";

// 복습 문제 본문 (혼자 문제풀기 문제 + 기사·객관식 해설)
export type ReviewQuizContent = Quiz & {
  // 기사 미리보기·지문 전체보기 기사
  news: News;

  // 객관식 해설 (없으면 해설 미표시)
  explanation?: string;
};

// 저장된 오답 (혼자 문제풀기 오답, 훈련하기 유형별 정리)
export interface ReviewWrongAnswer {
  quiz: ReviewQuizContent;
  typeId: ReviewTypeId;
  subType: string;

  // 복습 완료 날짜 (복습 전 null)
  reviewedDate: string | null;
}

// 복습 문제 (복기·응용 구분 + 훈련하기 유형 태그)
export type ReviewQuiz = ReviewQuizContent & {
  reviewKind: ReviewKind;

  // 문제 유형 태그 (예: 정보추출 | 일치/불일치)
  typeName: string;
  subType: string;
};

// 답안 제출 요청
export interface ReviewAnswerRequest {
  questionId: number;
  answer: string;
}

// 답안 채점 결과
export interface ReviewAnswerResponse {
  isCorrect: boolean;
}

// 유형 복습 완료 XP 획득 결과
export interface ReviewXpResponse {
  typeId: ReviewTypeId;

  // 이번 획득 XP (오늘 이미 받은 유형이면 0)
  earnedXp: number;

  // 오늘 획득 XP 합계
  todayXp: number;
}
