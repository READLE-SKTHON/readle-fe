import type { GameQuestion, GameQuestionResponse } from "@/types/game";

// 문제 본문 지문·문항 구분 형식 ([문단] 지문 [문제] 문항)
const CONTENT_PATTERN = /\[문단\]([\s\S]*?)\[문제\]([\s\S]*)/;

// 문제 응답 화면 표시용 변환 (지문·문항 분리, 형식 다르면 본문 전체 문항 처리)
export const toGameQuestion = (response: GameQuestionResponse): GameQuestion => {
  const matched = response.content.match(CONTENT_PATTERN);

  const base = {
    questionId: response.questionId,
    order: response.displayOrder,
    passage: matched ? matched[1].trim() : null,
    question: (matched ? matched[2] : response.content).trim(),
    mainCategory: response.mainCategory,
    subCategory: response.subCategory,
  };

  switch (response.questionFormat) {
    case "multiple_choice":
      return { ...base, format: "multiple_choice", choices: response.choices };

    case "OX":
      return { ...base, format: "OX" };

    case "short_answer":
      return { ...base, format: "short_answer" };
  }
};
