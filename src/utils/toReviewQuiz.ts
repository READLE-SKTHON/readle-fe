import type { Quiz } from "@/types/quiz";
import type { ReviewQuestion, SubmitReviewAnswerResponse } from "@/types/review";
import { mapTrainingQuestionToQuiz } from "@/utils/trainingMapper";

// 복습 문제 퀴즈 화면 형식 변환 (혼자 문제풀기 변환 재사용, 근거 입력 없음)
export const toReviewQuiz = ({ order, question }: ReviewQuestion): Quiz =>
  mapTrainingQuestionToQuiz({ ...question, order, level: 0, requireReason: false });

// 채점 결과 퀴즈 결과 화면 형식 반영 (정답·해설)
export const applyReviewResult = (
  quiz: Quiz,
  { correctAnswer, explanation }: SubmitReviewAnswerResponse,
): Quiz => {
  switch (quiz.type) {
    case "MULTIPLE_CHOICE": {
      // 정답 보기 번호 (번호·보기 텍스트 응답 모두 처리)
      const correctId = /^\d+$/.test(correctAnswer)
        ? Number(correctAnswer)
        : (quiz.options.find(({ text }) => text === correctAnswer)?.id ?? -1);

      return { ...quiz, correctAnswer: correctId };
    }

    case "OX":
      return {
        ...quiz,
        correctAnswer: correctAnswer === "X" ? "X" : "O",
        exampleAnswer: explanation,
      };

    case "SUBJECTIVE":
      return { ...quiz, exampleAnswer: correctAnswer, feedback: explanation };
  }
};
