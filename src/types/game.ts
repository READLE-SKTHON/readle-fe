// 게임 진행 단계 (문제 풀이 / 정답 공개 / 중간 순위 / 게임 종료)
export type GamePhase = "ANSWERING" | "REVEAL" | "LEADERBOARD" | "FINISHED";

// 문제 형식
export type QuestionFormat = "OX" | "multiple_choice" | "short_answer";

// 문제 유형 대분류
export type QuestionMainCategory =
  "vocab" | "info_extraction" | "core_understanding" | "inference_judgment" | "structure";

// 문제 유형 소분류
export type QuestionSubCategory =
  | "vocab_appropriateness"
  | "vocab_meaning"
  | "vocab_paraphrase"
  | "info_consistency"
  | "info_evidence"
  | "core_topic"
  | "core_title"
  | "core_gist"
  | "core_argument"
  | "inference_blank"
  | "inference_implication"
  | "inference_continuation"
  | "structure_sentence_insertion"
  | "structure_order"
  | "structure_irrelevant_sentence";

// 문제 응답 (정답·해설 제외)
export interface GameQuestionResponse {
  questionId: number;

  // 풀이 순서 (0부터)
  displayOrder: number;

  questionFormat: QuestionFormat;

  // 문제 본문 ([문단] 지문 + [문제] 문항)
  content: string;

  // 보기 목록 (OX·단답형 빈 배열)
  choices: string[];

  mainCategory: QuestionMainCategory | null;
  subCategory: QuestionSubCategory | null;
}

// 화면 표시용 문제 (지문·문항 분리)
interface BaseGameQuestion {
  questionId: number;
  order: number;

  // 발췌 지문 (없으면 null)
  passage: string | null;

  question: string;
  mainCategory: QuestionMainCategory | null;
  subCategory: QuestionSubCategory | null;
}

// 객관식
export interface MultipleChoiceGameQuestion extends BaseGameQuestion {
  format: "multiple_choice";
  choices: string[];
}

// O/X
export interface OxGameQuestion extends BaseGameQuestion {
  format: "OX";
}

// 단답형
export interface ShortAnswerGameQuestion extends BaseGameQuestion {
  format: "short_answer";
}

export type GameQuestion = MultipleChoiceGameQuestion | OxGameQuestion | ShortAnswerGameQuestion;

// 문제 형식별 답안
export type GameAnswer =
  // 보기 번호 (1부터)
  | { format: "multiple_choice"; choiceNumber: number }
  | { format: "OX"; value: "O" | "X" }
  | { format: "short_answer"; text: string };

// 게임 시작·재시작 응답
export interface StartGameResponse {
  roomId: number;

  // 방 내 판 번호 (1부터, 재시작마다 증가)
  round: number;

  startedAt: string;
  questions: GameQuestionResponse[];
}

// 답안 제출 요청 (객관식 보기 번호 "1"~ / OX "O"·"X" / 단답형 텍스트)
export interface SubmitAnswerRequest {
  selectedAnswer: string;
}

// 답안 제출 응답 (채점 결과는 정답 공개 단계 상태 조회로 확인)
export interface SubmitAnswerResponse {
  questionId: number;
  submitted: boolean;
}

// 참여자별 제출 여부 (문제 풀이 단계)
export interface AnswerStatus {
  userId: number;
  nickname: string;
  answered: boolean;
}

// 내 문제 결과 (정답 공개 단계)
export interface MyResult {
  isCorrect: boolean;
  score: number;
  correctAnswer: string;
  explanation: string | null;
}

// 참여자별 문제 결과 (정답 공개 단계)
export interface PlayerResult {
  userId: number;
  nickname: string;
  isCorrect: boolean;
  score: number;
}

// 누적 순위 (중간 순위·게임 종료 단계)
export interface ScoreboardEntry {
  rank: number;
  userId: number;
  nickname: string;
  totalScore: number;
}

// 게임 상태 조회 응답 (단계에 해당하지 않는 필드 null)
export interface GameStatusResponse {
  phase: GamePhase;
  round: number;
  currentQuestionOrder: number;

  // 현재 문제 번호 (1부터, 진행도 표시용)
  currentQuestionNumber: number;

  // 현재 단계 남은 시간 (초)
  remainingSeconds: number;

  totalQuestions: number;
  question: GameQuestionResponse | null;
  answerStatus: AnswerStatus[] | null;
  myResult: MyResult | null;
  allResults: PlayerResult[] | null;
  scoreboard: ScoreboardEntry[] | null;
}
