import { useState } from "react";

import type { FeedbackStatus, Quiz } from "@/types/quiz";

// 문제 답안 상태·제출 가능 여부·피드백 상태 (혼자 문제풀기·훈련하기 공용)
export default function useQuizAnswer(quiz: Quiz) {
  // 객관식 답
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);

  // O/X 답
  const [selectedOxAnswer, setSelectedOxAnswer] = useState<"O" | "X" | null>(null);

  // O/X 근거
  const [reason, setReason] = useState("");

  // 주관식 답
  const [subjectiveAnswer, setSubjectiveAnswer] = useState("");

  // 제출 가능 여부
  const canSubmit = (() => {
    if (quiz.type === "MULTIPLE_CHOICE") {
      return selectedOptionId !== null;
    }

    if (quiz.type === "OX") {
      return selectedOxAnswer !== null && (!quiz.requiresReason || reason.trim().length > 0);
    }

    if (quiz.type === "SUBJECTIVE") {
      return subjectiveAnswer.trim().length > 0;
    }

    return false;
  })();

  // 피드백 상태
  const getFeedbackStatus = (): FeedbackStatus | null => {
    // 객관식
    if (quiz.type === "MULTIPLE_CHOICE") {
      return selectedOptionId === quiz.correctAnswer ? "CORRECT" : "INCORRECT";
    }

    // O/X
    if (quiz.type === "OX") {
      if (selectedOxAnswer !== quiz.correctAnswer) {
        return "INCORRECT";
      }

      // 임시 기준
      // 추후 AI/API 평가 결과로 변경
      if (reason.trim().length < 10) {
        return "PARTIAL";
      }

      return "CORRECT";
    }

    // 주관식
    if (quiz.type === "SUBJECTIVE") {
      // 임시 처리
      // 추후 AI/API 채점 결과로 변경
      return "CORRECT";
    }

    return null;
  };

  // 이전 문제 상태 초기화
  const resetAnswer = () => {
    setSelectedOptionId(null);
    setSelectedOxAnswer(null);
    setReason("");
    setSubjectiveAnswer("");
  };

  return {
    selectedOptionId,
    setSelectedOptionId,
    selectedOxAnswer,
    setSelectedOxAnswer,
    reason,
    setReason,
    subjectiveAnswer,
    setSubjectiveAnswer,
    canSubmit,
    feedbackStatus: getFeedbackStatus(),
    resetAnswer,
  };
}
