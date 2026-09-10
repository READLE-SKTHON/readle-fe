export type QuizType = "MULTIPLE_CHOICE" | "OX" | "SUBJECTIVE";

export type QuizCategory = "MAIN_IDEA" | "FACT_CHECK" | "INFERENCE" | "SUMMARY";

export interface BaseQuiz {
  quizId: number;
  newsId: number;
  type: QuizType;
  category: QuizCategory;
  question: string;
}

// 객관식
export interface MultipleChoiceQuiz extends BaseQuiz {
  type: "MULTIPLE_CHOICE";

  options: {
    id: number;
    text: string;
  }[];

  correctAnswer: number;
}

// O / X
export interface OxQuiz extends BaseQuiz {
  type: "OX";

  // O/X로 판단할 문장
  statement: string;

  // 정답
  correctAnswer: "O" | "X";

  // 근거 작성 여부
  requiresReason: boolean;

  // 완벽한 답안 예시
  exampleAnswer: string;

  // 부분 정답일 때 보여줄 피드백
  suggestion: string;

  // 오답일 때 왜 다른지 설명
  differenceReason: string;

  // 기사에서 다시 확인할 부분
  articleHint: string;
}

// 주관식
export interface SubjectiveQuiz extends BaseQuiz {
  type: "SUBJECTIVE";

  maxLength: number;

  // 기사에서 확인할 수 있는 근거
  articleEvidence: string;

  // AI 피드백
  feedback: string;

  // 완벽한 답안 예시
  exampleAnswer: string;
}

// 모든 퀴즈 타입
export type Quiz = MultipleChoiceQuiz | OxQuiz | SubjectiveQuiz;

// 퀴즈 피드백 상태
export type FeedbackStatus = "CORRECT" | "INCORRECT" | "PARTIAL";
