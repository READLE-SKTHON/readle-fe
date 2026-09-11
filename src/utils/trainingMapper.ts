import { isAxiosError } from "axios";

import type { SubmitAnswerResult, TrainingQuestion } from "@/types/training";
import type { Quiz, QuizCategory, QuizType } from "@/types/quiz";

const mapQuestionType = (questionFormat: string): QuizType => {
  switch (questionFormat.toLowerCase()) {
    case "multiple_choice":
      return "MULTIPLE_CHOICE";

    case "ox":
      return "OX";

    case "short_answer":
      return "SUBJECTIVE";

    default:
      throw new Error("지원하지 않는 문제 형식입니다.");
  }
};

const mapCategory = (mainCategory: string): QuizCategory => {
  switch (mainCategory) {
    case "core_understanding":
      return "MAIN_IDEA";

    case "fact_check":
      return "FACT_CHECK";

    case "inference":
      return "INFERENCE";

    case "summary":
      return "SUMMARY";

    default:
      return "MAIN_IDEA";
  }
};

export const mapTrainingQuestionToQuiz = (question: TrainingQuestion): Quiz => {
  const type = mapQuestionType(question.questionFormat);

  const category = mapCategory(question.mainCategory);

  if (type === "MULTIPLE_CHOICE") {
    return {
      quizId: question.questionId,
      newsId: 0,
      type: "MULTIPLE_CHOICE",
      category,
      question: question.content,

      options: (question.choices ?? []).map((choice, index) => ({
        id: index + 1,
        text: choice,
      })),

      // 서버에서 채점하기 때문에 사용하지 않음
      correctAnswer: -1,
    };
  }

  if (type === "OX") {
    return {
      quizId: question.questionId,
      newsId: 0,
      type: "OX",
      category,
      question: question.content,
      statement: question.content,

      // 서버 채점 결과 사용
      correctAnswer: "O",

      requiresReason: question.requireReason,

      exampleAnswer: "",
      suggestion: "",
      differenceReason: "",
      articleHint: "",
    };
  }

  return {
    quizId: question.questionId,
    newsId: 0,
    type: "SUBJECTIVE",
    category,
    question: question.content,

    maxLength: 500,

    articleEvidence: "",
    feedback: "",
    exampleAnswer: "",
  };
};

export const getTrainingFeedback = (result: SubmitAnswerResult | null) => {
  const feedback = result?.feedback;
  return {
    explanation:
      (typeof feedback === "object" ? feedback?.explanation : feedback) ??
      result?.explanation ??
      "",
    mistakeFeedback:
      (typeof feedback === "object" ? feedback?.mistakeFeedback : undefined) ??
      result?.mistakeFeedback ??
      "",
    hint: (typeof feedback === "object" ? feedback?.hint : undefined) ?? result?.hint ?? "",
  };
};

export const mapTrainingResultToQuiz = (
  quiz: Quiz,
  result: SubmitAnswerResult | null,
  selectedOptionId: number | null,
): Quiz => {
  const { explanation, mistakeFeedback, hint } = getTrainingFeedback(result);
  if (quiz.type === "MULTIPLE_CHOICE") {
    return {
      ...quiz,
      correctAnswer: result?.resultStatus === "correct" ? (selectedOptionId ?? -1) : -1,
    };
  }
  if (quiz.type === "OX") {
    return {
      ...quiz,
      exampleAnswer: explanation,
      suggestion: mistakeFeedback,
      differenceReason: mistakeFeedback,
      articleHint: hint,
    };
  }
  return {
    ...quiz,
    exampleAnswer: explanation,
    feedback: [mistakeFeedback, hint].filter(Boolean).join("\n"),
    articleEvidence: hint,
  };
};

export const getTrainingErrorMessage = (error: unknown) =>
  isAxiosError(error) && error.response?.status === 404 && error.response.data?.code === "AN001"
    ? "오늘의 문제가 아직 준비되지 않았습니다."
    : "데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.";
