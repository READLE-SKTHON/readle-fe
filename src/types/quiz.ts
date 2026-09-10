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

  statement: string;
  correctAnswer: "O" | "X";
  requiresReason: boolean;
}

// 주관식
export interface SubjectiveQuiz extends BaseQuiz {
  type: "SUBJECTIVE";

  maxLength: number;
  exampleAnswer: string;
}

// 모든 퀴즈 타입
export type Quiz = MultipleChoiceQuiz | OxQuiz | SubjectiveQuiz;

// 퀴즈 정답 타입
export type FeedbackStatus = "CORRECT" | "INCORRECT" | "PARTIAL";
