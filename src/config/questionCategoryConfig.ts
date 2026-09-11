import type { QuestionMainCategory, QuestionSubCategory } from "@/types/game";

// 문제 유형 대분류 이름 (훈련하기 유형 이름 기준)
export const MAIN_CATEGORY_LABELS: Record<QuestionMainCategory, string> = {
  vocab: "어휘",
  info_extraction: "정보추출",
  core_understanding: "핵심파악",
  inference_judgment: "추론 및 판단",
  structure: "구조파악",
};

// 문제 유형 소분류 이름 (훈련하기 세부 유형 기준)
export const SUB_CATEGORY_LABELS: Record<QuestionSubCategory, string> = {
  vocab_appropriateness: "어휘 적절성",
  vocab_meaning: "사전적/문맥적 의미",
  vocab_paraphrase: "바꿔 쓰기",
  info_consistency: "일치/불일치",
  info_evidence: "근거찾기",
  core_topic: "주제",
  core_title: "제목",
  core_gist: "요지",
  core_argument: "주장",
  inference_blank: "빈칸추론",
  inference_implication: "함축적 의미 추론",
  inference_continuation: "이어질 내용 유추",
  structure_sentence_insertion: "문장삽입",
  structure_order: "글의 순서",
  structure_irrelevant_sentence: "무관한 문장 찾기",
};
