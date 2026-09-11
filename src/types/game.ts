import type { News } from "@/types/news";
import type { Participant } from "@/types/room";

// 문제 유형
export type QuestionType = "MULTIPLE_CHOICE" | "SHORT_ANSWER" | "OX";

// 게임 진행 단계 (문제 풀이 / 제출 대기 / 정답 발표 / 중간 순위)
export type GamePhase = "ANSWERING" | "WAITING" | "REVEAL" | "RANKING";

// 참여자 제출 상태 (아직 제출 안 함 / 답안 선택 중 / 제출 완료)
export type SubmitStatus = "NOT_SUBMITTED" | "SELECTING" | "SUBMITTED";

interface BaseGameQuestion {
  questionId: number;
  type: QuestionType;

  // 문제 기사 (제목·본문·출처)
  news: News;

  // 문제 풀이용 발췌 본문 (없으면 기사 본문 전체)
  passage?: string;

  // 문제 유형 태그 (예: 핵심파악 | 요지)
  category: string;
  subCategory: string;

  question: string;
  explanation: string;

  // 배점 (서버 제공)
  points: number;
}

// 객관식
export interface MultipleChoiceGameQuestion extends BaseGameQuestion {
  type: "MULTIPLE_CHOICE";

  options: {
    id: number;
    text: string;
  }[];

  correctAnswer: number;
}

// 단답형 주관식
export interface ShortAnswerGameQuestion extends BaseGameQuestion {
  type: "SHORT_ANSWER";

  // 작성 안내 문구
  instruction: string;

  maxLength: number;
  correctAnswer: string;
}

// O/X
export interface OxGameQuestion extends BaseGameQuestion {
  type: "OX";
  correctAnswer: "O" | "X";
}

export type GameQuestion = MultipleChoiceGameQuestion | ShortAnswerGameQuestion | OxGameQuestion;

// 답안 제출 요청
export interface SubmitAnswerRequest {
  questionId: number;
  answer: string;
}

// 참여자별 문제 점수 (서버 채점 결과)
export interface RoundScore {
  userId: number;
  points: number;
  isCorrect: boolean;
}

// 정답 발표 결과
export interface QuestionResult {
  questionId: number;
  scores: RoundScore[];
}

// 순위
export interface RankingItem extends Participant {
  totalScore: number;
  rank: number;
}
