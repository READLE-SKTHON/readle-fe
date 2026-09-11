import type { GameAnswer, SubmitAnswerRequest } from "@/types/game";

// 답안 제출 요청값 변환 (객관식 보기 번호, OX 값, 단답형 앞뒤 공백 제거)
export const toSubmitAnswerRequest = (answer: GameAnswer): SubmitAnswerRequest => {
  switch (answer.format) {
    case "multiple_choice":
      return { selectedAnswer: String(answer.choiceNumber) };

    case "OX":
      return { selectedAnswer: answer.value };

    case "short_answer":
      return { selectedAnswer: answer.text.trim() };
  }
};
