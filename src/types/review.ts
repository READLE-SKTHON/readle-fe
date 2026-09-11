import type {
  MultipleChoiceGameQuestion,
  OxGameQuestion,
  ShortAnswerGameQuestion,
} from "@/types/game";

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

// 복기(기존 오답) / 응용(동일 유형 신규 지문)
export type ReviewKind = "RETRY" | "APPLY";

type ReviewQuestionMeta = {
  reviewKind: ReviewKind;

  // 문제 유형 태그 (예: 어휘 | 의미찾기)
  category: string;
  subCategory: string;
};

// 객관식 (지문 박스 + 밑줄 구간)
export type ReviewMultipleChoiceQuestion = Omit<MultipleChoiceGameQuestion, "points"> &
  ReviewQuestionMeta & {
    passage: string;
    underline: string;
  };

// O/X
export type ReviewOxQuestion = Omit<OxGameQuestion, "points"> & ReviewQuestionMeta;

// 단답형 주관식
export type ReviewShortAnswerQuestion = Omit<ShortAnswerGameQuestion, "points"> &
  ReviewQuestionMeta;

export type ReviewQuestion =
  ReviewMultipleChoiceQuestion | ReviewOxQuestion | ReviewShortAnswerQuestion;

// 오답 1개당 복기·응용 문제 쌍 (유형별 복습 문제 조회 응답)
export interface ReviewQuestionPair {
  wrongQuestionId: number;
  retry: ReviewQuestion;
  apply: ReviewQuestion;
}

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
